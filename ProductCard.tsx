import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Heart, ShoppingBag, Check, Star } from 'lucide-react';
import { Product, User } from '../types';

interface ProductCardProps {
  product: Product;
  user: User;
  onToggleFavorite: (productId: string) => void;
  onBuy: (product: Product) => void;
  onViewDetails: (product: Product) => void;
}

export function ProductCard({ product, user, onToggleFavorite, onBuy, onViewDetails }: ProductCardProps) {
  const isFavorite = user.favorites.includes(product.id);

  return (
    <Card className={`bg-slate-800/50 border-slate-700 hover:border-violet-500/50 transition-all duration-300 ${product.isVerified ? 'ring-1 ring-emerald-500/30' : ''}`}>
      <CardContent className="p-4">
        <div className="relative mb-3">
          <div className="w-full h-32 bg-gradient-to-br from-slate-700 to-slate-800 rounded-lg flex items-center justify-center">
            <ShoppingBag className="w-12 h-12 text-slate-500" />
          </div>
          <button
            onClick={() => onToggleFavorite(product.id)}
            className={`absolute top-2 right-2 p-2 rounded-full ${isFavorite ? 'bg-red-500/20 text-red-400' : 'bg-slate-900/80 text-slate-400'} hover:scale-110 transition-transform`}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
          </button>
          {product.isVerified && (
            <div className="absolute top-2 left-2 flex items-center gap-1 px-2 py-1 bg-emerald-500/20 rounded-full">
              <Check className="w-3 h-3 text-emerald-400" />
              <span className="text-xs text-emerald-400">Verified</span>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-white font-semibold truncate">{product.name}</h3>
            {product.isVerified && <Star className="w-4 h-4 text-amber-400 fill-current" />}
          </div>
          <p className="text-slate-400 text-sm line-clamp-2">{product.description}</p>
          <div className="flex items-center justify-between pt-2">
            <span className="text-xl font-bold text-emerald-400">${product.price}</span>
            <div className="flex gap-2">
              <Button
                onClick={() => onViewDetails(product)}
                variant="outline"
                className="border-slate-600 text-slate-300 hover:bg-slate-700"
              >
                Details
              </Button>
              <Button
                onClick={() => onBuy(product)}
                className="bg-violet-600 hover:bg-violet-700 text-white"
              >
                Buy
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
