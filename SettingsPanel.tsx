import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Sun, Moon, User, Bell, Shield, Palette } from 'lucide-react';
import { User as UserType, ThemeMode } from '../types';

interface SettingsPanelProps {
  user: UserType;
  theme: ThemeMode;
  onThemeChange: (theme: ThemeMode) => void;
}

export function SettingsPanel({ user, theme, onThemeChange }: SettingsPanelProps) {
  return (
    <div className="space-y-6">
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-white">
            <Palette className="w-5 h-5 text-violet-400" />
            Appearance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <button
              onClick={() => onThemeChange('dark')}
              className={`flex-1 p-4 rounded-xl border-2 transition-all ${
                theme === 'dark'
                  ? 'border-violet-500 bg-violet-500/10'
                  : 'border-slate-600 hover:border-slate-500'
              }`}
            >
              <Moon className="w-8 h-8 mx-auto mb-2 text-slate-300" />
              <p className="text-sm text-white font-medium">Dark Mode</p>
            </button>
            <button
              onClick={() => onThemeChange('light')}
              className={`flex-1 p-4 rounded-xl border-2 transition-all ${
                theme === 'light'
                  ? 'border-violet-500 bg-violet-500/10'
                  : 'border-slate-600 hover:border-slate-500'
              }`}
            >
              <Sun className="w-8 h-8 mx-auto mb-2 text-amber-400" />
              <p className="text-sm text-white font-medium">Light Mode</p>
            </button>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-white">
            <User className="w-5 h-5 text-violet-400" />
            Profile Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-slate-300">Email</Label>
              <Input
                value={user.email}
                readOnly
                className="bg-slate-700 border-slate-600 text-slate-400"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-slate-300">Role</Label>
              <div className="flex items-center gap-2 p-2 bg-slate-700 rounded-lg">
                <Shield className={`w-4 h-4 ${user.isVerified ? 'text-emerald-400' : 'text-slate-400'}`} />
                <span className="text-white capitalize">{user.role}</span>
                {user.isVerified && (
                  <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded">
                    Verified
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-slate-300">Account Status</Label>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-emerald-400 text-sm">Active</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-white">
            <Bell className="w-5 h-5 text-violet-400" />
            Notifications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { label: 'Order updates', enabled: true },
              { label: 'New products', enabled: true },
              { label: 'Price alerts', enabled: false },
              { label: 'Newsletter', enabled: false },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                <span className="text-slate-300">{item.label}</span>
                <button
                  className={`w-12 h-6 rounded-full transition-colors ${
                    item.enabled ? 'bg-violet-600' : 'bg-slate-600'
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full transition-transform ${
                      item.enabled ? 'translate-x-6' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
