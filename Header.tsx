import { Button } from './ui/button';
import { Menu, Bell, Wallet, Send, LogOut, Sun, Moon, Shield } from 'lucide-react';
import { User } from '../types';
import { useState } from 'react';

interface HeaderProps {
  user: User;
  theme: 'dark' | 'light';
  setTheme: (theme: 'dark' | 'light') => void;
  onLogout: () => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export function Header({ user, theme, setTheme, onLogout, sidebarOpen, setSidebarOpen }: HeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 ${theme === 'dark' ? 'bg-slate-900/95' : 'bg-white/95'} backdrop-blur-sm border-b ${theme === 'dark' ? 'border-slate-800' : 'border-gray-200'}`}>
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 rounded-lg bg-slate-800 text-white"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <div className="p-2 bg-violet-600 rounded-lg">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">Dark Shop</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://t.me/Dark_shop_2026"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-2 bg-sky-600 hover:bg-sky-700 rounded-lg text-white text-sm transition-colors"
          >
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline">Contact on Telegram</span>
          </a>

          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className={`p-2 rounded-lg ${theme === 'dark' ? 'bg-slate-800 text-yellow-400' : 'bg-gray-200 text-slate-800'}`}
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          <div className="flex items-center gap-2 px-3 py-2 bg-emerald-600/20 border border-emerald-500/30 rounded-lg">
            <Wallet className="w-4 h-4 text-emerald-400" />
            <span className="text-emerald-400 font-semibold">${user.balance.toFixed(2)}</span>
          </div>

          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-lg bg-slate-800 text-white hover:bg-slate-700"
          >
            <Bell className="w-5 h-5" />
            {user.orders.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs flex items-center justify-center text-white">
                {user.orders.length}
              </span>
            )}
          </button>

          <button
            onClick={onLogout}
            className="p-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
                                                                                         }
