
import React from 'react';

const Header: React.FC = () => {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 p-4 bg-slate-900/50 backdrop-blur-md">
            <nav className="container mx-auto flex justify-between items-center">
                <a href="#" className="text-2xl font-bold tracking-wider text-rose-300">
                    Midnight Bloom
                </a>
                <ul className="hidden md:flex space-x-8">
                    <li><a href="#products" className="hover:text-rose-300 transition-colors">Products</a></li>
                    <li><a href="#generator" className="hover:text-rose-300 transition-colors">Date Idea Generator</a></li>
                    <li><a href="#about" className="hover:text-rose-300 transition-colors">About</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
