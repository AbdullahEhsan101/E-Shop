import { ShoppingBag } from 'lucide-react';

export const Logo = ({ className }: { className?: string }) => {
    return (
        <div className={`flex items-center gap-2 font-bold text-2xl ${className}`}>
            <div className="bg-primary text-primary-foreground p-2 rounded-xl">
                <ShoppingBag className="w-6 h-6" />
            </div>
            <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                E-Shop
            </span>
        </div>
    );
};
