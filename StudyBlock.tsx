import React from 'react';
import { motion } from 'framer-motion';
import { Clock, CheckCircle2, BookOpen, Sparkles } from 'lucide-react';
import { StudySession } from '../types';

interface StudyBlockProps {
  session: StudySession;
  onToggleComplete: (id: string) => void;
  onSelectBlock: (session: StudySession) => void;
}

export const StudyBlock: React.FC<StudyBlockProps> = ({
  session,
  onToggleComplete,
  onSelectBlock,
}) => {
  const isExam = session.isExam;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
      onClick={() => onSelectBlock(session)}
      style={{
        backgroundColor: isExam ? '#D6F66B' : session.color,
      }}
      className={`relative w-full rounded-2xl p-3 cursor-pointer shadow-sm hover:shadow-md transition-all duration-200 group border ${
        isExam
          ? 'border-lime-neon ring-2 ring-lime-neon/40 text-gray-950 font-bold'
          : 'border-black/5 text-gray-900'
      }`}
    >
      <div className="flex items-start justify-between gap-1 mb-1">
        <div className="flex items-center gap-1.5 flex-wrap">
          {isExam ? (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-teal-deep text-white text-[10px] font-extrabold uppercase tracking-wider shadow-sm">
              <Sparkles className="w-3 h-3 text-lime-neon" />
              EXAM
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-white/70 text-gray-900 text-[10px] font-bold shadow-2xs">
              <BookOpen className="w-3 h-3 text-teal-deep" />
              {session.courseCode}
            </span>
          )}
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleComplete(session.id);
          }}
          className={`p-1 rounded-full transition-transform hover:scale-110 ${
            session.completed
              ? 'text-teal-deep fill-teal-deep/20'
              : 'text-gray-400 hover:text-teal-deep'
          }`}
          title={session.completed ? 'Mark incomplete' : 'Mark complete'}
        >
          <CheckCircle2
            className={`w-4 h-4 ${session.completed ? 'fill-teal-deep text-white' : ''}`}
          />
        </button>
      </div>

      <h4
        className={`text-xs font-bold leading-tight line-clamp-2 mb-2 ${
          session.completed ? 'line-through opacity-70' : ''
        }`}
      >
        {session.topicTitle}
      </h4>

      <div className="flex items-center justify-between text-[10px] font-semibold text-gray-700">
        <div className="flex items-center gap-1">
          <Clock className="w-3 h-3 opacity-70" />
          <span>
            {session.startTime} - {session.endTime}
          </span>
        </div>
        <span className="bg-white/50 px-1.5 py-0.5 rounded text-[9px]">
          {session.durationMinutes}m
        </span>
      </div>
    </motion.div>
  );
};
