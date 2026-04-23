import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Wallet, Key, Send, Lock } from 'lucide-react';
import { useState } from 'react';

interface DepositPageProps {
  depositAmount: number;
  setDepositAmount: (amount: number) => void;
  depositKeyInput: string;
  setDepositKeyInput: (key: string) => void;
  onVerifyKey: (key: string) => boolean;
  balance: number;
}

export function DepositPage({ depositAmount, setDepositAmount, depositKeyInput, setDepositKeyInput, onVerifyKey, balance }: DepositPageProps) {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleDeposit = () => {
    if (depositAmount <= 0) {
      setError('Please enter a valid amount');
      return;
    }
    if (!depositKeyInput) {
      setError('Please enter a deposit key');
      return;
    }
    
    const result = onVerifyKey(depositKeyInput);
    if (result) {
      setSuccess(true);
      setError('');
      setTimeout(() => setSuccess(false), 3000);
    } else {
      setError('Invalid or used deposit key');
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Wallet className="w-5 h-5 text-emerald-400" />
            Deposit Funds
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-slate-700/50 rounded-lg">
            <p className="text-slate-400 text-sm">Current Balance</p>
            <p className="text-3xl font-bold text-emerald-400">${balance.toFixed(2)}</p>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-slate-400">Amount to Deposit ($)</label>
            <Input
              type="number"
              placeholder="Enter amount"
              value={depositAmount || ''}
              onChange={(e) => setDepositAmount(parseFloat(e.target.value) || 0)}
              className="bg-slate-700 border-slate-600 text-white"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-slate-400 flex items-center gap-2">
              <Key className="w-4 h-4" />
              Deposit Key
            </label>
            <Input
              type="text"
              placeholder="Enter your deposit key"
              value={depositKeyInput}
              onChange={(e) => setDepositKeyInput(e.target.value)}
              className="bg-slate-700 border-slate-600 text-white font-mono"
            />
          </div>

          {error && (
            <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-lg">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          {success && (
            <div className="p-3 bg-emerald-500/20 border border-emerald-500/30 rounded-lg">
              <p className="text-emerald-400 text-sm">Deposit successful!</p>
            </div>
          )}

          <Button
            onClick={handleDeposit}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3"
          >
            <Lock className="w-4 h-4 mr-2" />
            Confirm Deposit
          </Button>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-sky-900/30 to-slate-900 border-sky-500/30">
        <CardContent className="p-6">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="p-3 bg-sky-600 rounded-xl">
              <Send className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-white font-semibold">Need a Deposit Key?</h3>
              <p className="text-slate-400 text-sm mt-1">For deposit activation and verification, contact us on Telegram</p>
            </div>
            <a
              href="https://t.me/Dark_shop_2026"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full"
            >
              <Button className="w-full bg-sky-600 hover:bg-sky-700 text-white">
                <Send className="w-4 h-4 mr-2" />
                Contact on Telegram
              </Button>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}