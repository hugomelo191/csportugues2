import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { useAuth } from '@/hooks/use-auth';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { useState } from 'react';

const playerProfileSchema = z.object({
  username: z.string().min(3, 'O username deve ter pelo menos 3 caracteres'),
  position: z.string().min(1, 'Seleciona uma posição'),
  level: z.string().min(1, 'Seleciona um nível'),
  experience: z.string().min(3, 'Descreve a tua experiência'),
  availability: z.string().min(1, 'Indica a tua disponibilidade'),
  contact: z.string().min(3, 'Indica um contacto'),
  skillRifle: z.number().min(0).max(100),
  skillAWP: z.number().min(0).max(100),
  skillPistol: z.number().min(0).max(100),
  skillLeadership: z.number().min(0).max(100),
  skillUtility: z.number().min(0).max(100),
  languages: z.array(z.string()).min(1, 'Seleciona pelo menos um idioma'),
});

type PlayerProfileFormValues = z.infer<typeof playerProfileSchema>;

interface PlayerProfileFormProps {
  onSuccess?: () => void;
}

const PlayerProfileForm = ({ onSuccess }: PlayerProfileFormProps) => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  
  // Verificar se o utilizador já tem um perfil de jogador
  const { data: existingProfile, isLoading: profileLoading } = useQuery<any>({
    queryKey: ['/api/players'],
    queryFn: async () => {
      try {
        const res = await fetch('/api/profile');
        if (!res.ok) return null;
        return await res.json();
      } catch (error) {
        return null;
      }
    },
    enabled: !!user, // Só faz query se o utilizador estiver autenticado
  });
  
  const form = useForm<PlayerProfileFormValues>({
    resolver: zodResolver(playerProfileSchema),
    defaultValues: {
      username: user?.username || '',
      position: '',
      level: 'Amador',
      experience: '',
      availability: '',
      contact: '',
      skillRifle: 50,
      skillAWP: 50,
      skillPistol: 50,
      skillLeadership: 50,
      skillUtility: 50,
      languages: ['Português'],
    }
  });
  
  // Atualizar o formulário quando os dados do perfil existente estiverem disponíveis
  useEffect(() => {
    if (existingProfile) {
      setIsEditing(true);
      // Mapear e preencher os dados existentes
      form.reset({
        username: existingProfile.username || user?.username || '',
        position: existingProfile.position || '',
        level: existingProfile.level || 'Amador',
        experience: existingProfile.experience || '',
        availability: existingProfile.availability || '',
        contact: existingProfile.contact || '',
        skillRifle: existingProfile.skills?.rifle || 50,
        skillAWP: existingProfile.skills?.awp || 50,
        skillPistol: existingProfile.skills?.pistol || 50,
        skillLeadership: existingProfile.skills?.leadership || 50,
        skillUtility: existingProfile.skills?.utility || 50,
        languages: existingProfile.languages || ['Português'],
      });
    }
  }, [existingProfile, form, user]);
  
  const playerProfileMutation = useMutation({
    mutationFn: async (data: PlayerProfileFormValues) => {
      const profileData = {
        username: data.username,
        position: data.position,
        level: data.level,
        experience: data.experience,
        availability: data.availability,
        contact: data.contact,
        skills: [
          { name: 'Rifle', value: data.skillRifle },
          { name: 'AWP', value: data.skillAWP },
          { name: 'Pistola', value: data.skillPistol },
          { name: 'Liderança', value: data.skillLeadership },
          { name: 'Utilidade', value: data.skillUtility },
        ],
        languages: data.languages,
      };
      
      const endpoint = isEditing ? `/api/players/${existingProfile.id}` : '/api/players';
      const method = isEditing ? 'PUT' : 'POST';
      
      const res = await apiRequest(method, endpoint, profileData);
      return await res.json();
    },
    onSuccess: () => {
      toast({
        title: isEditing ? 'Perfil Atualizado' : 'Perfil Criado',
        description: isEditing 
          ? 'O teu perfil de jogador foi atualizado com sucesso.' 
          : 'O teu perfil de jogador foi criado com sucesso.',
        variant: 'default',
      });
      
      queryClient.invalidateQueries({ queryKey: ['/api/players'] });
      queryClient.invalidateQueries({ queryKey: ['/api/profile'] });
      
      if (onSuccess) {
        onSuccess();
      }
    },
    onError: (error: Error) => {
      toast({
        title: 'Erro',
        description: error.message || 'Ocorreu um erro. Tenta novamente.',
        variant: 'destructive',
      });
    }
  });
  
  const onSubmit = (data: PlayerProfileFormValues) => {
    if (!user) {
      toast({
        title: 'Erro',
        description: 'Precisas de iniciar sessão para criar ou editar o teu perfil.',
        variant: 'destructive',
      });
      return;
    }
    
    playerProfileMutation.mutate(data);
  };
  
  if (profileLoading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-cs-neon" />
      </div>
    );
  }
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="bg-cs-dark-800 p-6 rounded-lg border border-cs-dark-700">
          <h3 className="text-lg font-orbitron text-white mb-4">Informações Básicas</h3>
          
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-300">Nome de Jogo/Nickname</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      className="w-full px-4 py-3 bg-cs-dark-700 border border-cs-dark-600 rounded text-gray-200 focus:outline-none focus:border-cs-neon/50" 
                      placeholder="O teu nome no CS2"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="position"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-300">Posição Principal</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full bg-cs-dark-700 border-cs-dark-600 text-gray-200">
                          <SelectValue placeholder="Posição" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-cs-dark-700 border-cs-dark-600 text-gray-200">
                        <SelectItem value="Entry Fragger">Entry Fragger</SelectItem>
                        <SelectItem value="AWPer">AWPer</SelectItem>
                        <SelectItem value="Rifler">Rifler</SelectItem>
                        <SelectItem value="Support">Support</SelectItem>
                        <SelectItem value="IGL">In-Game Leader (IGL)</SelectItem>
                        <SelectItem value="Lurker">Lurker</SelectItem>
                        <SelectItem value="Flex">Flex (Múltiplas posições)</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="level"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-300">Nível</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full bg-cs-dark-700 border-cs-dark-600 text-gray-200">
                          <SelectValue placeholder="Nível" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-cs-dark-700 border-cs-dark-600 text-gray-200">
                        <SelectItem value="Iniciante">Iniciante</SelectItem>
                        <SelectItem value="Amador">Amador</SelectItem>
                        <SelectItem value="Intermediário">Intermediário</SelectItem>
                        <SelectItem value="Avançado">Avançado</SelectItem>
                        <SelectItem value="Semi-Profissional">Semi-Profissional</SelectItem>
                        <SelectItem value="Profissional">Profissional</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="experience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-300">Experiência</FormLabel>
                  <FormControl>
                    <Textarea 
                      {...field} 
                      className="w-full px-4 py-3 bg-cs-dark-700 border border-cs-dark-600 rounded text-gray-200 focus:outline-none focus:border-cs-neon/50 min-h-[80px]" 
                      placeholder="Descreve a tua experiência com CS2 e/ou CS:GO (anos, competições, equipas anteriores, etc.)"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="availability"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-300">Disponibilidade</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      className="w-full px-4 py-3 bg-cs-dark-700 border border-cs-dark-600 rounded text-gray-200 focus:outline-none focus:border-cs-neon/50" 
                      placeholder="Ex: 2-3 dias por semana, noites e fins-de-semana"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="languages"
              render={() => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-300">Idiomas</FormLabel>
                  <div className="space-y-2">
                    <FormField
                      control={form.control}
                      name="languages"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes('Português')}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, 'Português'])
                                  : field.onChange(field.value?.filter(value => value !== 'Português'));
                              }}
                            />
                          </FormControl>
                          <FormLabel className="text-gray-300 cursor-pointer">Português</FormLabel>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="languages"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes('Inglês')}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, 'Inglês'])
                                  : field.onChange(field.value?.filter(value => value !== 'Inglês'));
                              }}
                            />
                          </FormControl>
                          <FormLabel className="text-gray-300 cursor-pointer">Inglês</FormLabel>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="languages"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes('Espanhol')}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, 'Espanhol'])
                                  : field.onChange(field.value?.filter(value => value !== 'Espanhol'));
                              }}
                            />
                          </FormControl>
                          <FormLabel className="text-gray-300 cursor-pointer">Espanhol</FormLabel>
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="contact"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-300">Contacto</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      className="w-full px-4 py-3 bg-cs-dark-700 border border-cs-dark-600 rounded text-gray-200 focus:outline-none focus:border-cs-neon/50" 
                      placeholder="Discord, Steam, etc."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        
        <div className="bg-cs-dark-800 p-6 rounded-lg border border-cs-dark-700">
          <h3 className="text-lg font-orbitron text-white mb-4">Habilidades</h3>
          
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="skillRifle"
              render={({ field }) => (
                <FormItem>
                  <div className="flex justify-between items-center mb-2">
                    <FormLabel className="text-sm font-medium text-gray-300">Rifle</FormLabel>
                    <span className="text-xs font-medium text-cs-neon">{field.value}%</span>
                  </div>
                  <FormControl>
                    <Slider
                      min={0}
                      max={100}
                      step={1}
                      value={[field.value]}
                      onValueChange={(values) => field.onChange(values[0])}
                      className="py-2"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="skillAWP"
              render={({ field }) => (
                <FormItem>
                  <div className="flex justify-between items-center mb-2">
                    <FormLabel className="text-sm font-medium text-gray-300">AWP</FormLabel>
                    <span className="text-xs font-medium text-cs-neon">{field.value}%</span>
                  </div>
                  <FormControl>
                    <Slider
                      min={0}
                      max={100}
                      step={1}
                      value={[field.value]}
                      onValueChange={(values) => field.onChange(values[0])}
                      className="py-2"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="skillPistol"
              render={({ field }) => (
                <FormItem>
                  <div className="flex justify-between items-center mb-2">
                    <FormLabel className="text-sm font-medium text-gray-300">Pistola</FormLabel>
                    <span className="text-xs font-medium text-cs-neon">{field.value}%</span>
                  </div>
                  <FormControl>
                    <Slider
                      min={0}
                      max={100}
                      step={1}
                      value={[field.value]}
                      onValueChange={(values) => field.onChange(values[0])}
                      className="py-2"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="skillLeadership"
              render={({ field }) => (
                <FormItem>
                  <div className="flex justify-between items-center mb-2">
                    <FormLabel className="text-sm font-medium text-gray-300">Liderança</FormLabel>
                    <span className="text-xs font-medium text-cs-neon">{field.value}%</span>
                  </div>
                  <FormControl>
                    <Slider
                      min={0}
                      max={100}
                      step={1}
                      value={[field.value]}
                      onValueChange={(values) => field.onChange(values[0])}
                      className="py-2"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="skillUtility"
              render={({ field }) => (
                <FormItem>
                  <div className="flex justify-between items-center mb-2">
                    <FormLabel className="text-sm font-medium text-gray-300">Utilidade</FormLabel>
                    <span className="text-xs font-medium text-cs-neon">{field.value}%</span>
                  </div>
                  <FormControl>
                    <Slider
                      min={0}
                      max={100}
                      step={1}
                      value={[field.value]}
                      onValueChange={(values) => field.onChange(values[0])}
                      className="py-2"
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
            disabled={playerProfileMutation.isPending}
          >
            {playerProfileMutation.isPending ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                {isEditing ? 'A ATUALIZAR...' : 'A CRIAR...'}
              </>
            ) : isEditing ? 'ATUALIZAR PERFIL' : 'CRIAR PERFIL'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PlayerProfileForm;