import React, { useState, useEffect } from 'react';
import {
  ShoppingBag,
  Plus,
  Trash2,
  Edit,
  Search,
  Truck,
  CheckCircle,
  Clock,
  ShieldCheck,
  CreditCard,
  Building2,
  Upload,
  User,
  Settings,
  ChevronRight,
  MapPin,
  Sparkles,
  RefreshCw,
  Phone,
  ArrowRight,
  PackageCheck,
  Navigation,
  X,
  Filter
} from 'lucide-react';

const ABUJA_DISTRICTS = [
  { name: 'Maitama (Local Market Zone)', distance: '1.8 km', fare: 1200, time: '12-18 mins' },
  { name: 'Wuse 2 / Utako / Jabi', distance: '5.2 km', fare: 1800, time: '20-30 mins' },
  { name: 'Asokoro / Central Business District', distance: '6.5 km', fare: 2000, time: '20-30 mins' },
  { name: 'Life Camp / Kado', distance: '9.1 km', fare: 2500, time: '25-35 mins' },
  { name: 'Gwarinpa / Katampe / Mabushi', distance: '11.4 km', fare: 2800, time: '30-45 mins' },
  { name: 'Lokogoma / Apo / Prince & Princess', distance: '14.8 km', fare: 3500, time: '35-50 mins' },
  { name: 'Lugbe / Airport Road', distance: '22.0 km', fare: 4200, time: '40-55 mins' },
  { name: 'Kubwa / Bwari Axis', distance: '26.5 km', fare: 5000, time: '50-65 mins' }
];

const INITIAL_PRODUCTS = [
  {
    id: 'prod-1',
    name: 'Fresh Strawberries (500g)',
    category: 'Exotic Fruits',
    price: 8500,
    stock: 18,
    badge: 'Exotic',
    image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=600&q=80',
    description: 'Sweet, vibrant red fresh strawberries handpicked daily at Maitama Market.'
  },
  {
    id: 'prod-2',
    name: 'Imported Dragon Fruit (1kg)',
    category: 'Exotic Fruits',
    price: 14000,
    stock: 8,
    badge: 'Exotic',
    image: 'https://images.unsplash.com/photo-1527325678964-549216468488?auto=format&fit=crop&w=600&q=80',
    description: 'Premium magenta pitahaya rich in antioxidants and naturally hydrating.'
  },
  {
    id: 'prod-3',
    name: 'Hass Avocados (Pack of 3)',
    category: 'Fresh Vegetables',
    price: 3500,
    stock: 25,
    badge: 'Fresh Today',
    image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=600&q=80',
    description: 'Creamy, perfectly ripened high-grade avocado pears.'
  },
  {
    id: 'prod-4',
    name: 'Fresh Asparagus Bunch (250g)',
    category: 'Fresh Vegetables',
    price: 6000,
    stock: 12,
    badge: 'Organic',
    image: 'https://images.unsplash.com/photo-1515471209610-dae1c92d877f?auto=format&fit=crop&w=600&q=80',
    description: 'Crisp green organic asparagus stems, ideal for roasting or stir-fries.'
  },
  {
    id: 'prod-5',
    name: 'Sweet Cherry Tomatoes (500g)',
    category: 'Fresh Vegetables',
    price: 3000,
    stock: 30,
    badge: 'Fresh Today',
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80',
    description: 'Juicy, farm-fresh cherry tomatoes harvested for salads and pasta.'
  },
  {
    id: 'prod-6',
    name: 'Organic Basil & Parsley Mix',
    category: 'Herbs & Spices',
    price: 1800,
    stock: 40,
    badge: 'Organic',
    image: 'https://images.unsplash.com/photo-1608683267980-21a48c6a63aa?auto=format&fit=crop&w=600&q=80',
    description: 'Fragrant garden-fresh sweet basil and flat leaf Italian parsley.'
  },
  {
    id: 'prod-7',
    name: 'Live Jumbo Snails (Pack of 6)',
    category: 'Poultry & Seafood',
    price: 12500,
    stock: 10,
    badge: 'Fresh Today',
    image: 'https://images.unsplash.com/photo-1534483509719-3feaee7c30da?auto=format&fit=crop&w=600&q=80',
    description: 'Cleaned, giant African land snails processed directly from organic farms.'
  },
  {
    id: 'prod-8',
    name: 'Cold-Pressed Coconut Oil (500ml)',
    category: 'Dairy & Pantry',
    price: 4500,
    stock: 20,
    badge: 'Organic',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80',
    description: '100% pure virgin coconut oil pressed at room temperature.'
  },
  {
    id: 'prod-9',
    name: 'Fresh Blueberry Clamshell (250g)',
    category: 'Exotic Fruits',
    price: 7200,
    stock: 14,
    badge: 'Exotic',
    image: 'https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=600&q=80',
    description: 'Plump and sweet plump blueberries imported directly for Maitama market.'
  },
  {
    id: 'prod-10',
    name: 'Fresh Bell Peppers Mix (1kg)',
    category: 'Fresh Vegetables',
    price: 3200,
    stock: 22,
    badge: 'Fresh Today',
    image: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?auto=format&fit=crop&w=600&q=80',
    description: 'Vibrant mix of red, yellow, and green bell peppers crisp and flavorful.'
  }
];

export default function App() {
  const [viewMode, setViewMode] = useState('buyer'); // 'buyer' or 'admin'
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('maitama_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });
  
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('maitama_orders');
    return saved ? JSON.parse(saved) : [];
  });

  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedBadge, setSelectedBadge] = useState('All');
  
  // Checkout & Modal States
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('transfer'); // 'transfer' or 'card'
  const [trackingOrder, setTrackingOrder] = useState(null);

  // Form Fields
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    address: '',
    districtIndex: 0,
    paymentProof: null
  });

  const [cardInfo, setCardInfo] = useState({
    number: '4242 •••• •••• 4242',
    expiry: '12/28',
    cvv: '888'
  });

  // Admin New/Edit Product Form
  const [productForm, setProductForm] = useState({
    id: null,
    name: '',
    category: 'Exotic Fruits',
    price: '',
    stock: '',
    badge: 'Fresh Today',
    image: '',
    description: ''
  });
  const [isEditingProduct, setIsEditingProduct] = useState(false);

  useEffect(() => {
    localStorage.setItem('maitama_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('maitama_orders', JSON.stringify(orders));
  }, [orders]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const updateCartQty = (id, delta) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const cartSubtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const selectedDistrict = ABUJA_DISTRICTS[customerInfo.districtIndex];
  const deliveryFare = cart.length > 0 ? selectedDistrict.fare : 0;
  const grandTotal = cartSubtotal + deliveryFare;

  const handleCompleteOrder = (e) => {
    e.preventDefault();
    if (cart.length === 0) return;

    const newOrder = {
      id: 'MTM-' + Math.floor(100000 + Math.random() * 900000),
      createdAt: new Date().toLocaleString('en-NG', { timeZone: 'Africa/Lagos' }),
      items: [...cart],
      subtotal: cartSubtotal,
      deliveryFare: deliveryFare,
      total: grandTotal,
      district: selectedDistrict.name,
      estimatedDeliveryTime: selectedDistrict.time,
      customer: {
        name: customerInfo.name,
        phone: customerInfo.phone,
        address: customerInfo.address
      },
      paymentMethod: activeTab === 'transfer' ? 'Bank Transfer' : 'Debit Card',
      status: 'Order Confirmed', // Stages: 'Order Confirmed', 'Packing at Market', 'Bolt Rider Assigned', 'En Route', 'Delivered'
      boltRider: {
        name: 'Chidi N. (Bolt Courier)',
        phone: '+234 803 555 0192',
        plate: 'ABJ-482-XA (Bajaj City Box)'
      }
    };

    setOrders([newOrder, ...orders]);
    setCart([]);
    setIsCheckoutOpen(false);
    setIsCartOpen(false);
    setTrackingOrder(newOrder);
  };

  const handleSaveProduct = (e) => {
    e.preventDefault();
    if (!productForm.name || !productForm.price) return;

    const newProd = {
      id: productForm.id || 'prod-' + Date.now(),
      name: productForm.name,
      category: productForm.category,
      price: parseFloat(productForm.price),
      stock: parseInt(productForm.stock) || 10,
      badge: productForm.badge,
      image: productForm.image || 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=600&q=80',
      description: productForm.description || 'Fresh item sourced directly from Maitama Farmers Market.'
    };

    if (isEditingProduct) {
      setProducts(products.map((p) => (p.id === newProd.id ? newProd : p)));
    } else {
      setProducts([newProd, ...products]);
    }

    setProductForm({
      id: null,
      name: '',
      category: 'Exotic Fruits',
      price: '',
      stock: '',
      badge: 'Fresh Today',
      image: '',
      description: ''
    });
    setIsEditingProduct(false);
  };

  const editProduct = (product) => {
    setProductForm(product);
    setIsEditingProduct(true);
  };

  const deleteProduct = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(
      orders.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
    if (trackingOrder && trackingOrder.id === orderId) {
      setTrackingOrder({ ...trackingOrder, status: newStatus });
    }
  };

  const categories = ['All', 'Exotic Fruits', 'Fresh Vegetables', 'Herbs & Spices', 'Poultry & Seafood', 'Dairy & Pantry'];
  const badges = ['All', 'Exotic', 'Fresh Today', 'Organic'];

  const filteredProducts = products.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesBadge = selectedBadge === 'All' || item.badge === selectedBadge;
    return matchesSearch && matchesCategory && matchesBadge;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-12">
      {}
      <header className="sticky top-0 z-30 bg-emerald-900 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="bg-emerald-500 p-2.5 rounded-2xl text-emerald-950 font-bold shadow-lg">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-black tracking-tight leading-none text-emerald-50">
                  MAITAMA <span className="text-emerald-400 font-light">MARKET</span>
                </h1>
                <p className="text-xs text-emerald-300 font-medium tracking-wide">
                  DIRECT &amp; BOLT DISPATCH • ABUJA
                </p>
              </div>
            </div>

            {/* Mode Switcher & Cart */}
            <div className="flex items-center gap-3">
              {/* Role Toggle Button */}
              <div className="bg-emerald-950/60 p-1 rounded-xl border border-emerald-700/50 flex items-center gap-1">
                <button
                  onClick={() => setViewMode('buyer')}
                  className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                    viewMode === 'buyer'
                      ? 'bg-emerald-500 text-emerald-950 shadow-md'
                      : 'text-emerald-200 hover:text-white'
                  }`}
                >
                  Marketplace
                </button>
                <button
                  onClick={() => setViewMode('admin')}
                  className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                    viewMode === 'admin'
                      ? 'bg-emerald-500 text-emerald-950 shadow-md'
                      : 'text-emerald-200 hover:text-white'
                  }`}
                >
                  Vendor Admin
                </button>
              </div>

              {/* Shopping Cart Button */}
              {viewMode === 'buyer' && (
                <button
                  onClick={() => setIsCartOpen(true)}
                  className="relative bg-emerald-600 hover:bg-emerald-500 text-white p-2.5 rounded-xl transition-all shadow-md flex items-center gap-2"
                >
                  <ShoppingBag className="w-5 h-5" />
                  <span className="hidden sm:inline font-semibold text-sm">Cart</span>
                  {cart.length > 0 && (
                    <span className="bg-amber-400 text-amber-950 text-xs font-extrabold px-2 py-0.5 rounded-full">
                      {cart.reduce((a, c) => a + c.quantity, 0)}
                    </span>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {}
      <div className="bg-gradient-to-r from-emerald-900 via-emerald-850 to-teal-900 text-white py-8 px-4 sm:px-6 mb-6 shadow-inner">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-emerald-800/80 px-3 py-1 rounded-full text-xs text-emerald-200 font-medium mb-2 border border-emerald-700">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              Yedseram Crescent / IBB Way, Maitama, Abuja
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              {viewMode === 'buyer' ? 'Farm-Fresh Produce Delivered across Abuja' : 'Vendor Inventory & Dispatch Control'}
            </h2>
            <p className="text-emerald-200 text-sm max-w-2xl mt-1">
              {viewMode === 'buyer'
                ? 'Order organic greens, exotic berries, and premium meats directly from Maitama Farmers Market with automated Bolt delivery estimation.'
                : 'Upload produce, manage prices in Naira, set stock counts, and manage incoming orders in real-time.'}
            </p>
          </div>
          {viewMode === 'buyer' && (
            <div className="bg-emerald-950/70 backdrop-blur border border-emerald-700/50 p-3 rounded-2xl text-xs text-emerald-200 flex items-center gap-3">
              <Truck className="w-8 h-8 text-amber-400 shrink-0" />
              <div>
                <p className="font-bold text-white text-sm">Bolt Dispatch Integrated</p>
                <p>Calculated live per Abuja District</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {viewMode === 'buyer' ? (
          <div className="space-y-6">
            {/* Search and Filters */}
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                {/* Search Box */}
                <div className="relative flex-1">
                  <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search fresh strawberries, snails, dragon fruit..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
                    >
                      Clear
                    </button>
                  )}
                </div>

                {/* Badge Filter */}
                <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1 shrink-0">
                    <Filter className="w-3.5 h-3.5" /> Tag:
                  </span>
                  {badges.map((badge) => (
                    <button
                      key={badge}
                      onClick={() => setSelectedBadge(badge)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                        selectedBadge === badge
                          ? 'bg-slate-900 text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {badge}
                    </button>
                  ))}
                </div>
              </div>

              {/* Category Pills */}
              <div className="flex items-center gap-2 overflow-x-auto pt-2 border-t border-slate-100">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                      selectedCategory === cat
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  <div>
                    {/* Image & Badge */}
                    <div className="relative h-48 bg-slate-100 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=600&q=80';
                        }}
                      />
                      <span
                        className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-bold shadow-sm ${
                          item.badge === 'Exotic'
                            ? 'bg-purple-600 text-white'
                            : item.badge === 'Organic'
                            ? 'bg-teal-600 text-white'
                            : 'bg-emerald-600 text-white'
                        }`}
                      >
                        {item.badge}
                      </span>
                      <span className="absolute bottom-3 right-3 bg-black/60 backdrop-blur text-white text-xs px-2 py-0.5 rounded-md">
                        In Stock: {item.stock}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="p-4 space-y-2">
                      <span className="text-xs font-medium text-emerald-600 uppercase tracking-wider">
                        {item.category}
                      </span>
                      <h3 className="font-bold text-slate-800 text-base leading-snug">
                        {item.name}
                      </h3>
                      <p className="text-xs text-slate-500 line-clamp-2">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Price & Add to Cart */}
                  <div className="p-4 pt-0 flex items-center justify-between border-t border-slate-100 mt-3">
                    <div>
                      <span className="text-xs text-slate-400 block">Price</span>
                      <span className="font-black text-emerald-700 text-lg">
                        ₦{item.price.toLocaleString()}
                      </span>
                    </div>
                    <button
                      onClick={() => addToCart(item)}
                      className="bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white p-2.5 rounded-xl font-medium text-xs flex items-center gap-1.5 transition-all shadow-sm"
                    >
                      <Plus className="w-4 h-4" /> Add
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
                <Search className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-slate-700">No items found</h3>
                <p className="text-slate-500 text-sm">Try adjusting your category or search query.</p>
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Inventory Management Form */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm h-fit">
              <h2 className="text-lg font-extrabold text-slate-800 mb-4 flex items-center gap-2">
                <Settings className="w-5 h-5 text-emerald-600" />
                {isEditingProduct ? 'Edit Market Product' : 'Add Produce to Market'}
              </h2>

              <form onSubmit={handleSaveProduct} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Product Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Fresh Strawberries (500g)"
                    value={productForm.name}
                    onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                    <select
                      value={productForm.category}
                      onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                    >
                      <option>Exotic Fruits</option>
                      <option>Fresh Vegetables</option>
                      <option>Herbs &amp; Spices</option>
                      <option>Poultry &amp; Seafood</option>
                      <option>Dairy &amp; Pantry</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Badge Tag</label>
                    <select
                      value={productForm.badge}
                      onChange={(e) => setProductForm({ ...productForm, badge: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                    >
                      <option>Fresh Today</option>
                      <option>Exotic</option>
                      <option>Organic</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Price (₦ NGN)</label>
                    <input
                      type="number"
                      required
                      placeholder="8500"
                      value={productForm.price}
                      onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Stock Count</label>
                    <input
                      type="number"
                      placeholder="15"
                      value={productForm.stock}
                      onChange={(e) => setProductForm({ ...productForm, stock: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Image URL</label>
                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/..."
                    value={productForm.image}
                    onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Description</label>
                  <textarea
                    rows={2}
                    placeholder="Short description of origin or fresh quality..."
                    value={productForm.description}
                    onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <button
                    type="submit"
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-xl text-sm transition-all shadow"
                  >
                    {isEditingProduct ? 'Update Product' : 'Save & Publish Item'}
                  </button>
                  {isEditingProduct && (
                    <button
                      type="button"
                      onClick={() => {
                        setIsEditingProduct(false);
                        setProductForm({
                          id: null,
                          name: '',
                          category: 'Exotic Fruits',
                          price: '',
                          stock: '',
                          badge: 'Fresh Today',
                          image: '',
                          description: ''
                        });
                      }}
                      className="bg-slate-200 text-slate-700 px-3 py-2.5 rounded-xl text-sm font-semibold"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Inventory List & Incoming Dispatch Queue */}
            <div className="lg:col-span-2 space-y-6">
              {/* Market Stock Inventory List */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="text-base font-extrabold text-slate-800 mb-4 flex items-center justify-between">
                  <span>Current Maitama Market Inventory ({products.length})</span>
                </h3>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-sm">
                    <thead>
                      <tr className="border-b border-slate-200 text-xs text-slate-400 uppercase">
                        <th className="py-2 font-semibold">Item</th>
                        <th className="py-2 font-semibold">Category</th>
                        <th className="py-2 font-semibold">Price</th>
                        <th className="py-2 font-semibold">Stock</th>
                        <th className="py-2 font-semibold text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {products.map((item) => (
                        <tr key={item.id} className="hover:bg-slate-50">
                          <td className="py-3 pr-2 flex items-center gap-2">
                            <img
                              src={item.image}
                              alt=""
                              className="w-8 h-8 rounded-lg object-cover shrink-0"
                            />
                            <span className="font-bold text-slate-800 line-clamp-1">{item.name}</span>
                          </td>
                          <td className="py-3 text-slate-600 text-xs">{item.category}</td>
                          <td className="py-3 font-bold text-emerald-700">₦{item.price.toLocaleString()}</td>
                          <td className="py-3 text-slate-600 text-xs">{item.stock}</td>
                          <td className="py-3 text-right">
                            <div className="flex items-center justify-end gap-1">
                              <button
                                onClick={() => editProduct(item)}
                                className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-600"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => deleteProduct(item.id)}
                                className="p-1.5 hover:bg-rose-50 rounded-lg text-rose-600"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Incoming Orders & Dispatch Status Admin */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="text-base font-extrabold text-slate-800 mb-4 flex items-center gap-2">
                  <Truck className="w-5 h-5 text-amber-500" />
                  Incoming Orders &amp; Bolt Dispatch Queue ({orders.length})
                </h3>

                {orders.length === 0 ? (
                  <p className="text-xs text-slate-400 py-4 text-center">No customer orders placed yet.</p>
                ) : (
                  <div className="space-y-4">
                    {orders.map((ord) => (
                      <div
                        key={ord.id}
                        className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-2">
                          <div>
                            <span className="font-extrabold text-slate-800 text-sm">Order #{ord.id}</span>
                            <span className="text-xs text-slate-400 block">{ord.createdAt}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full">
                              ₦{ord.total.toLocaleString()}
                            </span>
                            <select
                              value={ord.status}
                              onChange={(e) => updateOrderStatus(ord.id, e.target.value)}
                              className="text-xs bg-white border border-slate-300 rounded-lg p-1 font-semibold text-slate-700"
                            >
                              <option>Order Confirmed</option>
                              <option>Packing at Market</option>
                              <option>Bolt Rider Assigned</option>
                              <option>En Route</option>
                              <option>Delivered</option>
                            </select>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
                          <div>
                            <p className="font-bold text-slate-700">Customer Details:</p>
                            <p>{ord.customer.name} ({ord.customer.phone})</p>
                            <p>{ord.customer.address}, {ord.district}</p>
                          </div>
                          <div>
                            <p className="font-bold text-slate-700">Items Ordered:</p>
                            <p className="line-clamp-2">
                              {ord.items.map((i) => `${i.quantity}x ${i.name}`).join(', ')}
                            </p>
                            <p className="text-amber-700 font-semibold mt-1">
                              Bolt Dispatch Fare: ₦{ord.deliveryFare.toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      {}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-sm flex justify-end">
          <div className="bg-white w-full max-w-md h-full flex flex-col shadow-2xl">
            {/* Header */}
            <div className="p-4 bg-emerald-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-emerald-400" />
                <h2 className="font-bold text-base">Your Market Produce Cart</h2>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-1 hover:bg-emerald-800 rounded-lg text-emerald-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {cart.length === 0 ? (
                <div className="text-center py-12 text-slate-400 space-y-2">
                  <ShoppingBag className="w-12 h-12 mx-auto stroke-1" />
                  <p className="text-sm font-semibold">Your cart is empty</p>
                  <p className="text-xs">Browse fresh produce to get started!</p>
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 bg-slate-50/50"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-14 h-14 object-cover rounded-lg shrink-0"
                    />
                    <div className="flex-1">
                      <h4 className="font-bold text-xs text-slate-800 line-clamp-1">{item.name}</h4>
                      <p className="text-xs font-extrabold text-emerald-700">
                        ₦{(item.price * item.quantity).toLocaleString()}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <button
                          onClick={() => updateCartQty(item.id, -1)}
                          className="w-5 h-5 bg-white border border-slate-300 rounded text-xs font-bold text-slate-600"
                        >
                          -
                        </button>
                        <span className="text-xs font-bold">{item.quantity}</span>
                        <button
                          onClick={() => updateCartQty(item.id, 1)}
                          className="w-5 h-5 bg-white border border-slate-300 rounded text-xs font-bold text-slate-600"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer / Summary */}
            {cart.length > 0 && (
              <div className="p-4 border-t border-slate-200 bg-slate-50 space-y-3">
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between text-slate-600">
                    <span>Produce Subtotal</span>
                    <span className="font-bold text-slate-800">₦{cartSubtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Est. Bolt Fare ({selectedDistrict.name})</span>
                    <span className="font-bold text-slate-800">₦{deliveryFare.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm font-black text-emerald-900 pt-2 border-t border-slate-200">
                    <span>Total Estimated</span>
                    <span>₦{grandTotal.toLocaleString()}</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    setIsCheckoutOpen(true);
                  }}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl text-sm flex items-center justify-center gap-2 transition-all shadow-md"
                >
                  Proceed to Checkout <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm p-4 flex items-center justify-center">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden my-8">
            <div className="bg-emerald-900 text-white p-4 sm:p-6 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-black">Checkout &amp; Delivery Dispatch</h2>
                <p className="text-xs text-emerald-300">Maitama Farmers Market Direct Order</p>
              </div>
              <button
                onClick={() => setIsCheckoutOpen(false)}
                className="p-1 hover:bg-emerald-800 rounded-lg text-emerald-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCompleteOrder} className="p-4 sm:p-6 space-y-6">
              {/* Delivery District & Address */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Navigation className="w-4 h-4 text-emerald-600" />
                  Step 1: Abuja Delivery Zone (Bolt Rate Engine)
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Select Abuja District</label>
                    <select
                      value={customerInfo.districtIndex}
                      onChange={(e) =>
                        setCustomerInfo({ ...customerInfo, districtIndex: parseInt(e.target.value) })
                      }
                      className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none"
                    >
                      {ABUJA_DISTRICTS.map((d, index) => (
                        <option key={d.name} value={index}>
                          {d.name} (+₦{d.fare.toLocaleString()})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Full Street Address</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. House 12, Close 4, Off Road 11"
                      value={customerInfo.address}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                  </div>
                </div>

                {/* Live Bolt Estimation Card */}
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <Truck className="w-5 h-5 text-amber-600 shrink-0" />
                    <div>
                      <p className="font-bold text-amber-900">
                        Bolt Delivery Fare: ₦{selectedDistrict.fare.toLocaleString()}
                      </p>
                      <p className="text-amber-700 text-[11px]">
                        Est. Distance: {selectedDistrict.distance} • Time: {selectedDistrict.time}
                      </p>
                    </div>
                  </div>
                  <span className="bg-amber-200 text-amber-950 px-2 py-0.5 rounded font-extrabold text-[10px]">
                    Auto-Calculated
                  </span>
                </div>
              </div>

              {/* Customer Contact Details */}
              <div className="space-y-4 pt-2 border-t border-slate-100">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <User className="w-4 h-4 text-emerald-600" />
                  Step 2: Recipient Details
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Zainab Ibrahim"
                      value={customerInfo.name}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 08012345678"
                      value={customerInfo.phone}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                  </div>
                </div>
              </div>

              {}
              <div className="space-y-4 pt-2 border-t border-slate-100">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <CreditCard className="w-4 h-4 text-emerald-600" />
                  Step 3: Select Payment Option
                </h3>

                <div className="flex gap-2 border-b border-slate-200 pb-2">
                  <button
                    type="button"
                    onClick={() => setActiveTab('transfer')}
                    className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                      activeTab === 'transfer'
                        ? 'bg-emerald-600 text-white shadow'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    <Building2 className="w-4 h-4" /> Bank Transfer
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('card')}
                    className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                      activeTab === 'card'
                        ? 'bg-emerald-600 text-white shadow'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    <CreditCard className="w-4 h-4" /> Debit Card
                  </button>
                </div>

                {activeTab === 'transfer' ? (
                  <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-3">
                    <p className="text-xs text-slate-600">
                      Transfer exact total amount to the Maitama Market designated merchant account:
                    </p>
                    <div className="bg-white p-3 rounded-lg border border-slate-200 space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">Bank Name:</span>
                        <span className="font-bold text-slate-800">Zenith Bank / Sterling</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">Account Name:</span>
                        <span className="font-bold text-slate-800">Maitama Market Direct Ltd</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">Account Number:</span>
                        <span className="font-extrabold text-emerald-700 tracking-wider">0123456789</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">Card Number</label>
                      <input
                        type="text"
                        value={cardInfo.number}
                        onChange={(e) => setCardInfo({ ...cardInfo, number: e.target.value })}
                        className="w-full p-2 bg-white rounded-lg border border-slate-200 text-xs font-mono"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 mb-1">Expiry</label>
                        <input
                          type="text"
                          value={cardInfo.expiry}
                          onChange={(e) => setCardInfo({ ...cardInfo, expiry: e.target.value })}
                          className="w-full p-2 bg-white rounded-lg border border-slate-200 text-xs font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 mb-1">CVV</label>
                        <input
                          type="password"
                          value={cardInfo.cvv}
                          onChange={(e) => setCardInfo({ ...cardInfo, cvv: e.target.value })}
                          className="w-full p-2 bg-white rounded-lg border border-slate-200 text-xs font-mono"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Order Total Breakdown & Confirm */}
              <div className="bg-emerald-50 p-4 rounded-xl space-y-2">
                <div className="flex justify-between text-xs text-emerald-900">
                  <span>Produce Subtotal</span>
                  <span>₦{cartSubtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-xs text-emerald-900">
                  <span>Bolt Delivery Fare</span>
                  <span>₦{deliveryFare.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm font-black text-emerald-950 pt-2 border-t border-emerald-200">
                  <span>Total Payable</span>
                  <span>₦{grandTotal.toLocaleString()}</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-xl text-sm transition-all shadow-lg flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-5 h-5" />
                Confirm Payment &amp; Order Bolt Rider
              </button>
            </form>
          </div>
        </div>
      )}

      {}
      {trackingOrder && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm p-4 flex items-center justify-center">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden p-6 space-y-6">
            <div className="flex items-start justify-between">
              <div>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full">
                  Order Verified
                </span>
                <h2 className="text-xl font-black text-slate-800 mt-1">Receipt &amp; Bolt Dispatch Tracker</h2>
                <p className="text-xs text-slate-400">Order ID: #{trackingOrder.id}</p>
              </div>
              <button
                onClick={() => setTrackingOrder(null)}
                className="p-1 hover:bg-slate-100 rounded-lg text-slate-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Delivery Timeline Progress */}
            <div className="space-y-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Live Courier Status
              </h3>

              <div className="space-y-3 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                {[
                  { step: 'Order Confirmed', label: 'Payment Confirmed & Received' },
                  { step: 'Packing at Market', label: 'Vendor Packing Fresh Produce in Maitama' },
                  { step: 'Bolt Rider Assigned', label: `Assigned: ${trackingOrder.boltRider.name}` },
                  { step: 'En Route', label: `En Route to ${trackingOrder.district}` },
                  { step: 'Delivered', label: 'Produce Handed Over Successfully' }
                ].map((st, idx) => {
                  const stages = ['Order Confirmed', 'Packing at Market', 'Bolt Rider Assigned', 'En Route', 'Delivered'];
                  const currentIdx = stages.indexOf(trackingOrder.status);
                  const isDone = currentIdx >= idx;

                  return (
                    <div key={st.step} className="flex items-center gap-3 relative z-10">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                          isDone
                            ? 'bg-emerald-600 text-white shadow-sm'
                            : 'bg-slate-200 text-slate-400'
                        }`}
                      >
                        {isDone ? '✓' : idx + 1}
                      </div>
                      <div className="text-xs">
                        <p className={`font-bold ${isDone ? 'text-slate-800' : 'text-slate-400'}`}>
                          {st.step}
                        </p>
                        <p className="text-[11px] text-slate-500">{st.label}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Courier Card */}
            <div className="bg-amber-50 border border-amber-200 p-3 rounded-xl flex items-center gap-3">
              <div className="bg-amber-500 text-white p-2.5 rounded-xl font-bold">
                <Truck className="w-5 h-5" />
              </div>
              <div className="text-xs flex-1">
                <p className="font-bold text-amber-950">{trackingOrder.boltRider.name}</p>
                <p className="text-amber-800">{trackingOrder.boltRider.plate}</p>
                <p className="text-amber-700 font-medium">{trackingOrder.boltRider.phone}</p>
              </div>
            </div>

            {/* Order Summary */}
            <div className="text-xs space-y-1.5 border-t border-slate-100 pt-3">
              <div className="flex justify-between">
                <span className="text-slate-500">Destination:</span>
                <span className="font-bold text-slate-800">{trackingOrder.customer.address}, {trackingOrder.district}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Total Paid:</span>
                <span className="font-extrabold text-emerald-700">₦{trackingOrder.total.toLocaleString()}</span>
              </div>
            </div>

            <button
              onClick={() => setTrackingOrder(null)}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-xl text-xs transition-all"
            >
              Close &amp; Return to Marketplace
            </button>
          </div>
        </div>
      )}
    </div>
  );
}