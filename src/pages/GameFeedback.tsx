import React, { useState } from 'react';
import { ArrowLeft, Send, Image, Bug, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function GameFeedback() {
  const [type, setType] = useState<'bug' | 'suggestion'>('bug');
  const [content, setContent] = useState('');
  const [images, setImages] = useState<File[]>([]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setImages([...images, ...files]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle feedback submission
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/games" className="text-gray-600">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <h1 className="ml-4 text-xl font-bold">问题反馈</h1>
          </div>
          <button
            onClick={handleSubmit}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm"
          >
            提交
          </button>
        </div>
      </div>

      {/* Feedback Type */}
      <div className="p-4">
        <div className="bg-white rounded-lg p-4 mb-4">
          <h2 className="font-medium mb-3">反馈类型</h2>
          <div className="flex space-x-4">
            <button
              onClick={() => setType('bug')}
              className={`flex-1 py-3 rounded-lg flex items-center justify-center space-x-2 ${
                type === 'bug'
                  ? 'bg-red-50 text-red-600 border-2 border-red-600'
                  : 'bg-gray-50 text-gray-600'
              }`}
            >
              <Bug className="w-5 h-5" />
              <span>问题反馈</span>
            </button>
            <button
              onClick={() => setType('suggestion')}
              className={`flex-1 py-3 rounded-lg flex items-center justify-center space-x-2 ${
                type === 'suggestion'
                  ? 'bg-blue-50 text-blue-600 border-2 border-blue-600'
                  : 'bg-gray-50 text-gray-600'
              }`}
            >
              <MessageSquare className="w-5 h-5" />
              <span>建议反馈</span>
            </button>
          </div>
        </div>

        {/* Feedback Content */}
        <div className="bg-white rounded-lg p-4">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={type === 'bug' ? '请详细描述您遇到的问题...' : '请输入您的建议...'}
            className="w-full h-40 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
          />

          {/* Image Upload */}
          <div className="mt-4">
            <div className="grid grid-cols-4 gap-2">
              {images.map((image, index) => (
                <div key={index} className="aspect-square bg-gray-100 rounded-lg relative">
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`Screenshot ${index + 1}`}
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