import React from 'react';
import { Heart } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db } from '../../firebase/config';

interface WishlistButtonProps {
  productId: string;
  isInWishlist: boolean;
}

const WishlistButton: React.FC<WishlistButtonProps> = ({
  productId,
  isInWishlist
}) => {
  const { currentUser, userProfile } = useAuth();
  
  const toggleWishlist = async () => {
    if (!currentUser) return;
    
    try {
      const userRef = doc(db, 'users', currentUser.uid);
      await updateDoc(userRef, {
        wishlist: isInWishlist 
          ? arrayRemove(productId)
          : arrayUnion(productId)
      });
    } catch (error) {
      console.error('Error updating wishlist:', error);
    }
  };

  if (!currentUser || !userProfile || userProfile.role.type === 'admin') return null;

  return (
    <button
      onClick={toggleWishlist}
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