import React, { useState } from 'react';
import { Search, Bell, Sun, Moon, CheckCircle2, AlertTriangle, RefreshCw, X } from 'lucide-react';
import { NotificationItem } from '../types';

interface TopBarProps {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  viewMode: 'Daily' | 'Weekly' | 'Monthly';
  setViewMode: (mode: 'Daily' | 'Weekly' | 'Monthly') => void;
  onOpenCommandPalette: () => void;
  notifications: NotificationItem[];
  setNotifications: React.Dispatch<React.SetStateAction<NotificationItem[]>>;
}

export const TopBar: React.FC<TopBarProps> = ({
  darkMode,
  setDarkMode,
  viewMode,
  setViewMode,
  onOpenCommandPalette,
  notifications,
  setNotifications,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <header className="w-full flex flex-col md:flex-row items-center justify-between gap-4 py-4 px-6 bg-white/80 dark:bg-sage-darkCard/80 backdrop-blur-md rounded-3xl shadow-soft border border-white/40 dark:border-gray-800/40">
      <div className="flex items-center gap-3 w-full md:w-auto">
        <button
          onClick={onOpenCommandPalette}
          className="flex items-center justify-between gap-3 w-full md:w-80 px-4 py-2.5 bg-sage-card dark:bg-gray-800/80 rounded-2xl text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-all duration-200 border border-transparent hover:border-teal-deep/20 text-sm font-medium"
        >
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-teal-deep dark:text-lime-neon" />
            <span className="text-gray-500 dark:text-gray-400">Search topics, exams, or courses...</span>
          </div>
          <kbd className="px-2 py-0.5 text-xs bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-lg shadow-sm font-mono border border-gray-200 dark:border-gray-600">
            ⌘K
          </kbd>
        </button>
      </div>

      <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
        <div className="bg-sage-card dark:bg-gray-800/90 p-1.5 rounded-2xl flex items-center gap-1 shadow-inner">
          {(['Daily', 'Weekly', 'Monthly'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                viewMode === mode
                  ? 'bg-white dark:bg-teal-deep text-teal-deep dark:text-white shadow-sm'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>

        <button
          onClick={() => setDarkMode(!darkMode)}
          className="relative flex items-center bg-sage-card dark:bg-gray-800 p-1 rounded-full w-20 h-9 border border-gray-200 dark:border-gray-700 transition-colors duration-300"
          title="Toggle Light / Dark mode"
        >
          <span
            className={`absolute top-1 left-1 w-7 h-7 rounded-full bg-white dark:bg-teal-deep shadow-md flex items-center justify-center transition-transform duration-300 ${
              darkMode ? 'translate-x-11' : 'translate-x-0'
            }`}
          >
            {darkMode ? (
              <Moon className="w-4 h-4 text-lime-neon" />
            ) : (
              <Sun className="w-4 h-4 text-yellow-500" />
            )}
          </span>
          <span className="w-1/2 text-[10px] font-bold text-center pl-1 text-gray-500 dark:opacity-0 transition-opacity">
            Light
          </span>
          <span className="w-1/2 text-[10px] font-bold text-center pr-1 text-gray-400 opacity-0 dark:opacity-100 transition-opacity">
            Dark
          </span>
        </button>

        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2.5 rounded-2xl bg-sage-card dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:text-teal-deep dark:hover:text-lime-neon transition-colors duration-200"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-lime-neon rounded-full ring-2 ring-white dark:ring-sage-darkCard animate-pulse" />
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-3 w-80 bg-white dark:bg-sage-darkCard rounded-3xl shadow-float border border-gray-100 dark:border-gray-800 p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-2">
                  <h4 className="font-heading font-bold text-sm text-gray-900 dark:text-white">Notifications</h4>
                  {unreadCount > 0 && (
                    <span className="px-2 py-0.5 text-[10px] font-bold bg-teal-deep text-white rounded-full">
                      {unreadCount} new
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllRead}
                      className="text-[11px] font-medium text-teal-deep dark:text-lime-neon hover:underline"
                    >
                      Mark read
                    </button>
                  )}
                  <button
                    onClick={() => setShowNotifications(false)}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className={`p-3 rounded-2xl transition-colors ${
                      n.read
                        ? 'bg-sage-card/50 dark:bg-gray-800/40'
                        : 'bg-teal-light/40 dark:bg-teal-deep/20 border border-teal-deep/10'
                    }`}
                  >
                    <div className="flex items-start gap-2.5">
                      {n.type === 'sync' && <RefreshCw className="w-4 h-4 text-teal-deep dark:text-lime-neon mt-0.5 shrink-0" />}
                      {n.type === 'alert' && <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />}
                      {n.type === 'reminder' && <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />}
                      <div>
                        <p className="text-xs font-semibold text-gray-900 dark:text-white">{n.title}</p>
                        <p className="text-[11px] text-gray-500 dark:text-gray-300 mt-0.5 leading-snug">{n.message}</p>
                        <span className="text-[10px] text-gray-400 mt-1 block">{n.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3 pl-2 border-l border-gray-200 dark:border-gray-800">
          <div className="w-10 h-10 rounded-2xl bg-teal-deep text-white font-heading font-extrabold text-sm flex items-center justify-center ring-2 ring-teal-deep/30 shadow-sm">
            ES
          </div>
          <div className="hidden lg:block text-left">
            <h4 className="text-xs font-bold text-gray-900 dark:text-white leading-tight">Elene Samsiani</h4>
            <p className="text-[10px] text-gray-500 dark:text-gray-400">CS Senior • ELTE</p>
          </div>
        </div>
      </div>
    </header>
  );
};
