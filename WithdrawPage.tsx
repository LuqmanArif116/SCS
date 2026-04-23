import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Download, Wallet } from 'lucide-react';
import { Transaction } from '../types';
import { formatDate } from '../utils/helpers';
import { useState } from 'react';

interface WithdrawPageProps {
  balance: number;
  onWithdraw: (amount: number) => void;
  transactions: Transaction[];
}

export function WithdrawPage({ balance, onWithdraw, transactions }: WithdrawPageProps) {
  const [amount, setAmount] = useState(0);
  const [error, setError] = useState('');

  const handleWithdraw = () => {
    if (amount <= 0) {
      setError('Please enter a valid amount');
      return;
    }
    if (amount > balance) {
      setError('Insufficient balance');
      return;
    }
    onWithdraw(amount);
    setAmount(0);
    setError('');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Download className="w-5 h-5 text-violet-400" />
            Withdraw Funds
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-slate-700/50 rounded-lg">
            <p className="text-slate-400 text-sm">Available Balance</p>
            <p className="text-3xl font-bold text-emerald-400">${balance.toFixed(2)}</p>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-slate-400">Amount to Withdraw ($)</label>
            <Input
              type="number"
              placeholder="Enter amount"
              value={amount || ''}
              onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
              className="bg-slate-700 border-slate-600 text-white"
            />
          </div>

          {error && (
            <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-lg">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          <Button
            onClick={handleWithdraw}
            className="w-full bg-violet-600 hover:bg-violet-700 text-white py-3"
          >
            <Download className="w-4 h-4 mr-2" />
            Withdraw
          </Button>
        </CardContent>
      </Card>

      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Wallet className="w-5 h-5 text-amber-400" />
            Transaction History
          </CardTitle>
        </CardHeader>
        <CardContent>
          {transactions.length === 0 ? (
            <p className="text-slate-400 text-center py-4">No withdrawal history</p>
          ) : (
            <div className="space-y-2">
              {transactions.map((tx) => (
                <div
                  key={tx.id}
                  className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg"
                >
                  <div>
                    <p className="text-white font-medium">Withdrawal</p>
                    <p className="text-slate-400 text-sm">{formatDate(tx.createdAt)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-red-400 font-semibold">-${tx.amount.toFixed(2)}</p>
                    <p className="text-xs text-emerald-400">{tx.status}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}