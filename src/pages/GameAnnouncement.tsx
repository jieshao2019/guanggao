import React from 'react';
import { ArrowLeft, Bell, Calendar, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function GameAnnouncement() {
  const announcements = [
    {
      id: 1,
      title: '系统维护公告',
      content: '为了给大家提供更好的游戏体验，系统将于3月20日进行维护升级...',
      type: 'maintenance',
      date: '2024-03-18',
      isRead: false,
    },
    {
      id: 2,
      title: '新版本更新公告',
      content: '新版本将带来全新游戏玩法和优化体验...',
      type: 'update',
      date: '2024-03-15',
      isRead: true,
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white">
        <div className="px-4 py-3 flex items-center">
          <Link to="/games" className="text-gray-600">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="ml-4 text-xl font-bold">游戏公告</h1>
        </div>
      </div>

      {/* Announcements List */}
      <div className="p-4 space-y-4">
        {announcements.map((announcement) => (
          <Link
            key={announcement.id}
            to={`/announcement/${announcement.id}`}
            className="block bg-white rounded-lg overflow-hidden"
          >
            <div className="p-4">
              <div className="flex items-start space-x-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  announcement.type === 'maintenance'
                    ? 'bg-yellow-100'
                    : 'bg-blue-100'
                }`}>
                  <Bell className={`w-5 h-5 ${
                    announcement.type === 'maintenance'
                      ? 'text-yellow-600'
                      : 'text-blue-600'
                  }`} />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold">
                        {!announcement.isRead && (
                          <span className="inline-block w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                        )}
                        {announcement.title}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                        {announcement.content}
                      </p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  </div>
                  <div className="flex items-center text-sm text-gray-500 mt-2">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>{announcement.date}</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}