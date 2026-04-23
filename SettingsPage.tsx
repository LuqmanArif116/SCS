import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Settings, Sun, Moon, Key, User, CheckCircle } from 'lucide-react';
import { User as UserType } from '../types';
import { useState } from 'react';

interface SettingsPageProps {
  user: UserType;
  theme: 'dark' | 'light';
  setTheme: (theme: 'dark' | 'light') => void;
  onVerifySeller: (key: string) => boolean;
  verifiedKeyInput: string;
  setVerifiedKeyInput: (key: string) => void;
}

export function SettingsPage({ user, theme, setTheme, onVerifySeller, verifiedKeyInput, setVerifiedKeyInput }: SettingsPageProps) {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleVerify = () => {
    if (!verifiedKeyInput) {
      setError('Please enter a verification key');
      return;
    }
    const result = onVerifySeller(verifiedKeyInput);
    if (result) {
      setSuccess(true);
      setError('');
      setTimeout(() => setSuccess(false), 3000);
    } else {
      setError('Invalid or used verification key');
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <User className="w-5 h-5 text-violet-400" />
            Profile Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-slate-700/50 rounded-lg">
            <p className="text-slate-400 text-sm">Email</p>
            <p className="text-white font-medium">{user.email}</p>
          </div>
          <div className="p-4 bg-slate-700/50 rounded-lg">
            <p className="text-slate-400 text-sm">Role</p>
            <div className="flex items-center gap-2">
              <span className={`px-3 py-1 rounded ${user.role === 'seller' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-600 text-slate-300'}`}>
                {user.role}
              </span>
              {user.isVerified && (
                <span className="flex items-center gap-1 text-emerald-400 text-sm">
                  <CheckCircle className="w-4 h-4" /> Verified
                </span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Settings className="w-5 h-5 text-amber-400" />
            System Configuration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
            <div className="flex items-center gap-3">
              {theme === 'dark' ? <Moon className="w-5 h-5 text-violet-400" /> : <Sun className="w-5 h-5 text-amber-400" />}
              <span className="text-white">Theme</span>
            </div>
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className={`relative w-14 h-7 rounded-full transition-colors ${theme === 'dark' ? 'bg-violet-600' : 'bg-amber-500'}`}
            >
              <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-transform ${theme === 'dark' ? 'left-1' : 'left-8'}`} />
            </button>
          </div>
        </CardContent>
      </Card>

      {user.role === 'buyer' && (
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Key className="w-5 h-5 text-emerald-400" />
              Become a Verified Seller
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-slate-400 text-sm">Enter a verification key to become a verified seller and list your own products.</p>
            <Input
              type="text"
              placeholder="Enter verification key"
              value={verifiedKeyInput}
              onChange={(e) => setVerifiedKeyInput(e.target.value)}
              className="bg-slate-700 border-slate-600 text-white font-mono"
            />
            {error && (
              <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-lg">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}
            {success && (
              <div className="p-3 bg-emerald-500/20 border border-emerald-500/30 rounded-lg">
                <p className="text-emerald-400 text-sm">Verification successful! You are now a verified seller.</p>
              </div>
            )}
            <Button onClick={handleVerify} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
              <Key className="w-4 h-4 mr-2" />
              Verify Key
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}