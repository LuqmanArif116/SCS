import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Settings, Zap, Code, Database, Shield, Cpu } from 'lucide-react';

export function AdvancedModule() {
  const features = [
    {
      id: '1',
      name: 'Analytics Dashboard',
      description: 'Advanced sales and traffic analytics',
      icon: <Cpu className="w-5 h-5" />,
      status: 'active',
    },
    {
      id: '2',
      name: 'API Integration',
      description: 'Connect external services via REST API',
      icon: <Code className="w-5 h-5" />,
      status: 'beta',
    },
    {
      id: '3',
      name: 'Data Export',
      description: 'Export orders and transactions to CSV',
      icon: <Database className="w-5 h-5" />,
      status: 'active',
    },
    {
      id: '4',
      name: 'Security Scanner',
      description: 'Scan accounts for security issues',
      icon: <Shield className="w-5 h-5" />,
      status: 'inactive',
    },
  ];

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-amber-900/30 to-slate-900 border-amber-500/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-white">
            <div className="p-2 bg-amber-600 rounded-lg">
              <Zap className="w-5 h-5" />
            </div>
            Advanced System Module
            <span className="text-xs bg-amber-500/20 text-amber-400 px-2 py-1 rounded-full ml-auto">
              Elgira/Morris Edition
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-400 text-sm mb-4">
            Customizable module for advanced features and integrations. Enable or configure tools below.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {features.map((feature) => (
              <div
                key={feature.id}
                className="p-4 bg-slate-800/50 rounded-xl border border-slate-700 hover:border-amber-500/30 transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="p-2 bg-slate-700 rounded-lg text-amber-400">
                    {feature.icon}
                  </div>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      feature.status === 'active'
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : feature.status === 'beta'
                        ? 'bg-amber-500/20 text-amber-400'
                        : 'bg-slate-600 text-slate-400'
                    }`}
                  >
                    {feature.status}
                  </span>
                </div>
                <h3 className="text-white font-medium mb-1">{feature.name}</h3>
                <p className="text-slate-400 text-xs mb-3">{feature.description}</p>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full border-slate-600 text-slate-300 hover:bg-slate-700"
                >
                  <Settings className="w-3 h-3 mr-2" />
                  Configure
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white text-lg">Module Configuration</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-slate-700/50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-300 text-sm">Module Version</span>
                <span className="text-white font-mono">v2.4.1</span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-300 text-sm">Last Updated</span>
                <span className="text-white">2025-01-15</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-300 text-sm">Active Features</span>
                <span className="text-emerald-400">2/4</span>
              </div>
            </div>
            <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white">
              Check for Updates
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
            }
