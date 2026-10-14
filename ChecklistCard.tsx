import React, { useState } from 'react';
import { Check, Plus, Trash2 } from 'lucide-react';
import { ChecklistItem } from '../types';



interface ChecklistCardProps {
  items: ChecklistItem[];
  onToggleItem: (id: string) => void;
  onAddItem: (text: string, courseCode?: string) => void;
  onDeleteItem: (id: string) => void;
}

export const ChecklistCard: React.FC<ChecklistCardProps> = ({
  items,
  onToggleItem,
  onAddItem,
  onDeleteItem,
}) => {
  const [newItemText, setNewItemText] = useState('');
  const completedCount = items.filter((i) => i.completed).length;
  const progressPercent = items.length > 0 ? Math.round((completedCount / items.length) * 100) : 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newItemText.trim()) {
      onAddItem(newItemText.trim());
      setNewItemText('');
    }
  };

  return (
    <div className="bg-white dark:bg-sage-darkCard rounded-3xl p-5 shadow-soft border border-gray-100 dark:border-gray-800/60">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="font-heading font-bold text-sm text-gray-900 dark:text-white">
            Today's Checklist
          </h3>
          <p className="text-[11px] text-gray-500 dark:text-gray-400">
            {completedCount} of {items.length} completed ({progressPercent}%)
          </p>
        </div>
        <div className="w-10 h-10 rounded-2xl bg-teal-light dark:bg-teal-deep/30 flex items-center justify-center text-teal-deep dark:text-lime-neon font-extrabold text-xs">
          {progressPercent}%
        </div>
      </div>

      <div className="w-full bg-gray-100 dark:bg-gray-800 h-1.5 rounded-full overflow-hidden mb-4">
        <div
          className="bg-teal-deep dark:bg-lime-neon h-full transition-all duration-500 rounded-full"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <form onSubmit={handleSubmit} className="mb-4 flex items-center gap-2">
        <input
          type="text"
          value={newItemText}
          onChange={(e) => setNewItemText(e.target.value)}
          placeholder="Add a study task..."
          className="flex-1 px-3 py-2 text-xs rounded-xl bg-sage-card dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-deep/30 border border-transparent"
        />
        <button
          type="submit"
          disabled={!newItemText.trim()}
          className="p-2 rounded-xl bg-teal-deep text-white disabled:opacity-40 hover:bg-teal-dark transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
        </button>
      </form>

      <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-start justify-between gap-2 p-2.5 rounded-2xl bg-sage-card/60 dark:bg-gray-800/40 hover:bg-sage-card dark:hover:bg-gray-800 transition-colors group"
          >
            <div
              onClick={() => onToggleItem(item.id)}
              className="flex items-start gap-3 flex-1 cursor-pointer"
            >
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 transition-all duration-200 border ${
                  item.completed
                    ? 'bg-teal-deep border-teal-deep text-white shadow-sm'
                    : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 group-hover:border-teal-deep'
                }`}
              >
                {item.completed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
              </div>

              <div className="flex-1">
                <span
                  className={`text-xs block leading-tight transition-all ${
                    item.completed
                      ? 'line-through text-gray-400 dark:text-gray-500 font-normal'
                      : 'text-gray-800 dark:text-gray-200 font-medium'
                  }`}
                >
                  {item.text}
                </span>
                {item.courseCode && (
                  <span className="inline-block mt-1 text-[9px] font-bold px-1.5 py-0.5 rounded bg-white dark:bg-gray-700 text-teal-deep dark:text-lime-neon">
                    {item.courseCode}
                  </span>
                )}
              </div>
            </div>

            <button
              onClick={() => onDeleteItem(item.id)}
              className="text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity p-1"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
