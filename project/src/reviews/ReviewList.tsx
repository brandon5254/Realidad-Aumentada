import React from 'react';
import { Star } from 'lucide-react';
import { Review } from '../../types/order';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface ReviewListProps {
  reviews: Review[];
}

const ReviewList: React.FC<ReviewListProps> = ({ reviews }) => {
  return (
    <div className="space-y-6">
      {reviews.map((review) => (
        <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0">
          <div className="flex items-center mb-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, index) => (
                <Star
                  key={index}
                  className={`w-4 h-4 ${
                    index < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="ml-2 text-sm text-gray-500">
              {format(new Date(review.createdAt), "d 'de' MMMM, yyyy", { locale: es })}
            </span>
          </div>
          
          <p className="font-medium mb-1">{review.userName}</p>
          <p className="text-gray-600">{review.comment}</p>
        </div>
      ))}
      
      {reviews.length === 0 && (
        <p className="text-gray-500 text-center py-4">
          No hay reseñas todavía. ¡Sé el primero en opinar!
        </p>
      )}
    </div>
  );
};

export default ReviewList;