import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Shield, Mail, Lock } from 'lucide-react';

interface AuthModalProps {
  onLogin: (email: string, password: string) => void;
  onClose: () => void;
}

export function AuthModal({ onLogin }: AuthModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      onLogin(email, password);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-slate-900 border-slate-800">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-violet-600 rounded-xl">
              <Shield className="w-10 h-10 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl text-white">Dark Shop</CardTitle>
          <p className="text-slate-400 mt-2">
            {isRegister ? 'Create your account' : 'Sign in to your account'}
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm text-slate-400">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 bg-slate-800 border-slate-700 text-white"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-slate-400">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 bg-slate-800 border-slate-700 text-white"
                  required
                />
              </div>
            </div>

            <Button type="submit" className="w-full bg-violet-600 hover:bg-violet-700 text-white py-3">
              {isRegister ? 'Create Account' : 'Sign In'}
            </Button>

            <p className="text-center text-slate-400 text-sm">
              {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
              <button
                type="button"
                onClick={() => setIsRegister(!isRegister)}
                className="text-violet-400 hover:text-violet-300"
              >
                {isRegister ? 'Sign In' : 'Register'}
              </button>
            </p>
          </form>

          <div className="mt-6 p-4 bg-slate-800/50 rounded-lg border border-slate-700">
            <p className="text-slate-400 text-sm text-center">
              New users start as <span className="text-emerald-400">Buyers</span>. 
              Use a verification key in Settings to become a <span className="text-amber-400">Seller</span>.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
      }
