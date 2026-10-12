import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { StudyBlock } from './StudyBlock';
import { StudySession } from '../types';

interface WeekGridProps {
  sessions: StudySession[];
  selectedCourses: string[];
  onToggleComplete: (id: string) => void;
  onSelectBlock: (session: StudySession) => void;
}

export const WeekGrid: React.FC<WeekGridProps> = ({
  sessions,
  selectedCourses,
  onToggleComplete,
  onSelectBlock,
}) => {
  const days = [
    { name: 'Mon', date: '12', isToday: false, dayIndex: 1 },
    { name: 'Tue', date: '13', isToday: false, dayIndex: 2 },
    { name: 'Wed', date: '14', isToday: false, dayIndex: 3 },
    { name: 'Thu', date: '15', isToday: true, dayIndex: 4 },
    { name: 'Fri', date: '16', isToday: false, dayIndex: 5 },
    { name: 'Sat', date: '17', isToday: false, dayIndex: 6 },
    { name: 'Sun', date: '18', isToday: false, dayIndex: 0 },
  ];

  const filteredSessions = sessions.filter((session) =>
    selectedCourses.includes(session.courseId)
  );

  return (
    <div className="bg-white dark:bg-sage-darkCard rounded-3xl p-6 shadow-soft border border-gray-100 dark:border-gray-800/60 w-full flex flex-col flex-1">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-heading font-extrabold text-lg text-gray-900 dark:text-white">
            Weekly Schedule & Time Grid
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Constraint-optimized study intervals • Spaced Repetition Active
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-300">
            <span className="w-3 h-3 rounded-md bg-lime-neon inline-block border border-black/10" />
            Exam
          </span>
          <span className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-300">
            <span className="w-3 h-3 rounded-md bg-course-sky inline-block border border-black/10" />
            Study Session
          </span>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-3 mb-4">
        {days.map((day) => (
          <div
            key={day.name}
            className={`rounded-2xl p-2.5 text-center transition-all duration-200 border ${
              day.isToday
                ? 'bg-teal-deep text-white border-teal-deep shadow-md ring-2 ring-lime-neon/60'
                : 'bg-sage-card/60 dark:bg-gray-800/50 border-gray-100 dark:border-gray-800 text-gray-700 dark:text-gray-300'
            }`}
          >
            <span className={`text-[11px] font-bold block uppercase tracking-wider ${day.isToday ? 'text-lime-neon' : 'text-gray-400'}`}>
              {day.name}
            </span>
            <span className={`text-base font-extrabold font-heading block mt-0.5 ${day.isToday ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
              {day.date}
            </span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-3 relative min-h-[520px] flex-1">
        {days.map((day) => {
          const daySessions = filteredSessions.filter(
            (s) => s.dayIndex === day.dayIndex
          );

          return (
            <div
              key={day.name}
              className={`relative rounded-3xl p-2 flex flex-col gap-3 min-h-[480px] border transition-colors ${
                day.isToday
                  ? 'bg-teal-light/20 dark:bg-teal-deep/10 border-teal-deep/20'
                  : 'bg-sage-card/30 dark:bg-gray-800/20 border-dashed border-gray-200 dark:border-gray-800'
              }`}
            >
              {day.isToday && (
                <div className="absolute top-24 left-0 right-0 z-20 flex items-center pointer-events-none">
                  <div className="w-2.5 h-2.5 rounded-full bg-teal-deep dark:bg-lime-neon ring-4 ring-white dark:ring-sage-darkCard -ml-1 shadow-md" />
                  <div className="flex-1 h-0.5 bg-teal-deep dark:bg-lime-neon opacity-80" />
                </div>
              )}

              <AnimatePresence mode="popLayout">
                {daySessions.map((session) => (
                  <StudyBlock
                    key={session.id}
                    session={session}
                    onToggleComplete={onToggleComplete}
                    onSelectBlock={onSelectBlock}
                  />
                ))}
              </AnimatePresence>

              {daySessions.length === 0 && (
                <div className="h-full flex items-center justify-center text-center p-3">
                  <span className="text-[11px] font-medium text-gray-400 dark:text-gray-600 italic">
                    Free day
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
