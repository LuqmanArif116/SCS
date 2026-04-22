import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { AuthModal } from './components/AuthModal';
import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { DepositPage } from './pages/DepositPage';
import { WithdrawPage } from './pages/WithdrawPage';
import { OrdersPage } from './pages/OrdersPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { SettingsPage } from './pages/SettingsPage';
import { SellerPanel } from './pages/SellerPanel';
import { ProductDetailModal } from './components/ProductDetailModal';
import { User, Product, Order, Transaction } from './types';
import { generateId, sortProductsByVerified } from './utils/helpers';
import { SAMPLE_PRODUCTS, DEPOSIT_KEYS, VERIFIED_KEYS } from './utils/constants';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(true);
  const [activeTab, setActiveTab] = useState('home');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  const [user, setUser] = useState<User>({
    id: generateId(),
    email: '',
    password: '',
    role: 'buyer',
    isVerified: false,
    balance: 0,
    favorites: [],
    orders: [],
    createdAt: new Date(),
  });

  const [products, setProducts] = useState<Product[]>(SAMPLE_PRODUCTS);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [usedDepositKeys, setUsedDepositKeys] = useState<string[]>([]);
  const [usedVerifiedKeys, setUsedVerifiedKeys] = useState<string[]>([]);
  const [depositAmount, setDepositAmount] = useState(0);
  const [depositKeyInput, setDepositKeyInput] = useState('');
  const [verifiedKeyInput, setVerifiedKeyInput] = useState('');
  const [notifications, setNotifications] = useState<string[]>([]);

  useEffect(() => {
    document.body.style.background = theme === 'dark' ? '#0f172a' : '#f1f5f9';
  }, [theme]);

  const handleLogin = (email: string, password: string) => {
    setUser((prev) => ({ ...prev, email, password }));
    setIsAuthenticated(true);
    setShowAuthModal(false);
    setNotifications(['Welcome to Dark Shop!']);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setShowAuthModal(true);
    setUser({
      id: generateId(),
      email: '',
      password: '',
      role: 'buyer',
      isVerified: false,
      balance: 0,
      favorites: [],
      orders: [],
      createdAt: new Date(),
    });
    setUsedDepositKeys([]);
    setUsedVerifiedKeys([]);
  };

  const verifyDepositKey = (key: string): boolean => {
    if (DEPOSIT_KEYS.includes(key) && !usedDepositKeys.includes(key)) {
      setUsedDepositKeys((prev) => [...prev, key]);
      setUser((prev) => ({
        ...prev,
        balance: prev.balance + depositAmount,
      }));
      setTransactions((prev) => [
        {
          id: generateId(),
          type: 'deposit',
          amount: depositAmount,
          status: 'completed',
          createdAt: new Date(),
        },
        ...prev,
      ]);
      setNotifications((prev) => [...prev, `Deposit of $${depositAmount} successful!`]);
      setDepositAmount(0);
      setDepositKeyInput('');
      return true;
    }
    return false;
  };

  const verifySellerKey = (key: string): boolean => {
    if (VERIFIED_KEYS.includes(key) && !usedVerifiedKeys.includes(key)) {
      setUsedVerifiedKeys((prev) => [...prev, key]);
      setUser((prev) => ({
        ...prev,
        role: 'seller',
        isVerified: true,
      }));
      setNotifications((prev) => [...prev, 'Verified Seller status granted!']);
      setVerifiedKeyInput('');
      return true;
    }
    return false;
  };

  const toggleFavorite = (productId: string) => {
    setUser((prev) => {
      const favorites = prev.favorites.includes(productId)
        ? prev.favorites.filter((id) => id !== productId)
        : [...prev.favorites, productId];
      return { ...prev, favorites };
    });
  };

  const handleBuyProduct = (product: Product) => {
    if (user.balance < product.price) {
      alert('Insufficient balance! Please deposit funds.');
      return;
    }

    const order: Order = {
      id: generateId(),
      productId: product.id,
      productName: product.name,
      price: product.price,
      status: 'completed',
      credentials: product.credentials,
      createdAt: new Date(),
    };

    setUser((prev) => ({
      ...prev,
      balance: prev.balance - product.price,
      orders: [...prev.orders, order],
    }));

    setNotifications((prev) => [...prev, `Order placed: ${product.name}`]);
  };

  const handleWithdraw = (amount: number) => {
    if (amount > user.balance) {
      alert('Insufficient balance!');
      return;
    }

    setUser((prev) => ({
      ...prev,
      balance: prev.balance - amount,
    }));

    setTransactions((prev) => [
      {
        id: generateId(),
        type: 'withdrawal',
        amount,
        status: 'completed',
        createdAt: new Date(),
      },
      ...prev,
    ]);

    setNotifications((prev) => [...prev, `Withdrawal of $${amount} successful!`]);
  };

  const addProduct = (product: Omit<Product, 'id' | 'sellerId' | 'isVerified'>) => {
    const newProduct: Product = {
      ...product,
      id: generateId(),
      sellerId: user.id,
      isVerified: user.isVerified,
    };
    setProducts((prev) => [newProduct, ...prev]);
    setNotifications((prev) => [...prev, `Product "${product.name}" added!`]);
  };

  const renderPage = () => {
    switch (activeTab) {
      case 'home':
        return (
          <HomePage
            products={sortProductsByVerified(products)}
            user={user}
            onToggleFavorite={toggleFavorite}
            onBuy={handleBuyProduct}
            onViewDetails={setSelectedProduct}
          />
        );
      case 'products':
        return (
          <ProductsPage
            products={sortProductsByVerified(products)}
            user={user}
            onToggleFavorite={toggleFavorite}
            onBuy={handleBuyProduct}
            onViewDetails={setSelectedProduct}
          />
        );
      case 'deposit':
        return (
          <DepositPage
            depositAmount={depositAmount}
            setDepositAmount={setDepositAmount}
            depositKeyInput={depositKeyInput}
            setDepositKeyInput={setDepositKeyInput}
            onVerifyKey={verifyDepositKey}
            balance={user.balance}
          />
        );
      case 'withdraw':
        return (
          <WithdrawPage
            balance={user.balance}
            onWithdraw={handleWithdraw}
            transactions={transactions.filter((t) => t.type === 'withdrawal')}
          />
        );
      case 'orders':
        return <OrdersPage orders={user.orders} />;
      case 'favorites':
        return (
          <FavoritesPage
            products={products}
            favorites={user.favorites}
            onToggleFavorite={toggleFavorite}
            onBuy={handleBuyProduct}
            onViewDetails={setSelectedProduct}
          />
        );
      case 'settings':
        return (
          <SettingsPage
            user={user}
            theme={theme}
            setTheme={setTheme}
            onVerifySeller={verifySellerKey}
            verifiedKeyInput={verifiedKeyInput}
            setVerifiedKeyInput={setVerifiedKeyInput}
          />
        );
      case 'seller':
        return (
          <SellerPanel
            user={user}
            products={products.filter((p) => p.sellerId === user.id)}
            onAddProduct={addProduct}
          />
        );
      default:
        return null;
    }
  };

  if (!isAuthenticated) {
    return <AuthModal onLogin={handleLogin} onClose={() => {}} />;
  }

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-slate-950' : 'bg-gray-100'}`}>
      <Header
        user={user}
        theme={theme}
        setTheme={setTheme}
        onLogout={handleLogout}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="flex">
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          user={user}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          theme={theme}
        />

        <main className={`flex-1 lg:ml-64 min-h-screen pt-16 ${theme === 'dark' ? 'bg-slate-950' : 'bg-gray-100'}`}>
          <div className="p-4 lg:p-6">{renderPage()}</div>
        </main>
      </div>

      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          user={user}
          onClose={() => setSelectedProduct(null)}
          onBuy={handleBuyProduct}
          onToggleFavorite={toggleFavorite}
        />
      )}
    </div>
  );
}
