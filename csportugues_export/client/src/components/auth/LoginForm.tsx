import { useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

const loginSchema = z.object({
  username: z.string().min(3, 'O nome de utilizador deve ter pelo menos 3 caracteres'),
  password: z.string().min(6, 'A password deve ter pelo menos 6 caracteres')
});

type LoginFormValues = z.infer<typeof loginSchema>;

interface LoginFormProps {
  onSuccess?: () => void;
}

const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const { loginMutation } = useAuth();
  const [rememberMe, setRememberMe] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: ''
    }
  });

  const onSubmit = async (data: LoginFormValues) => {
    loginMutation.mutate(data, {
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
                  placeholder="O seu nome de utilizador"
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
                  placeholder="A sua password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input 
              type="checkbox" 
              id="remember" 
              className="w-4 h-4 bg-cs-dark-700 border border-cs-dark-600 rounded"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
            <label htmlFor="remember" className="ml-2 text-sm text-gray-400">Lembrar-me</label>
          </div>
          <a href="#" className="text-cs-neon text-sm hover:underline">Esqueceu a password?</a>
        </div>
        
        <Button 
          type="submit" 
          className="w-full py-3 bg-gradient-to-r from-cs-neon to-cs-neon/70 text-cs-dark-800 font-orbitron font-semibold rounded hover:shadow-neon transition-shadow duration-300"
          disabled={loginMutation.isPending}
        >
          {loginMutation.isPending ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : null}
          ENTRAR
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
