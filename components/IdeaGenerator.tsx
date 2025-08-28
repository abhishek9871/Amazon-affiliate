import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { generateDateNightIdea } from '../services/geminiService';
import { generateAffiliateLink } from '../utils/amazon';
import type { DateNightIdea, Product } from '../types';
import { useLocation } from '../contexts/LocationContext';

interface IdeaGeneratorProps {
    availableProducts: Product[];
}

const SuggestedProduct: React.FC<{ product: Product }> = ({ product }) => {
    const { countryCode } = useLocation();
    const affiliateLink = generateAffiliateLink(product.asin, countryCode);

    return (
        <a
            href={affiliateLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 bg-rose-500/10 p-3 rounded-lg hover:bg-rose-500/20 transition-all group"
        >
            <img src={product.imageUrl} alt={product.name} className="w-16 h-16 rounded-md object-cover flex-shrink-0" />
            <div>
                <h5 className="font-semibold text-rose-200 group-hover:text-rose-100">{product.name}</h5>
                <p className="text-sm text-slate-400">Click to view on Amazon</p>
            </div>
        </a>
    );
}


const IdeaGenerator: React.FC<IdeaGeneratorProps> = ({ availableProducts }) => {
    const [mood, setMood] = useState('');
    const [idea, setIdea] = useState<DateNightIdea | null>(null);
    const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!mood.trim() || isLoading) return;

        setIsLoading(true);
        setError(null);
        setIdea(null);
        setSuggestedProducts([]);

        // Use the passed-in, potentially filtered list of products
        const result = await generateDateNightIdea(mood, availableProducts);

        if (result && result.suggested_products) {
            setIdea(result);
            const matchingProducts = availableProducts.filter(p => result.suggested_products.includes(p.name));
            setSuggestedProducts(matchingProducts);
        } else {
            setError("Sorry, I couldn't come up with an idea right now. Please try again.");
        }
        setIsLoading(false);
    };

    return (
        <section id="generator" className="py-20 px-4 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-rose-900/20 z-0"></div>
            <div className="container mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-4xl font-extrabold text-center mb-4 text-rose-300">Can't Decide?</h2>
                    <p className="text-lg text-slate-400 text-center mb-8 max-w-2xl mx-auto">Let our AI romance assistant spark your imagination. Tell us your mood, and we'll craft the perfect date night for you, with recommendations from our {availableProducts.length > 0 && availableProducts.length < 10 ? 'current selection' : 'catalog'}.</p>
                
                    <form onSubmit={handleSubmit} className="max-w-xl mx-auto flex flex-col sm:flex-row gap-4 mb-12">
                        <input
                            type="text"
                            value={mood}
                            onChange={(e) => setMood(e.target.value)}
                            placeholder="e.g., Cozy and intimate, wild and adventurous"
                            className="flex-grow bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-rose-500"
                            disabled={isLoading}
                        />
                        <button
                            type="submit"
                            className="bg-rose-500 hover:bg-rose-600 text-white font-bold py-3 px-8 rounded-lg transition-all transform hover:scale-105 disabled:bg-slate-600 disabled:cursor-not-allowed"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mx-auto"></div>
                            ) : "Generate Idea"}
                        </button>
                    </form>

                    {error && <p className="text-center text-red-400">{error}</p>}

                    {idea && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="bg-slate-800/50 backdrop-blur-md rounded-xl p-8 max-w-2xl mx-auto border border-rose-500/30 shadow-2xl shadow-rose-500/20"
                        >
                            <h3 className="text-3xl font-bold mb-4 text-rose-300">{idea.title}</h3>
                            <p className="text-slate-300 mb-6">{idea.description}</p>
                            
                            {suggestedProducts.length > 0 && (
                                <div className="border-t border-slate-700 pt-6">
                                    <h4 className="font-semibold text-rose-200 mb-4 text-lg">Recommended for your date:</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {suggestedProducts.map((product) => (
                                            <SuggestedProduct key={product.id} product={product} />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    )}
                </motion.div>
            </div>
        </section>
    );
};

export default IdeaGenerator;