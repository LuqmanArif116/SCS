import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { ProductCard } from '../components/ProductCard';
import { ShoppingBag, Wallet, Heart, Star, Send } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Product, User } from '../types';

interface HomePageProps {
  products: Product[];
  user: User;
  onToggleFavorite: (productId: string) => void;
  onBuy: (product: Product) => void;
  onViewDetails: (product: Product) => void;
}

export function HomePage({ products, user, onToggleFavorite, onBuy, onViewDetails }: HomePageProps) {
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-violet-900/50 to-slate-900 border-violet-500/30">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-violet-600 rounded-xl">
                <ShoppingBag className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-slate-400 text-sm">Total Products</p>
                <p className="text-2xl font-bold text-white">{products.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-emerald-900/50 to-slate-900 border-emerald-500/30">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-emerald-600 rounded-xl">
                <Wallet className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-slate-400 text-sm">Your Balance</p>
                <p className="text-2xl font-bold text-white">${user.balance.toFixed(2)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-amber-900/50 to-slate-900 border-amber-500/30">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-amber-600 rounded-xl">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-slate-400 text-sm">Favorites</p>
                <p className="text-2xl font-bold text-white">{user.favorites.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Star className="w-5 h-5 text-amber-400" />
            Featured Products (Verified Sellers)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.filter((p) => p.isVerified).slice(0, 3).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                user={user}
                onToggleFavorite={onToggleFavorite}
                onBuy={onBuy}
                onViewDetails={onViewDetails}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-sky-900/30 to-slate-900 border-sky-500/30">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="p-3 bg-sky-600 rounded-xl">
              <Send className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h3 className="text-white font-semibold">Contact us on Telegram</h3>
              <p className="text-slate-400 text-sm">Dark_shop_2026 - For deposit activation and verification, contact us on Telegram</p>
            </div>
            <a
              href="https://t.me/Dark_shop_2026"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="bg-sky-600 hover:bg-sky-700 text-white">
                <Send className="w-4 h-4 mr-2" />
                Open Telegram
              </Button>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}