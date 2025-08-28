import React from 'react';
import { motion } from 'framer-motion';
import type { Product } from '../types';
import { generateAffiliateLink } from '../utils/amazon';
import { useLocation } from '../contexts/LocationContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { countryCode } = useLocation();
  const affiliateLink = generateAffiliateLink(product.asin, countryCode);

  return (
    <motion.div
      className="bg-slate-800/50 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg shadow-rose-500/10 border border-slate-700 flex flex-col"
      whileHover={{ scale: 1.05, y: -10 }}
      transition={{ type: "spring", stiffness: 300 }}
      layout
    >
      <img src={product.imageUrl} alt={product.name} className="w-full h-56 object-cover" />
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold mb-2 text-rose-200">{product.name}</h3>
        <p className="text-slate-400 mb-4 h-20 flex-grow">{product.description}</p>
        <a
          href={affiliateLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block w-full text-center bg-rose-500 hover:bg-rose-600 text-white font-bold py-2 px-4 rounded-lg transition-all transform hover:scale-105 mt-auto"
        >
          Buy on Amazon
        </a>
      </div>
    </motion.div>
  );
};

export default ProductCard;
