import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useAuth } from '@/hooks/use-auth';
import { Bell, CheckCircle, AlertCircle, X, CircleX, Loader2 } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface Notification {
  id: number;
  type: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  relatedId?: number;
}

export default function NotificationsPanel() {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const { data: notifications, isLoading } = useQuery({
    queryKey: ['/api/notifications'],
    queryFn: async () => {
      if (!user) return [];
      const res = await fetch('/api/notifications');
      if (!res.ok) throw new Error('Falha ao obter notificações');
      return res.json();
    },
    enabled: !!user,
  });

  const markAsReadMutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await apiRequest('PUT', `/api/notifications/${id}/read`);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/notifications'] });
    },
    onError: (error: Error) => {
      toast({
        title: 'Erro',
        description: 'Não foi possível marcar a notificação como lida.',
        variant: 'destructive',
      });
    },
  });

  const handleMarkAsRead = (id: number) => {
    markAsReadMutation.mutate(id);
  };

  const unreadCount = notifications?.filter((notification: Notification) => !notification.read).length || 0;

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'error':
        return <CircleX className="h-4 w-4 text-red-500" />;
      case 'warning':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case 'info':
      default:
        return <AlertCircle className="h-4 w-4 text-blue-500" />;
    }
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return format(date, "d 'de' MMMM, HH:mm", { locale: ptBR });
    } catch (error) {
      return dateString;
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="relative text-gray-300 hover:text-white transition"
        >
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-cs-neon text-[10px] font-medium text-black">
              {unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-80 p-0 bg-cs-dark-900 border border-cs-dark-700"
        align="end"
      >
        <div className="flex items-center justify-between bg-cs-dark-800 py-2 px-3 border-b border-cs-dark-700">
          <h3 className="text-sm font-medium text-white">Notificações</h3>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-5 w-5 rounded-full text-gray-400 hover:text-white"
            onClick={() => setOpen(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <ScrollArea className="h-[300px]">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <Loader2 className="h-6 w-6 animate-spin text-cs-neon" />
            </div>
          ) : notifications?.length > 0 ? (
            <div className="py-1">
              {notifications?.map((notification: Notification) => (
                <div 
                  key={notification.id} 
                  className={`px-3 py-2 border-b border-cs-dark-700 last:border-0 ${notification.read ? 'opacity-70' : 'bg-cs-dark-800/50'}`}
                >
                  <div className="flex items-start gap-2">
                    <div className="mt-1">{getIcon(notification.type)}</div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium text-white">{notification.title}</h4>
                        {!notification.read && (
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-5 w-5 rounded-full text-gray-400 hover:text-white"
                            onClick={() => handleMarkAsRead(notification.id)}
                          >
                            <CheckCircle className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                      <p className="text-xs text-gray-300 mt-1">{notification.message}</p>
                      <p className="text-[10px] text-gray-400 mt-1">{formatDate(notification.createdAt)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center p-4">
              <Bell className="h-10 w-10 text-gray-500 mb-2" />
              <p className="text-sm text-gray-300">Não há notificações</p>
              <p className="text-xs text-gray-400 mt-1">Quando houver novidades, aparecerão aqui</p>
            </div>
          )}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}

