import React, { useState } from 'react';
import { ArrowLeft, Send, Image, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Feedback() {
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState('');
  const [images, setImages] = useState<File[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle feedback submission
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setImages([...images, ...files]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white">
        <div className="px-4 py-3 flex items-center">
          <Link to="/" className="text-gray-600">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="ml-4 text-xl font-bold">意见反馈</h1>
        </div>
      </div>

      {/* Feedback Form */}
      <form onSubmit={handleSubmit} className="p-4 space-y-4">
        {/* Rating */}
        <div className="bg-white rounded-lg p-4">
          <h2 className="font-medium mb-3">评分</h2>
          <div className="flex space-x-2">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setRating(value)}
                className="p-2"
              >
                <Star
                  className={`w-8 h-8 ${
                    value <= rating ? 'text-yellow-500 fill-current' : 'text-gray-300'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg p-4">
          <h2 className="font-medium mb-3">反馈内容</h2>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="请详细描述您的问题或建议..."
            className="w-full h-32 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Image Upload */}
        <div className="bg-white rounded-lg p-4">
          <h2 className="font-medium mb-3">上传截图</h2>
          <div className="grid grid-cols-4 gap-2">
            {images.map((image, index) => (
              <div key={index} className="aspect-square bg-gray-100 rounded-lg relative">
                <img
                  src={URL.createObjectURL(image)}
                  alt={`Screenshot ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => setImages(images.filter((_, i) => i !== index))}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full"
                >
                  ×
                </button>
              </div>
            ))}
            {images.length < 4 && (
              <label className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <Image className="w-6 h-6 text-gray-400" />
              </label>
            )}
          </div>
          <p className="text-xs text-gray-500 mt-2">最多上传4张图片</p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium flex items-center justify-center space-x-2"
        >
          <Send className="w-5 h-5" />
          <span>提交反馈</span>
        </button>
      </form>
    </div>
  );
}