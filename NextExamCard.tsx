import React from 'react';
import { Calendar, Clock, Play, RefreshCw, AlertCircle } from 'lucide-react';
import { Exam } from '../types';

interface NextExamCardProps {
  exam: Exam;
  onStartFocus: () => void;
  onReschedule: () => void;
}

export const NextExamCard: React.FC<NextExamCardProps> = ({
  exam,
  onStartFocus,
  onReschedule,
}) => {
  const radius = 26;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (exam.readiness / 100) * circumference;

  return (
    <div className="bg-teal-deep dark:bg-teal-dark rounded-3xl p-6 text-white shadow-float relative overflow-hidden group">
      <div className="absolute -right-10 -bottom-10 w-44 h-44 bg-white/5 rounded-full blur-2xl group-hover:bg-white/10 transition-colors pointer-events-none" />
      
      <div className="flex items-center justify-between mb-4 relative z-10">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-extrabold bg-lime-neon text-teal-deep shadow-sm">
          <AlertCircle className="w-3.5 h-3.5 stroke-[2.5]" />
          NEXT UPCOMING EXAM
        </span>
        <span className="px-2.5 py-1 rounded-xl bg-white/15 backdrop-blur-md text-xs font-semibold text-lime-soft">
          {exam.daysLeft} Days Left
        </span>
      </div>

      <div className="flex items-start justify-between gap-4 mb-5 relative z-10">
        <div>
          <span className="text-xs font-medium text-teal-100/80 tracking-wide uppercase">
            {exam.courseCode}
          </span>
          <h3 className="font-heading font-extrabold text-lg md:text-xl text-white mt-0.5 leading-snug">
            {exam.courseName}
          </h3>
          <div className="flex items-center gap-3 mt-2 text-xs text-teal-100/90">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-lime-neon" />
              {exam.date}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-lime-neon" />
              {exam.time}
            </span>
          </div>
        </div>

        <div className="relative flex items-center justify-center shrink-0">
          <svg className="w-16 h-16 transform -rotate-90">
            <circle
              cx="32"
              cy="32"
              r={radius}
              stroke="currentColor"
              strokeWidth="5"
              className="text-white/20"
              fill="transparent"
            />
            <circle
              cx="32"
              cy="32"
              r={radius}
              stroke="currentColor"
              strokeWidth="5"
              className="text-lime-neon transition-all duration-1000 ease-out"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute flex flex-col items-center justify-center">
            <span className="text-xs font-extrabold text-white">{exam.readiness}%</span>
            <span className="text-[9px] text-teal-100/70 font-medium">Ready</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 relative z-10 pt-2 border-t border-white/10">
        <button
          onClick={onStartFocus}
          className="w-full py-2.5 px-3 rounded-2xl bg-yellow-sunny hover:bg-yellow-hover text-gray-900 font-bold text-xs shadow-yellow-glow flex items-center justify-center gap-1.5 transition-transform active:scale-95"
        >
          <Play className="w-3.5 h-3.5 fill-gray-900" />
          Start Focus
        </button>
        <button
          onClick={onReschedule}
          className="w-full py-2.5 px-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/20 flex items-center justify-center gap-1.5 transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Reschedule
        </button>
      </div>
    </div>
  );
};
