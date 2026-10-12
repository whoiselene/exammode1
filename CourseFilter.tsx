import React from 'react';
import { Check } from 'lucide-react';
import { Course } from '../types';

interface CourseFilterProps {
  courses: Course[];
  selectedCourses: string[];
  toggleCourse: (courseId: string) => void;
  selectAll: () => void;
}

export const CourseFilter: React.FC<CourseFilterProps> = ({
  courses,
  selectedCourses,
  toggleCourse,
  selectAll,
}) => {
  const allSelected = selectedCourses.length === courses.length;

  return (
    <div className="bg-white dark:bg-sage-darkCard rounded-3xl p-5 shadow-soft border border-gray-100 dark:border-gray-800/60">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-heading font-bold text-sm text-gray-900 dark:text-white">
          Courses Filter
        </h3>
        <button
          onClick={selectAll}
          className="text-xs font-semibold text-teal-deep dark:text-lime-neon hover:underline"
        >
          {allSelected ? 'Deselect All' : 'Select All'}
        </button>
      </div>

      <div className="space-y-2.5">
        {courses.map((course) => {
          const isSelected = selectedCourses.includes(course.id);
          return (
            <div
              key={course.id}
              onClick={() => toggleCourse(course.id)}
              className="flex items-center justify-between p-2.5 rounded-2xl hover:bg-sage-card dark:hover:bg-gray-800/80 cursor-pointer transition-colors duration-150 group"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-5 h-5 rounded-lg flex items-center justify-center transition-all duration-200 border ${
                    isSelected
                      ? 'bg-teal-deep border-teal-deep text-white shadow-sm'
                      : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600'
                  }`}
                >
                  {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className="w-3 h-3 rounded-full shrink-0 shadow-sm"
                    style={{ backgroundColor: course.color }}
                  />
                  <div>
                    <span className="text-xs font-bold text-gray-900 dark:text-white block leading-tight">
                      {course.code}
                    </span>
                    <span className="text-[11px] text-gray-500 dark:text-gray-400 line-clamp-1">
                      {course.name}
                    </span>
                  </div>
                </div>
              </div>

              <span className="text-[10px] font-bold px-2 py-0.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
                {course.completedTopics}/{course.totalTopics}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
