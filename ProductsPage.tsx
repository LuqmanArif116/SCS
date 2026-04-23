import { useState } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { ProductCard } from '../components/ProductCard';
import { Search } from 'lucide-react';
import { Product, User } from '../types';
import { CATEGORIES } from '../utils/constants';

interface ProductsPageProps {
  products: Product[];
  user: User;
  onToggleFavorite: (productId: string) => void;
  onBuy: (product: Product) => void;
  onViewDetails: (product: Product) => void;
}

export function ProductsPage({ products, user, onToggleFavorite, onBuy, onViewDetails }: ProductsPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <Card className="bg-slate-800/50 border-slate-700">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-slate-700 border-slate-600 text-white"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-all ${
                    selectedCategory === category
                      ? 'bg-violet-600 text-white'
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProducts.map((product) => (
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

      {filteredProducts.length === 0 && (
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-8 text-center">
            <p className="text-slate-400">No products found</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}