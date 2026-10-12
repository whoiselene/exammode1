import React from 'react';
import { Plus, Clock, Target, CalendarDays, RefreshCw } from 'lucide-react';
import { UserStats } from '../types';

interface HeroStatsRowProps {
  stats: UserStats;
  onAddExam: () => void;
  onReplan: () => void;
  isReplanning: boolean;
}

export const HeroStatsRow: React.FC<HeroStatsRowProps> = ({
  stats,
  onAddExam,
  onReplan,
  isReplanning,
}) => {
  return (
    <div className="w-full bg-white/70 dark:bg-sage-darkCard/70 backdrop-blur-md rounded-3xl p-6 shadow-soft border border-white/50 dark:border-gray-800/50 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
      <div className="space-y-1">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl md:text-3xl font-heading font-extrabold text-gray-900 dark:text-white tracking-tight">
            My Study Plan
          </h1>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-teal-light text-teal-deep dark:bg-teal-deep/30 dark:text-lime-neon border border-teal-deep/20">
            <span className="w-2 h-2 rounded-full bg-teal-deep dark:bg-lime-neon animate-pulse" />
            Adaptive schedule live
          </span>
        </div>
        <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
          Targeted study schedule synchronized with OR-Tools optimization engine.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-4 lg:gap-6">
        <div className="flex items-center gap-4 bg-sage-card/80 dark:bg-gray-800/80 px-5 py-3 rounded-2xl border border-gray-100 dark:border-gray-700/50">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-teal-light dark:bg-teal-deep/30 text-teal-deep dark:text-lime-neon">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="text-lg font-extrabold text-gray-900 dark:text-white leading-none">
                {stats.weeklyHoursStudied} <span className="text-xs font-medium text-gray-400">/ {stats.weeklyTargetHours}h</span>
              </div>
              <div className="text-[11px] font-medium text-gray-500 dark:text-gray-400 mt-0.5">
                Studied this week
              </div>
            </div>
          </div>

          <div className="h-8 w-px bg-gray-200 dark:bg-gray-700" />

          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-lime-soft/60 dark:bg-lime-neon/20 text-teal-deep dark:text-lime-neon">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <div className="text-lg font-extrabold text-gray-900 dark:text-white leading-none">
                {stats.overallReadiness}%
              </div>
              <div className="text-[11px] font-medium text-gray-500 dark:text-gray-400 mt-0.5">
                Overall readiness
              </div>
            </div>
          </div>

          <div className="h-8 w-px bg-gray-200 dark:bg-gray-700" />

          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300">
              <CalendarDays className="w-5 h-5" />
            </div>
            <div>
              <div className="text-lg font-extrabold text-gray-900 dark:text-white leading-none">
                {stats.nextExamDays} days
              </div>
              <div className="text-[11px] font-medium text-gray-500 dark:text-gray-400 mt-0.5">
                Next exam
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onReplan}
            disabled={isReplanning}
            className={`px-4 py-3 rounded-2xl font-semibold text-xs transition-all duration-300 flex items-center gap-2 border ${
              isReplanning
                ? 'bg-teal-deep text-white opacity-80 cursor-wait'
                : 'bg-white dark:bg-gray-800 text-teal-deep dark:text-lime-neon hover:bg-teal-light/50 dark:hover:bg-gray-700 border-teal-deep/30 shadow-sm'
            }`}
          >
            <RefreshCw className={`w-4 h-4 ${isReplanning ? 'animate-spin' : ''}`} />
            {isReplanning ? 'Healing Schedule...' : '✨ Re-plan Schedule'}
          </button>

          <button
            onClick={onAddExam}
            className="px-5 py-3 rounded-2xl bg-yellow-sunny hover:bg-yellow-hover text-gray-900 font-bold text-xs shadow-yellow-glow hover:scale-105 active:scale-95 transition-all duration-200 flex items-center gap-2"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            Add Exam
          </button>
        </div>
      </div>
    </div>
  );
};
