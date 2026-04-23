import { Home, ShoppingBag, Wallet, Download, Bell, Heart, Settings, UserCheck, X } from 'lucide-react';
import { User } from '../types';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  user: User;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  theme: 'dark' | 'light';
}

export function Sidebar({ activeTab, setActiveTab, user, sidebarOpen, setSidebarOpen, theme }: SidebarProps) {
  const menuItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'products', icon: ShoppingBag, label: 'Products' },
    { id: 'deposit', icon: Wallet, label: 'Deposit' },
    { id: 'withdraw', icon: Download, label: 'Withdraw' },
    { id: 'orders', icon: Bell, label: 'My Orders' },
    { id: 'favorites', icon: Heart, label: 'Favorites' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  if (user.role === 'seller') {
    menuItems.push({ id: 'seller', icon: UserCheck, label: 'Seller Panel' });
  }

  return (
    <>
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 ${
          theme === 'dark' ? 'bg-slate-900' : 'bg-white'
        } border-r ${theme === 'dark' ? 'border-slate-800' : 'border-gray-200'} z-50 transform transition-transform lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-4 lg:hidden flex justify-between items-center border-b border-slate-800">
          <span className="text-white font-semibold">Menu</span>
          <button onClick={() => setSidebarOpen(false)} className="text-slate-400">
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="p-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                activeTab === item.id
                  ? 'bg-violet-600 text-white'
                  : theme === 'dark'
                  ? 'text-slate-400 hover:bg-slate-800 hover:text-white'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-800">
          <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-slate-800' : 'bg-gray-100'}`}>
            <p className="text-sm text-slate-400">Logged in as:</p>
            <p className="text-white font-medium truncate">{user.email}</p>
            <div className="flex items-center gap-2 mt-1">
              <span className={`text-xs px-2 py-1 rounded ${user.role === 'seller' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-700 text-slate-300'}`}>
                {user.role}
              </span>
              {user.isVerified && (
                <span className="text-xs text-emerald-400">Verified</span>
              )}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
