import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { useAuth } from '@/hooks/use-auth';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const streamerApplicationSchema = z.object({
  name: z.string().min(3, 'O nome deve ter pelo menos 3 caracteres'),
  role: z.string().min(1, 'Escolha um papel'),
  platform: z.string().min(1, 'Escolha uma plataforma'),
  channelUrl: z.string().url('URL inválido. Insira o link completo do seu canal'),
  description: z.string().min(10, 'A descrição deve ter pelo menos 10 caracteres'),
  followers: z.string().min(1, 'Insira o número de seguidores'),
  streams: z.string().min(1, 'Insira o número aproximado de streams de CS2'),
  applicationType: z.enum(['streamer', 'caster', 'both']),
  twitchUrl: z.string().url('URL inválido').or(z.string().length(0)).optional(),
  youtubeUrl: z.string().url('URL inválido').or(z.string().length(0)).optional(),
  twitterUrl: z.string().url('URL inválido').or(z.string().length(0)).optional(),
  instagramUrl: z.string().url('URL inválido').or(z.string().length(0)).optional(),
});

type StreamerApplicationFormValues = z.infer<typeof streamerApplicationSchema>;

interface StreamerApplicationFormProps {
  onSuccess?: () => void;
}

const StreamerApplicationForm = ({ onSuccess }: StreamerApplicationFormProps) => {
  const { toast } = useToast();
  const { user } = useAuth();
  
  const form = useForm<StreamerApplicationFormValues>({
    resolver: zodResolver(streamerApplicationSchema),
    defaultValues: {
      name: '',
      role: '',
      platform: '',
      channelUrl: '',
      description: '',
      followers: '',
      streams: '',
      applicationType: 'streamer',
      twitchUrl: '',
      youtubeUrl: '',
      twitterUrl: '',
      instagramUrl: '',
    }
  });
  
  const applicationMutation = useMutation({
    mutationFn: async (data: StreamerApplicationFormValues) => {
      const social = {
        twitch: data.twitchUrl || undefined,
        youtube: data.youtubeUrl || undefined,
        twitter: data.twitterUrl || undefined,
        instagram: data.instagramUrl || undefined,
      };
      
      const applicationData = {
        name: data.name,
        role: data.role,
        platform: data.platform,
        channelUrl: data.channelUrl,
        description: data.description,
        followers: data.followers,
        streams: data.streams,
        type: data.applicationType,
        applicationType: data.applicationType,
        social,
      };
      
      const res = await apiRequest('POST', '/api/streamers/apply', applicationData);
      return await res.json();
    },
    onSuccess: () => {
      toast({
        title: 'Candidatura Submetida',
        description: 'A tua candidatura foi submetida com sucesso e será analisada pela nossa equipa.',
        variant: 'default',
      });
      
      queryClient.invalidateQueries({ queryKey: ['/api/streamers'] });
      
      if (onSuccess) {
        onSuccess();
      }
    },
    onError: (error: Error) => {
      toast({
        title: 'Erro ao submeter',
        description: error.message || 'Ocorreu um erro ao submeter a tua candidatura. Tenta novamente.',
        variant: 'destructive',
      });
    }
  });
  
  const onSubmit = (data: StreamerApplicationFormValues) => {
    if (!user) {
      toast({
        title: 'Erro',
        description: 'Precisas de iniciar sessão para submeter uma candidatura.',
        variant: 'destructive',
      });
      return;
    }
    
    applicationMutation.mutate(data);
  };
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="bg-cs-dark-800 p-6 rounded-lg border border-cs-dark-700">
          <h3 className="text-lg font-orbitron text-white mb-4">Informação da Candidatura</h3>
          
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="applicationType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-300">Tipo de Candidatura</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full bg-cs-dark-700 border-cs-dark-600 text-gray-200">
                        <SelectValue placeholder="Seleciona o tipo de candidatura" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-cs-dark-700 border-cs-dark-600 text-gray-200">
                      <SelectItem value="streamer">Streamer</SelectItem>
                      <SelectItem value="caster">Caster</SelectItem>
                      <SelectItem value="both">Ambos</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-300">Nome/Nickname</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      className="w-full px-4 py-3 bg-cs-dark-700 border border-cs-dark-600 rounded text-gray-200 focus:outline-none focus:border-cs-neon/50" 
                      placeholder="O teu nome ou nickname utilizado"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="platform"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-300">Plataforma Principal</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full bg-cs-dark-700 border-cs-dark-600 text-gray-200">
                          <SelectValue placeholder="Plataforma" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-cs-dark-700 border-cs-dark-600 text-gray-200">
                        <SelectItem value="twitch">Twitch</SelectItem>
                        <SelectItem value="youtube">YouTube</SelectItem>
                        <SelectItem value="other">Outra</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-300">Papel</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full bg-cs-dark-700 border-cs-dark-600 text-gray-200">
                          <SelectValue placeholder="Papel" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-cs-dark-700 border-cs-dark-600 text-gray-200">
                        <SelectItem value="streamer">Streamer</SelectItem>
                        <SelectItem value="caster">Caster/Comentador</SelectItem>
                        <SelectItem value="both">Ambos</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="channelUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-300">URL do Canal</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      className="w-full px-4 py-3 bg-cs-dark-700 border border-cs-dark-600 rounded text-gray-200 focus:outline-none focus:border-cs-neon/50" 
                      placeholder="https://www.twitch.tv/exemplo"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="followers"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-300">Número de Seguidores</FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        className="w-full px-4 py-3 bg-cs-dark-700 border border-cs-dark-600 rounded text-gray-200 focus:outline-none focus:border-cs-neon/50" 
                        placeholder="Ex: 1000"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="streams"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-300">Streams de CS2</FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        className="w-full px-4 py-3 bg-cs-dark-700 border border-cs-dark-600 rounded text-gray-200 focus:outline-none focus:border-cs-neon/50" 
                        placeholder="Quantas streams de CS2 fizeste"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-300">Descrição/Biografia</FormLabel>
                  <FormControl>
                    <Textarea 
                      {...field} 
                      className="w-full px-4 py-3 bg-cs-dark-700 border border-cs-dark-600 rounded text-gray-200 focus:outline-none focus:border-cs-neon/50 min-h-[100px]" 
                      placeholder="Conta-nos mais sobre ti, o teu conteúdo e a tua ligação ao CS2"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        
        <div className="bg-cs-dark-800 p-6 rounded-lg border border-cs-dark-700">
          <h3 className="text-lg font-orbitron text-white mb-4">Redes Sociais</h3>
          
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="twitchUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-300">Twitch</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      className="w-full px-4 py-3 bg-cs-dark-700 border border-cs-dark-600 rounded text-gray-200 focus:outline-none focus:border-cs-neon/50" 
                      placeholder="https://www.twitch.tv/teucanal"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="youtubeUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-300">YouTube</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      className="w-full px-4 py-3 bg-cs-dark-700 border border-cs-dark-600 rounded text-gray-200 focus:outline-none focus:border-cs-neon/50" 
                      placeholder="https://www.youtube.com/c/teucanal"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="twitterUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-300">Twitter/X</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      className="w-full px-4 py-3 bg-cs-dark-700 border border-cs-dark-600 rounded text-gray-200 focus:outline-none focus:border-cs-neon/50" 
                      placeholder="https://twitter.com/teuusername"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="instagramUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-300">Instagram</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      className="w-full px-4 py-3 bg-cs-dark-700 border border-cs-dark-600 rounded text-gray-200 focus:outline-none focus:border-cs-neon/50" 
                      placeholder="https://www.instagram.com/teuusername"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        
        <div className="flex justify-end">
          <Button 
            type="submit" 
            className="px-6 py-3 bg-gradient-to-r from-cs-blue to-cs-blue/70 text-white font-orbitron font-semibold rounded hover:shadow-blue transition-shadow duration-300"
            disabled={applicationMutation.isPending}
          >
            {applicationMutation.isPending ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                A SUBMETER...
              </>
            ) : 'SUBMETER CANDIDATURA'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default StreamerApplicationForm;