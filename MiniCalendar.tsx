import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface MiniCalendarProps {
  selectedDate: number;
  setSelectedDate: (day: number) => void;
  examDays: number[];
}

export const MiniCalendar: React.FC<MiniCalendarProps> = ({
  selectedDate,
  setSelectedDate,
  examDays,
}) => {
  const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const totalDays = 31;
  const startOffset = 4;
  const todayDay = 15;
  const currentWeekDays = [12, 13, 14, 15, 16, 17, 18];

  return (
    <div className="bg-white dark:bg-sage-darkCard rounded-3xl p-5 shadow-soft border border-gray-100 dark:border-gray-800/60">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-heading font-bold text-sm text-gray-900 dark:text-white">
          October 2026
        </h3>
        <div className="flex items-center gap-1">
          <button className="p-1 rounded-xl hover:bg-sage-card dark:hover:bg-gray-800 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button className="p-1 rounded-xl hover:bg-sage-card dark:hover:bg-gray-800 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center mb-2">
        {daysOfWeek.map((day, idx) => (
          <span key={idx} className="text-[11px] font-semibold text-gray-400 dark:text-gray-500 py-1">
            {day}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-y-1.5 text-center relative">
        {Array.from({ length: startOffset }).map((_, i) => (
          <div key={`blank-${i}`} className="h-8" />
        ))}

        {Array.from({ length: totalDays }).map((_, i) => {
          const dayNum = i + 1;
          const isToday = dayNum === todayDay;
          const isExam = examDays.includes(dayNum);
          const isSelected = selectedDate === dayNum;
          const isInCurrentWeek = currentWeekDays.includes(dayNum);

          return (
            <div key={dayNum} className="relative flex items-center justify-center">
              {isInCurrentWeek && (
                <div className="absolute inset-0 bg-teal-light/40 dark:bg-teal-deep/10 rounded-full" />
              )}

              <button
                onClick={() => setSelectedDate(dayNum)}
                className={`relative z-10 w-8 h-8 rounded-full text-xs font-semibold flex items-center justify-center transition-all duration-200 ${
                  isToday
                    ? 'bg-teal-deep text-white shadow-md font-bold ring-2 ring-teal-deep/30 scale-105'
                    : isSelected
                    ? 'bg-yellow-sunny text-gray-900 font-bold'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-sage-card dark:hover:bg-gray-800'
                }`}
              >
                {dayNum}
                {isExam && !isToday && (
                  <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-lime-neon rounded-full ring-1 ring-gray-900" />
                )}
                {isExam && isToday && (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-lime-neon rounded-full ring-2 ring-teal-deep" />
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
