import React, { useState } from 'react';
import { ArrowLeft, Camera, Mail, Phone, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function EditProfile() {
  const { user } = useAuth();
  const [avatar, setAvatar] = useState<File | null>(null);
  const [username, setUsername] = useState(user?.username || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState('');

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatar(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle profile update
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/profile" className="text-gray-600">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <h1 className="ml-4 text-xl font-bold">编辑资料</h1>
          </div>
          <button className="text-indigo-600 font-medium">保存</button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-4 space-y-4">
        {/* Avatar */}
        <div className="bg-white rounded-lg p-4">
          <div className="flex items-center justify-center">
            <div className="relative">
              <div className="w-24 h-24 bg-gray-200 rounded-full">
                {avatar && (
                  <img
                    src={URL.createObjectURL(avatar)}
                    alt="Avatar"
                    className="w-full h-full object-cover rounded-full"
                  />
                )}
              </div>
              <label className="absolute bottom-0 right-0 bg-indigo-600 text-white p-2 rounded-full cursor-pointer">
                <Camera className="w-5 h-5" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        </div>

        {/* Basic Info */}
        <div className="bg-white rounded-lg">
          <div className="divide-y">
            <div className="p-4">
              <label className="block text-sm text-gray-500 mb-1">用户名</label>
              <div className="flex items-center">
                <User className="w-5 h-5 text-gray-400 mr-2" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="flex-1 focus:outline-none"
                  placeholder="设置用户名"
                />
              </div>
            </div>

            <div className="p-4">
              <label className="block text-sm text-gray-500 mb-1">邮箱</label>
              <div className="flex items-center">
                <Mail className="w-5 h-5 text-gray-400 mr-2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 focus:outline-none"
                  placeholder="绑定邮箱"
                />
              </div>
            </div>

            <div className="p-4">
              <label className="block text-sm text-gray-500 mb-1">手机号</label>
              <div className="flex items-center">
                <Phone className="w-5 h-5 text-gray-400 mr-2" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="flex-1 focus:outline-none"
                  placeholder="绑定手机号"
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}