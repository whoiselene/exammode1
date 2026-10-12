import React from 'react';
import { Flame, AlertTriangle, TrendingUp } from 'lucide-react';
import { Exam, Course } from '../types';

interface AnalyticsViewProps {
  exams: Exam[];
  courses: Course[];
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({ courses }) => {
  const generateHeatmapDays = () => {
    const days = [];
    for (let i = 0; i < 90; i++) {
      const hours = Math.floor(Math.random() * 5);
      days.push({ id: i, hours });
    }
    return days;
  };

  const heatmapData = generateHeatmapDays();

  const getHeatmapColor = (hours: number) => {
    if (hours === 0) return 'bg-sage-card dark:bg-gray-800';
    if (hours === 1) return 'bg-teal-light dark:bg-teal-deep/30';
    if (hours === 2) return 'bg-teal-deep/50 dark:bg-teal-deep/60';
    if (hours === 3) return 'bg-teal-deep text-white';
    return 'bg-lime-neon border border-black/20';
  };

  return (
    <div className="space-y-6 w-full animate-in fade-in duration-300">
      <div className="bg-white dark:bg-sage-darkCard rounded-3xl p-6 shadow-soft border border-gray-100 dark:border-gray-800/60">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-yellow-sunny text-gray-900 font-bold">
              <Flame className="w-5 h-5 fill-gray-900" />
            </div>
            <div>
              <h3 className="font-heading font-extrabold text-base text-gray-900 dark:text-white">
                Study Consistency Heatmap
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                GitHub-style daily study hour tracking (90 days)
              </p>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-teal-light text-teal-deep dark:bg-teal-deep/30 dark:text-lime-neon">
            🔥 18 Day Streak Active
          </span>
        </div>

        <div className="overflow-x-auto pb-2">
          <div className="grid grid-rows-7 grid-flow-col gap-1.5 min-w-[600px]">
            {heatmapData.map((d) => (
              <div
                key={d.id}
                title={`Day ${d.id + 1}: ${d.hours} hours studied`}
                className={`w-3.5 h-3.5 rounded-sm transition-transform hover:scale-125 ${getHeatmapColor(
                  d.hours
                )}`}
              />
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-gray-400 mt-3 pt-3 border-t border-gray-100 dark:border-gray-800">
          <span>Less</span>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-sage-card dark:bg-gray-800" />
            <span className="w-3 h-3 rounded-sm bg-teal-light dark:bg-teal-deep/30" />
            <span className="w-3 h-3 rounded-sm bg-teal-deep/50" />
            <span className="w-3 h-3 rounded-sm bg-teal-deep" />
            <span className="w-3 h-3 rounded-sm bg-lime-neon" />
          </div>
          <span>More</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-sage-darkCard rounded-3xl p-6 shadow-soft border border-gray-100 dark:border-gray-800/60">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              <h3 className="font-heading font-extrabold text-base text-gray-900 dark:text-white">
                Workload Curve & Danger Zones
              </h3>
            </div>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300">
              Low Overload
            </span>
          </div>

          <p className="text-xs text-gray-500 dark:text-gray-400 mb-6">
            Predictive workload forecasting based on upcoming exam dates and course difficulty metrics.
          </p>

          <div className="space-y-4">
            <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-gray-900 dark:text-white">
                  Upcoming Peak Workload: Oct 20 - Oct 23
                </h4>
                <p className="text-[11px] text-gray-600 dark:text-gray-300 mt-0.5">
                  2 Exams & 4 Major Assignments scheduled within 72 hours. Solver will pre-load study sessions into earlier free windows.
                </p>
              </div>
            </div>

            <div className="h-32 flex items-end gap-3 pt-4 border-b border-gray-100 dark:border-gray-800">
              {[3, 4, 7, 9, 12, 6, 4].map((hrs, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
                  <span className="text-[10px] font-bold text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    {hrs}h
                  </span>
                  <div
                    className={`w-full rounded-t-xl transition-all duration-300 ${
                      hrs > 8
                        ? 'bg-amber-500 shadow-sm'
                        : hrs > 6
                        ? 'bg-teal-deep'
                        : 'bg-teal-light dark:bg-teal-deep/30'
                    }`}
                    style={{ height: `${hrs * 8}px` }}
                  />
                  <span className="text-[10px] font-semibold text-gray-500">
                    Day {idx + 12}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-sage-darkCard rounded-3xl p-6 shadow-soft border border-gray-100 dark:border-gray-800/60">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-teal-deep dark:text-lime-neon" />
              <h3 className="font-heading font-extrabold text-base text-gray-900 dark:text-white">
                Exam Readiness Rings
              </h3>
            </div>
          </div>

          <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
            Topics covered vs total course curriculum required for final exam.
          </p>

          <div className="space-y-4">
            {courses.map((course) => {
              const progress = Math.round((course.completedTopics / course.totalTopics) * 100);

              return (
                <div
                  key={course.id}
                  className="p-3.5 rounded-2xl bg-sage-card/60 dark:bg-gray-800/40 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-3.5 h-3.5 rounded-full shrink-0"
                      style={{ backgroundColor: course.color }}
                    />
                    <div>
                      <h4 className="text-xs font-bold text-gray-900 dark:text-white">
                        {course.code} — {course.name}
                      </h4>
                      <p className="text-[11px] text-gray-500 dark:text-gray-400">
                        {course.completedTopics} / {course.totalTopics} Topics Completed
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-24 bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-teal-deep dark:bg-lime-neon h-full rounded-full transition-all duration-500"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <span className="text-xs font-extrabold text-gray-900 dark:text-white w-9 text-right">
                      {progress}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
