
import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer id="about" className="bg-slate-900/70 border-t border-slate-800 py-12 px-4">
            <div className="container mx-auto text-center text-slate-400">
                <p className="text-lg font-bold text-rose-300 mb-2">Midnight Bloom</p>
                <p className="max-w-2xl mx-auto mb-4">
                    We curate the finest romantic and adult novelties to enhance your intimate moments. Explore our collections and discover new ways to connect.
                </p>
                <p className="text-xs italic mb-6">
                    As an Amazon Associate, we earn from qualifying purchases. All links are affiliate links, which means we may receive a small commission at no extra cost to you.
                </p>
                <p className="text-sm">&copy; {new Date().getFullYear()} Midnight Bloom. All Rights Reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
