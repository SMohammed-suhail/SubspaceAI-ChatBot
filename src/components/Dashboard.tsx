import React from 'react';
import { MessageSquare, Users, Zap, TrendingUp, Activity, Clock } from 'lucide-react';
import StatsCard from './StatsCard';

export default function Dashboard() {
  const stats = [
    {
      title: 'Total Conversations',
      value: '2,847',
      change: '+12% from last month',
      changeType: 'positive' as const,
      icon: MessageSquare
    },
    {
      title: 'Active Users',
      value: '1,234',
      change: '+8% from last month',
      changeType: 'positive' as const,
      icon: Users
    },
    {
      title: 'AI Requests',
      value: '15,672',
      change: '+23% from last month',
      changeType: 'positive' as const,
      icon: Zap
    },
    {
      title: 'Success Rate',
      value: '98.5%',
      change: '+0.3% from last month',
      changeType: 'positive' as const,
      icon: TrendingUp
    }
  ];

  const recentActivity = [
    { action: 'New user registration', time: '2 minutes ago', type: 'user' },
    { action: 'AI model updated', time: '15 minutes ago', type: 'system' },
    { action: 'Document processed', time: '32 minutes ago', type: 'process' },
    { action: 'Chat session completed', time: '1 hour ago', type: 'chat' },
    { action: 'Image generated', time: '2 hours ago', type: 'generation' }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Welcome section */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Welcome to SubspaceAI</h1>
        <p className="text-purple-100 text-lg">
          Your intelligent AI assistant is ready to help you accomplish more.
        </p>
        <div className="mt-6 flex flex-wrap gap-4">
          <button className="bg-white text-purple-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
            Start New Chat
          </button>
          <button className="border border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:text-purple-600 transition-colors">
            View Documentation
          </button>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
            <Activity className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-xs text-gray-500 flex items-center mt-1">
                    <Clock className="w-3 h-3 mr-1" />
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Quick Actions</h2>
          <div className="space-y-3">
            <button className="w-full text-left p-4 rounded-lg border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-colors group">
              <div className="flex items-center space-x-3">
                <MessageSquare className="w-5 h-5 text-gray-400 group-hover:text-purple-600" />
                <span className="text-sm font-medium text-gray-700 group-hover:text-purple-700">
                  Start Chat Session
                </span>
              </div>
            </button>
            <button className="w-full text-left p-4 rounded-lg border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-colors group">
              <div className="flex items-center space-x-3">
                <Zap className="w-5 h-5 text-gray-400 group-hover:text-purple-600" />
                <span className="text-sm font-medium text-gray-700 group-hover:text-purple-700">
                  Generate Content
                </span>
              </div>
            </button>
            <button className="w-full text-left p-4 rounded-lg border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-colors group">
              <div className="flex items-center space-x-3">
                <TrendingUp className="w-5 h-5 text-gray-400 group-hover:text-purple-600" />
                <span className="text-sm font-medium text-gray-700 group-hover:text-purple-700">
                  View Analytics
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}