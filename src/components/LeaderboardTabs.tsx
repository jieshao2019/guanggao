import React from 'react';

interface LeaderboardTabsProps {
  period: 'daily' | 'weekly' | 'monthly' | 'all';
  onChange: (period: 'daily' | 'weekly' | 'monthly' | 'all') => void;
}

export default function LeaderboardTabs({ period, onChange }: LeaderboardTabsProps) {
  const tabs = [
    { value: 'daily', label: '日榜' },
    { value: 'weekly', label: '周榜' },
    { value: 'monthly', label: '月榜' },
    { value: 'all', label: '总榜' },
  ] as const;

  return (
    <div className="flex bg-white/10 rounded-lg p-1">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onChange(tab.value)}
          className={`flex-1 py-2 text-sm rounded-md ${
            period === tab.value
              ? 'bg-white text-indigo-600'
              : 'text-white'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}