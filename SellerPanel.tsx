import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Plus, Package, Check } from 'lucide-react';
import { User, Product } from '../types';
import { useState } from 'react';
import { CATEGORIES } from '../utils/constants';

interface SellerPanelProps {
  user: User;
  products: Product[];
  onAddProduct: (product: Omit<Product, 'id' | 'sellerId' | 'isVerified'>) => void;
}

export function SellerPanel({ user, products, onAddProduct }: SellerPanelProps) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Instagram');
  const [credentials, setCredentials] = useState({ email: '', password: '', additionalInfo: '' });

  const handleSubmit = () => {
    if (!name || price <= 0 || !description || !credentials.email || !credentials.password) {
      alert('Please fill all required fields');
      return;
    }
    onAddProduct({
      name,
      price,
      description,
      category,
      image: '',
      credentials,
    });
    setName('');
    setPrice(0);
    setDescription('');
    setCredentials({ email: '', password: '', additionalInfo: '' });
  };

  if (user.role !== 'seller') {
    return (
      <Card className="bg-slate-800/50 border-slate-700">
        <CardContent className="p-8 text-center">
          <p className="text-slate-400">You need to be a verified seller to access this panel.</p>
          <p className="text-slate-500 text-sm mt-2">Go to Settings to verify your account.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Plus className="w-5 h-5 text-emerald-400" />
            Add New Product
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm text-slate-400">Product Name</label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Instagram Account - 10K Followers"
                className="bg-slate-700 border-slate-600 text-white"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-slate-400">Price ($)</label>
              <Input
                type="number"
                value={price || ''}
                onChange={(e) => setPrice(parseFloat(e.target.value) || 0)}
                placeholder="50"
                className="bg-slate-700 border-slate-600 text-white"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-slate-400">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
            >
              {CATEGORIES.filter((c) => c !== 'All').map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-slate-400">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your product..."
              className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white min-h-24"
            />
          </div>

          <div className="p-4 bg-slate-700/50 rounded-lg space-y-3">
            <h4 className="text-white font-medium">Product Credentials</h4>
            <div className="grid md:grid-cols-2 gap-3">
              <Input
                value={credentials.email}
                onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                placeholder="Email/Username"
                className="bg-slate-600 border-slate-500 text-white"
              />
              <Input
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                placeholder="Password"
                className="bg-slate-600 border-slate-500 text-white"
              />
            </div>
            <Input
              value={credentials.additionalInfo}
              onChange={(e) => setCredentials({ ...credentials, additionalInfo: e.target.value })}
              placeholder="Additional info (optional)"
              className="bg-slate-600 border-slate-500 text-white"
            />
          </div>

          <Button onClick={handleSubmit} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3">
            <Plus className="w-4 h-4 mr-2" />
            Add Product
          </Button>
        </CardContent>
      </Card>

      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Package className="w-5 h-5 text-violet-400" />
            Your Products ({products.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {products.length === 0 ? (
            <p className="text-slate-400 text-center py-4">No products yet</p>
          ) : (
            <div className="space-y-3">
              {products.map((product) => (
                <div key={product.id} className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                  <div>
                    <p className="text-white font-medium">{product.name}</p>
                    <p className="text-slate-400 text-sm">{product.category}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-emerald-400 font-semibold">${product.price}</span>
                    {product.isVerified && (
                      <span className="flex items-center gap-1 text-emerald-400 text-sm">
                        <Check className="w-4 h-4" /> Verified
                      </span>
                    )}
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