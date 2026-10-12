import React from 'react';
import { LayoutDashboard, Calendar, BookOpen, Timer, Users, Settings, LogOut, Sparkles, BarChart3 } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  openFocusTimer: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, openFocusTimer }) => {
  const mainNavItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'calendar', label: 'Calendar Grid', icon: Calendar },
    { id: 'courses', label: 'Courses', icon: BookOpen },
    { id: 'focustimer', label: 'Focus Timer', icon: Timer, action: openFocusTimer },
    { id: 'studygroups', label: 'Study Groups', icon: Users },
    { id: 'analytics', label: 'Analytics & Heatmap', icon: BarChart3 },
  ];

  return (
    <aside className="w-20 md:w-24 flex flex-col items-center py-6 px-3 flex-shrink-0 justify-between select-none">
      <div className="flex flex-col items-center gap-6 w-full">
        <div className="w-12 h-12 rounded-2xl bg-teal-deep flex items-center justify-center text-white shadow-soft font-bold text-xl cursor-pointer hover:scale-105 transition-transform duration-200">
          <Sparkles className="w-6 h-6 text-lime-neon" />
        </div>

        <div className="w-full bg-white dark:bg-sage-darkCard rounded-3xl p-2.5 shadow-soft flex flex-col items-center gap-4">
          {mainNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  if (item.action) {
                    item.action();
                  } else {
                    setActiveTab(item.id);
                  }
                }}
                title={item.label}
                className={`relative w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 group ${
                  isActive
                    ? 'bg-yellow-sunny text-gray-900 shadow-yellow-glow scale-105'
                    : 'text-gray-500 hover:text-teal-deep dark:text-gray-400 dark:hover:text-lime-neon hover:bg-sage-card dark:hover:bg-gray-800'
                }`}
              >
                <Icon className={`w-5 h-5 transition-transform duration-200 group-hover:scale-110 ${isActive ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
                {isActive && (
                  <span className="absolute -left-1 w-1.5 h-6 bg-teal-deep rounded-r-full" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="w-full bg-white dark:bg-sage-darkCard rounded-3xl p-2.5 shadow-soft flex flex-col items-center gap-3">
        <button
          onClick={() => setActiveTab('settings')}
          title="Settings"
          className="w-12 h-12 rounded-2xl flex items-center justify-center text-gray-400 hover:text-teal-deep dark:hover:text-lime-neon hover:bg-sage-card dark:hover:bg-gray-800 transition-all duration-200"
        >
          <Settings className="w-5 h-5" />
        </button>
        <button
          title="Logout"
          className="w-12 h-12 rounded-2xl flex items-center justify-center text-red-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all duration-200"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </div>
    </aside>
  );
};
