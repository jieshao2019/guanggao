import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { useShop } from '../hooks/useShop';
import ShopItemCard from '../components/ShopItemCard';

export default function Shop() {
  const [activeType, setActiveType] = useState<string>('all');
  const { items, isLoading } = useShop();

  const filteredItems = items?.filter(
    (item) => activeType === 'all' || item.type === activeType
  );

  return (
    <div className="min-h-screen bg-gray-100 pb-16">
      {/* Header */}
      <div className="bg-white p-4 sticky top-0 z-10">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="搜索道具..."
            className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Type Filter */}
        <div className="flex space-x-2 overflow-x-auto">
          {['all', 'boost', 'skin', 'special'].map((type) => (
            <button
              key={type}
              onClick={() => setActiveType(type)}
              className={`px-4 py-1 rounded-full text-sm whitespace-nowrap ${
                activeType === type
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              {type === 'all' ? '全部' :
               type === 'boost' ? '加成道具' :
               type === 'skin' ? '装扮' : '特殊道具'}
            </button>
          ))}
        </div>
      </div>

      {/* Items Grid */}
      <div className="p-4">
        {isLoading ? (
          <div className="text-center py-8 text-gray-500">加载中...</div>
        ) : !filteredItems?.length ? (
          <div className="text-center py-8 text-gray-500">暂无道具</div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {filteredItems.map((item) => (
              <ShopItemCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}