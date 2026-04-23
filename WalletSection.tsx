import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Wallet, ArrowDownToLine, ArrowUpFromLine, Plus, Minus } from 'lucide-react';
import { User, Transaction } from '../types';

interface WalletSectionProps {
  user: User;
  onUpdateBalance: (amount: number, type: 'deposit' | 'withdrawal') => void;
  transactions: Transaction[];
}

export function WalletSection({ user, onUpdateBalance, transactions }: WalletSectionProps) {
  const [amount, setAmount] = useState('');
  const [activeTab, setActiveTab] = useState<'deposit' | 'withdraw'>('deposit');

  const handleTransaction = () => {
    const value = parseFloat(amount);
    if (isNaN(value) || value <= 0) return;

    if (activeTab === 'withdraw' && value > user.balance) {
      alert('Insufficient balance');
      return;
    }

    onUpdateBalance(activeTab === 'deposit' ? value : -value, activeTab);
    setAmount('');
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-violet-900/50 to-slate-900 border-violet-500/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-white">
            <div className="p-2 bg-violet-600 rounded-lg">
              <Wallet className="w-5 h-5" />
            </div>
            Your Wallet
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6">
            <p className="text-slate-400 text-sm mb-2">Available Balance</p>
            <h2 className="text-4xl font-bold text-white">${user.balance.toFixed(2)}</h2>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-4">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <div className="flex gap-2">
              <button
                onClick={() => setActiveTab('deposit')}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                  activeTab === 'deposit'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-700 text-slate-300'
                }`}
              >
                <ArrowDownToLine className="w-4 h-4" />
                Deposit
              </button>
              <button
                onClick={() => setActiveTab('withdraw')}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                  activeTab === 'withdraw'
                    ? 'bg-red-600 text-white'
                    : 'bg-slate-700 text-slate-300'
                }`}
              >
                <ArrowUpFromLine className="w-4 h-4" />
                Withdraw
              </button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">$</span>
              <Input
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="pl-8 bg-slate-700 border-slate-600 text-white text-lg"
              />
            </div>
            <div className="flex gap-2">
              {[10, 50, 100, 500].map((val) => (
                <button
                  key={val}
                  onClick={() => setAmount(val.toString())}
                  className="flex-1 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm text-slate-300 transition-colors"
                >
                  ${val}
                </button>
              ))}
            </div>
            <Button
              onClick={handleTransaction}
              className={`w-full ${
                activeTab === 'deposit'
                  ? 'bg-emerald-600 hover:bg-emerald-700'
                  : 'bg-red-600 hover:bg-red-700'
              } text-white`}
            >
              {activeTab === 'deposit' ? (
                <><Plus className="w-4 h-4 mr-2" /> Deposit Funds</>
              ) : (
                <><Minus className="w-4 h-4 mr-2" /> Withdraw Funds</>
              )}
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white text-lg">Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-48 overflow-y-auto">
              {transactions.length === 0 ? (
                <p className="text-slate-500 text-center py-4">No transactions yet</p>
              ) : (
                transactions.slice(0, 5).map((tx) => (
                  <div
                    key={tx.id}
                    className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2 rounded-lg ${
                          tx.type === 'deposit' ? 'bg-emerald-500/20' : 'bg-red-500/20'
                        }`}
                      >
                        {tx.type === 'deposit' ? (
                          <ArrowDownToLine className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <ArrowUpFromLine className="w-4 h-4 text-red-400" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm text-white capitalize">{tx.type}</p>
                        <p className="text-xs text-slate-400">
                          {new Date(tx.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`font-semibold ${
                        tx.type === 'deposit' ? 'text-emerald-400' : 'text-red-400'
                      }`}
                    >
                      {tx.type === 'deposit' ? '+' : '-'}${tx.amount.toFixed(2)}
                    </span>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
