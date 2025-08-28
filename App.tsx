import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import ProductCard from './components/ProductCard';
import IdeaGenerator from './components/IdeaGenerator';
import Footer from './components/Footer';
import SearchBar from './components/SearchBar';
import Pagination from './components/Pagination';
import { PRODUCTS, CATEGORIES } from './constants';
import type { Product } from './types';

const PRODUCTS_PER_PAGE = 8;

const AnimatedStar: React.FC<{ initialX: number; initialY: number; delay: number }> = ({ initialX, initialY, delay }) => {
  const [position, setPosition] = useState({ x: initialX, y: initialY });

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition({
        x: initialX + (Math.random() - 0.5) * 10,
        y: initialY + (Math.random() - 0.5) * 10,
      });
    }, 2000 + Math.random() * 2000);
    return () => clearInterval(interval);
  }, [initialX, initialY]);

  return (
    <motion.div
      className="absolute w-1 h-1 bg-rose-200 rounded-full"
      style={{
        top: `${position.y}%`,
        left: `${position.x}%`,
        opacity: Math.random() * 0.5 + 0.2,
      }}
      animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 3, repeat: Infinity, delay }}
    />
  );
};


const App: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const filteredProducts = useMemo(() => {
        let products = PRODUCTS;

        if (selectedCategory !== "All") {
            products = products.filter(p => p.category === selectedCategory);
        }

        if (searchQuery) {
            products = products.filter(p =>
                p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.description.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }
        return products;
    }, [selectedCategory, searchQuery]);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedCategory, searchQuery]);

    const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
    const paginatedProducts = filteredProducts.slice(
        (currentPage - 1) * PRODUCTS_PER_PAGE,
        currentPage * PRODUCTS_PER_PAGE
    );
    
    const stars = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5
    }));

    return (
        <div className="bg-slate-900 text-white font-sans">
            <Header />

            <main>
                {/* Hero Section */}
                <section className="relative h-screen flex items-center justify-center text-center overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-rose-900/30 to-slate-900 z-10 opacity-70"></div>
                     <div className="absolute inset-0 z-0">
                        {stars.map(star => <AnimatedStar key={star.id} initialX={star.x} initialY={star.y} delay={star.delay} />)}
                    </div>
                    <motion.div
                        className="relative z-20 px-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-rose-200 to-rose-400">
                            Ignite Your Passion
                        </h1>
                        <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-300">
                            Discover a curated collection of intimate treasures designed to elevate your moments of connection.
                        </p>
                    </motion.div>
                </section>

                {/* Products Section */}
                <section id="products" className="py-20 px-4 bg-slate-900">
                    <div className="container mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7 }}
                            className="text-center mb-12"
                        >
                            <h2 className="text-4xl font-extrabold mb-4">
                                Curated Selections
                            </h2>
                             <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
                        </motion.div>

                        {/* Category Filters */}
                        <motion.div
                            className="flex justify-center flex-wrap gap-4 mb-12"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            {CATEGORIES.map(category => (
                                <button
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    className={`px-6 py-2 font-semibold rounded-full transition-all duration-300 ${
                                        selectedCategory === category
                                            ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/30'
                                            : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                                    }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </motion.div>

                        {/* Product Grid */}
                        <motion.div
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
                            layout
                        >
                           <AnimatePresence>
                            {paginatedProducts.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                           </AnimatePresence>
                        </motion.div>
                        
                        {paginatedProducts.length === 0 && (
                            <p className="text-center text-slate-400 mt-12 text-lg">No products found. Try adjusting your search or filters!</p>
                        )}

                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                        />

                    </div>
                </section>

                <IdeaGenerator availableProducts={filteredProducts} />

            </main>
            
            <Footer />
        </div>
    );
};

export default App;
