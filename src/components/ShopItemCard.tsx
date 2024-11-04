import React from 'react';
import { Clock, Package } from 'lucide-react';
import { useShop } from '../hooks/useShop';

interface ShopItemCardProps {
  item: {
    id: number;
    name: string;
    description: string;
    type: string;
    price: number;
    duration?: number;
    imageUrl?: string;
    quantity?: number;
  };
}

export default function ShopItemCard({ item }: ShopItemCardProps) {
  const { purchaseItem, useItem } = useShop();

  const handlePurchase = async () => {
    try {
      await purchaseItem.mutateAsync({ itemId: item.id });
    } catch (error) {
      console.error('Purchase error:', error);
    }
  };

  const handleUse = async () => {
    try {
      await useItem.mutateAsync(item.id);
    } catch (error) {
      console.error('Use item error:', error);
    }
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm">
      {item.imageUrl ? (
        <img
          src={item.imageUrl}
          alt={item.name}
          className="w-full aspect-video object-cover"
        />
      ) : (
        <div className="w-full aspect-video bg-gray-100 flex items-center justify-center">
          <Package className="w-12 h-12 text-gray-400" />
        </div>
      )}

      <div className="p-4">
        <h3 className="font-medium">{item.name}</h3>
        <p className="text-sm text-gray-500 mt-1">{item.description}</p>

        {item.duration && (
          <div className="flex items-center text-sm text-gray-500 mt-2">
            <Clock className="w-4 h-4 mr-1" />
            <span>{item.duration}分钟</span>
          </div>
        )}

        <div className="flex items-center justify-between mt-4">
          <span className="text-indigo-600 font-medium">{item.price}积分</span>
          {item.quantity ? (
            <button
              onClick={handleUse}
              disabled={useItem.isLoading}
              className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 disabled:opacity-50"
            >
              使用 ({item.quantity})
            </button>
          ) : (
            <button
              onClick={handlePurchase}
              disabled={purchaseItem.isLoading}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700 disabled:opacity-50"
            >
              购买
            </button>
          )}
        </div>
      </div>
    </div>
  );
}