import { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-cs-dark-800 border border-cs-dark-600 p-0 sm:max-w-md">
        <div className="p-6">
          <div className="flex items-center space-x-2 mb-6">
            <div className="relative h-8 w-8 flex items-center justify-center bg-cs-dark-600 rounded">
              <span className="text-cs-neon font-orbitron font-bold text-sm">CS</span>
            </div>
            <span className="font-orbitron font-bold text-lg text-white">
              <span className="text-cs-neon">CS</span>Portugues
            </span>
          </div>
          
          <div className="flex mb-6 border-b border-cs-dark-600">
            <button 
              className={`pb-3 px-4 font-orbitron font-medium text-sm ${activeTab === 'login' ? 'text-cs-neon border-b-2 border-cs-neon' : 'text-gray-400'}`}
              onClick={() => setActiveTab('login')}
            >
              Login
            </button>
            <button 
              className={`pb-3 px-4 font-orbitron font-medium text-sm ${activeTab === 'register' ? 'text-cs-neon border-b-2 border-cs-neon' : 'text-gray-400'}`}
              onClick={() => setActiveTab('register')}
            >
              Registar
            </button>
          </div>
          
          {activeTab === 'login' ? <LoginForm onSuccess={onClose} /> : <RegisterForm onSuccess={onClose} />}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
