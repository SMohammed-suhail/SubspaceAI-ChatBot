import React from 'react';
import { 
  MessageSquare, 
  Image, 
  FileText, 
  Code, 
  Zap, 
  BarChart3,
  History,
  Star,
  X
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { icon: MessageSquare, label: 'Chat Assistant', active: true },
  { icon: Image, label: 'Image Generation', active: false },
  { icon: FileText, label: 'Document Analysis', active: false },
  { icon: Code, label: 'Code Assistant', active: false },
  { icon: Zap, label: 'Quick Actions', active: false },
  { icon: BarChart3, label: 'Analytics', active: false },
];

const recentItems = [
  'Marketing Strategy Analysis',
  'Product Roadmap Review',
  'Customer Feedback Summary',
  'Competitive Analysis Report'
];

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 bg-gray-50 border-r border-gray-200
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col h-full">
          {/* Mobile close button */}
          <div className="lg:hidden flex justify-end p-4">
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            <div className="mb-6">
              <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                AI Tools
              </h2>
              {menuItems.map((item, index) => (
                <button
                  key={index}
                  className={`
                    w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors
                    ${item.active 
                      ? 'bg-purple-100 text-purple-700 border border-purple-200' 
                      : 'text-gray-700 hover:bg-gray-100'
                    }
                  `}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              ))}
            </div>
            
            <div>
              <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                Recent
              </h2>
              {recentItems.map((item, index) => (
                <button
                  key={index}
                  className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left hover:bg-gray-100 transition-colors group"
                >
                  <History className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
                  <span className="text-sm text-gray-600 truncate">{item}</span>
                </button>
              ))}
            </div>
          </nav>
          
          {/* Upgrade section */}
          <div className="p-4 border-t border-gray-200">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg p-4 text-white">
              <div className="flex items-center space-x-2 mb-2">
                <Star className="w-5 h-5" />
                <span className="font-semibold">Upgrade to Pro</span>
              </div>
              <p className="text-sm text-purple-100 mb-3">
                Unlock advanced AI features and unlimited usage
              </p>
              <button className="w-full bg-white text-purple-600 py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors">
                Upgrade Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}