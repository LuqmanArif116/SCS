import { Card, CardContent } from '../components/ui/card';
import { ProductCard } from '../components/ProductCard';
import { Heart } from 'lucide-react';
import { Product } from '../types';

interface FavoritesPageProps {
  products: Product[];
  favorites: string[];
  onToggleFavorite: (productId: string) => void;
  onBuy: (product: Product) => void;
  onViewDetails: (product: Product) => void;
}

export function FavoritesPage({ products, favorites, onToggleFavorite, onBuy, onViewDetails }: FavoritesPageProps) {
  const favoriteProducts = products.filter((p) => favorites.includes(p.id));

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white flex items-center gap-2">
        <Heart className="w-6 h-6 text-red-400" />
        Your Favorites
      </h2>
      {favoriteProducts.length === 0 ? (
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-8 text-center">
            <Heart className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <p className="text-slate-400">No favorites yet</p>
            <p className="text-slate-500 text-sm mt-1">Products you favorite will appear here</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {favoriteProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              user={{ favorites } as any}
              onToggleFavorite={onToggleFavorite}
              onBuy={onBuy}
              onViewDetails={onViewDetails}
            />
          ))}
        </div>
      )}
    </div>
  );
}