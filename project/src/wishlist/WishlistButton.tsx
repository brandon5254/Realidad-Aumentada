import React from 'react';
import { Heart } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface WishlistButtonProps {
  productId: string;
  isInWishlist: boolean;
  onToggleWishlist: () => Promise<void>;
}

const WishlistButton: React.FC<WishlistButtonProps> = ({
  productId,
  isInWishlist,
  onToggleWishlist
}) => {
  const { currentUser } = useAuth();
  
  if (!currentUser) return null;

  return (
    <button
      onClick={onToggleWishlist}
      className="p-2 hover:bg-gray-100 rounded-full transition-colors"
      aria-label={isInWishlist ? "Eliminar de favoritos" : "Agregar a favoritos"}
    >
      <Heart
        size={24}
        className={isInWishlist ? "fill-current text-red-500" : "text-gray-400"}
      />
    </button>
  );
};

export default WishlistButton;