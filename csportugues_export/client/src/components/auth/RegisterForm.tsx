import { useAuth } from '@/hooks/use-auth';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

const registerSchema = z.object({
  username: z.string().min(3, 'O nome de utilizador deve ter pelo menos 3 caracteres'),
  password: z.string().min(6, 'A password deve ter pelo menos 6 caracteres'),
  confirmPassword: z.string().min(6, 'A confirmação da password deve ter pelo menos 6 caracteres')
}).refine((data) => data.password === data.confirmPassword, {
  message: "As passwords não coincidem",
  path: ["confirmPassword"]
});

type RegisterFormValues = z.infer<typeof registerSchema>;

interface RegisterFormProps {
  onSuccess?: () => void;
}

const RegisterForm = ({ onSuccess }: RegisterFormProps) => {
  const { registerMutation } = useAuth();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: '',
      password: '',
      confirmPassword: ''
    }
  });

  const onSubmit = async (data: RegisterFormValues) => {
    const { username, password } = data;
    registerMutation.mutate({ username, password }, {
      onSuccess: () => {
        if (onSuccess) onSuccess();
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-300">Nome de Utilizador</FormLabel>
              <FormControl>
                <Input 
                  {...field} 
                  className="w-full px-4 py-3 bg-cs-dark-700 border border-cs-dark-600 rounded text-gray-200 focus:outline-none focus:border-cs-neon/50" 
                  placeholder="Escolha um nome de utilizador"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-300">Password</FormLabel>
              <FormControl>
                <Input 
                  {...field} 
                  type="password" 
                  className="w-full px-4 py-3 bg-cs-dark-700 border border-cs-dark-600 rounded text-gray-200 focus:outline-none focus:border-cs-neon/50" 
                  placeholder="Escolha uma password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-300">Confirmar Password</FormLabel>
              <FormControl>
                <Input 
                  {...field} 
                  type="password" 
                  className="w-full px-4 py-3 bg-cs-dark-700 border border-cs-dark-600 rounded text-gray-200 focus:outline-none focus:border-cs-neon/50" 
                  placeholder="Confirme a sua password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="space-y-4">
          <p className="text-xs text-gray-400">
            Ao registar-se, concorda com os <a href="#" className="text-cs-neon hover:underline">Termos de Serviço</a> e <a href="#" className="text-cs-neon hover:underline">Política de Privacidade</a>.
          </p>
          
          <Button 
            type="submit" 
            className="w-full py-3 bg-gradient-to-r from-cs-blue to-cs-blue/70 text-white font-orbitron font-semibold rounded hover:shadow-blue transition-shadow duration-300"
            disabled={registerMutation.isPending}
          >
            {registerMutation.isPending ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : null}
            CRIAR CONTA
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default RegisterForm;
