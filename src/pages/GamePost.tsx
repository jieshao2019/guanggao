import React, { useState } from 'react';
import { ArrowLeft, Image, Send } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function GamePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [images, setImages] = useState<File[]>([]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setImages([...images, ...files]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle post submission
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/community" className="text-gray-600">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="ml-4 text-xl font-bold">发布帖子</h1>
        </div>
        <button
          onClick={handleSubmit}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm"
        >
          发布
        </button>
      </div>

      {/* Post Form */}
      <div className="p-4">
        <div className="bg-white rounded-lg">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="输入标题..."
            className="w-full px-4 py-3 border-b focus:outline-none"
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="分享你的游戏体验..."
            className="w-full px-4 py-3 h-40 focus:outline-none resize-none"
          />

          {/* Image Upload */}
          <div className="p-4 border-t">
            <div className="grid grid-cols-4 gap-2">
              {images.map((image, index) => (
                <div key={index} className="aspect-square bg-gray-100 rounded-lg relative">
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`Upload ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <button
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
        </div>
      </div>
    </div>
  );
}