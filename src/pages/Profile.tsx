import React from 'react';
import { Settings, Gift, CreditCard, History, HelpCircle, LogOut, ChevronRight, Bell } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  return (
    <div className="min-h-screen bg-gray-100 pb-16">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6">
        <div className="flex items-center space-x-4">
          <div className="w-20 h-20 bg-white/20 rounded-full"></div>
          <div className="text-white">
            <h2 className="text-xl font-bold">{user?.username}</h2>
            <p className="text-sm opacity-90">VIP {user?.vipLevel} 会员</p>
          </div>
        </div>
        <div className="mt-6 flex justify-between text-white">
          <div className="text-center">
            <p className="text-xl font-bold">{user?.points}</p>
            <p className="text-sm opacity-90">积分</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold">{user?.balance}</p>
            <p className="text-sm opacity-90">余额</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold">3</p>
            <p className="text-sm opacity-90">连续签到</p>
          </div>
        </div>
      </div>

      {/* VIP Card */}
      <div className="p-4">
        <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg p-4 text-white">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="font-bold mb-1">VIP {user?.vipLevel} 会员</h3>
              <p className="text-sm opacity-90">享受更多特权</p>
            </div>
            <button className="px-4 py-1 bg-white/20 rounded-full text-sm">
              升级会员
            </button>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>每日广告次数</span>
              <span>{10 + (user?.vipLevel || 0) * 5}次</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>积分加成</span>
              <span>{(user?.vipLevel || 0) * 10 + 100}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="bg-white mx-4 rounded-lg">
        <div className="divide-y">
          <MenuItem 
            icon={<Gift className="text-purple-500" />}
            text="我的奖励"
            subText="查看获得的奖励"
          />
          <MenuItem 
            icon={<CreditCard className="text-blue-500" />}
            text="账户余额"
            subText={`${user?.balance || 0} 美元`}
          />
          <MenuItem 
            icon={<History className="text-green-500" />}
            text="观看记录"
            subText="查看广告观看历史"
          />
          <MenuItem 
            icon={<Bell className="text-yellow-500" />}
            text="消息通知"
            subText="管理通知设置"
          />
          <MenuItem 
            icon={<Settings className="text-gray-500" />}
            text="设置"
            subText="账号和隐私设置"
          />
          <MenuItem 
            icon={<HelpCircle className="text-indigo-500" />}
            text="帮助中心"
            subText="常见问题解答"
          />
        </div>
      </div>

      {/* Logout Button */}
      <div className="p-4">
        <button
          onClick={handleLogout}
          className="w-full bg-white text-red-600 py-3 rounded-lg font-medium"
        >
          退出登录
        </button>
      </div>
    </div>
  );
}

function MenuItem({ icon, text, subText }: { icon: React.ReactNode; text: string; subText: string }) {
  return (
    <div className="flex items-center justify-between p-4 hover:bg-gray-50">
      <div className="flex items-center space-x-3">
        {icon}
        <div>
          <p className="font-medium">{text}</p>
          <p className="text-sm text-gray-500">{subText}</p>
        </div>
      </div>
      <ChevronRight className="w-5 h-5 text-gray-400" />
    </div>
  );
}