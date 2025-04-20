import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Upload } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { useAuth } from '@/hooks/use-auth';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState } from 'react';

const teamCreationSchema = z.object({
  name: z.string().min(3, 'O nome deve ter pelo menos 3 caracteres').max(50, 'O nome não pode ter mais de 50 caracteres'),
  logo: z.string().optional(),
  region: z.string().min(1, 'Seleciona uma região'),
  tier: z.string().min(1, 'Seleciona um nível'),
  description: z.string().min(10, 'A descrição deve ter pelo menos 10 caracteres').max(500, 'A descrição não pode ter mais de 500 caracteres'),
});

type TeamCreationFormValues = z.infer<typeof teamCreationSchema>;

interface TeamCreationFormProps {
  onSuccess?: () => void;
}

const TeamCreationForm = ({ onSuccess }: TeamCreationFormProps) => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  
  const form = useForm<TeamCreationFormValues>({
    resolver: zodResolver(teamCreationSchema),
    defaultValues: {
      name: '',
      logo: '',
      region: 'Portugal',
      tier: 'Amador',
      description: '',
    }
  });
  
  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Em um ambiente real, isto seria enviado para o servidor
      // Por agora, apenas criamos um preview local para o utilizador
      const reader = new FileReader();
      reader.onload = () => {
        setLogoPreview(reader.result as string);
        form.setValue('logo', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const teamCreationMutation = useMutation({
    mutationFn: async (data: TeamCreationFormValues) => {
      const teamData = {
        ...data,
        members: [] // Inicialmente, a equipa só tem o dono
      };
      
      const res = await apiRequest('POST', '/api/teams', teamData);
      return await res.json();
    },
    onSuccess: () => {
      toast({
        title: 'Equipa Criada',
        description: 'A tua equipa foi criada com sucesso e está a aguardar aprovação. Podes ver o estado na secção "Minhas Equipas".',
        variant: 'default',
      });
      
      queryClient.invalidateQueries({ queryKey: ['/api/teams'] });
      
      if (onSuccess) {
        onSuccess();
      }
    },
    onError: (error: Error) => {
      toast({
        title: 'Erro ao criar equipa',
        description: error.message || 'Ocorreu um erro ao criar a equipa. Tenta novamente.',
        variant: 'destructive',
      });
    }
  });
  
  const onSubmit = (data: TeamCreationFormValues) => {
    if (!user) {
      toast({
        title: 'Erro',
        description: 'Precisas de iniciar sessão para criar uma equipa.',
        variant: 'destructive',
      });
      return;
    }
    
    teamCreationMutation.mutate(data);
  };
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="bg-cs-dark-800 p-6 rounded-lg border border-cs-dark-700">
          <h3 className="text-lg font-orbitron text-white mb-4">Informações da Equipa</h3>
          
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-300">Nome da Equipa</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      className="w-full px-4 py-3 bg-cs-dark-700 border border-cs-dark-600 rounded text-gray-200 focus:outline-none focus:border-cs-neon/50" 
                      placeholder="Nome da tua equipa"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="region"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-300">Região</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full bg-cs-dark-700 border-cs-dark-600 text-gray-200">
                          <SelectValue placeholder="Região" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-cs-dark-700 border-cs-dark-600 text-gray-200">
                        <SelectItem value="Portugal">Portugal (todo)</SelectItem>
                        <SelectItem value="Norte">Norte</SelectItem>
                        <SelectItem value="Centro">Centro</SelectItem>
                        <SelectItem value="Sul">Sul</SelectItem>
                        <SelectItem value="Ilhas">Ilhas</SelectItem>
                        <SelectItem value="Internacional">Internacional</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="tier"
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
              name="logo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-300">Logo da Equipa</FormLabel>
                  <div className="flex items-start gap-4">
                    {logoPreview && (
                      <div className="w-20 h-20 rounded overflow-hidden bg-cs-dark-600">
                        <img src={logoPreview} alt="Logo Preview" className="w-full h-full object-cover" />
                      </div>
                    )}
                    <div className="flex-1">
                      <div className="relative">
                        <Input
                          id="logo-upload"
                          type="file"
                          accept="image/*"
                          className="absolute inset-0 opacity-0 cursor-pointer z-10 h-full"
                          onChange={handleLogoChange}
                        />
                        <div className="px-4 py-3 bg-cs-dark-700 border border-cs-dark-600 rounded text-gray-200 flex items-center gap-2 w-full">
                          <Upload className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-400">Escolher logo da equipa</span>
                        </div>
                      </div>
                      <FormDescription className="text-xs text-gray-400 mt-1">
                        Formatos aceites: JPG, PNG. Tamanho máximo: 2MB.
                      </FormDescription>
                    </div>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-300">Descrição</FormLabel>
                  <FormControl>
                    <Textarea 
                      {...field} 
                      className="w-full px-4 py-3 bg-cs-dark-700 border border-cs-dark-600 rounded text-gray-200 focus:outline-none focus:border-cs-neon/50 min-h-[100px]" 
                      placeholder="Descreve a tua equipa, objectivos, história, e qualquer outra informação relevante..."
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
            disabled={teamCreationMutation.isPending}
          >
            {teamCreationMutation.isPending ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                A CRIAR...
              </>
            ) : 'CRIAR EQUIPA'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default TeamCreationForm;