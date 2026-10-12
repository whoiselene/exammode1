import React from 'react';
import { Users, Radio, MessageSquare, Play, Sparkles, UserCheck } from 'lucide-react';
import { StudyGroupMember, Course } from '../types';

interface StudyGroupsViewProps {
  members: StudyGroupMember[];
  courses: Course[];
  onStartFocusRoom: () => void;
}

export const StudyGroupsView: React.FC<StudyGroupsViewProps> = ({
  members,
  courses,
  onStartFocusRoom,
}) => {
  const activeMembers = members.filter((m) => m.status === 'studying');

  return (
    <div className="space-y-6 w-full animate-in fade-in duration-300">
      <div className="bg-white dark:bg-sage-darkCard rounded-3xl p-6 shadow-soft border border-gray-100 dark:border-gray-800/60 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
            </span>
            <h2 className="font-heading font-extrabold text-xl text-gray-900 dark:text-white">
              Real-Time Study Groups & Live Peers
            </h2>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Collaborative study spaces synchronized with classmates taking the same upcoming exams.
          </p>
        </div>

        <button
          onClick={onStartFocusRoom}
          className="px-5 py-3 rounded-2xl bg-yellow-sunny hover:bg-yellow-hover text-gray-900 font-extrabold text-xs shadow-yellow-glow flex items-center gap-2 transition-transform active:scale-95"
        >
          <Radio className="w-4 h-4 text-gray-900 animate-pulse" />
          Host Live Focus Room
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white dark:bg-sage-darkCard rounded-3xl p-6 shadow-soft border border-gray-100 dark:border-gray-800/60">
            <h3 className="font-heading font-extrabold text-base text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-teal-deep dark:text-lime-neon" />
              Who's Studying Right Now ({activeMembers.length} Active)
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {members.map((member) => (
                <div
                  key={member.id}
                  className={`p-4 rounded-2xl border transition-all ${
                    member.status === 'studying'
                      ? 'bg-teal-light/30 dark:bg-teal-deep/20 border-teal-deep/30 shadow-sm'
                      : 'bg-sage-card/40 dark:bg-gray-800/30 border-gray-100 dark:border-gray-800'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img
                          src={member.avatar}
                          alt={member.name}
                          className="w-10 h-10 rounded-2xl object-cover"
                        />
                        <span
                          className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full ring-2 ring-white dark:ring-sage-darkCard ${
                            member.status === 'studying'
                              ? 'bg-emerald-500'
                              : member.status === 'idle'
                              ? 'bg-amber-400'
                              : 'bg-gray-400'
                          }`}
                        />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-gray-900 dark:text-white leading-tight">
                          {member.name}
                        </h4>
                        <span className="text-[10px] font-semibold text-teal-deep dark:text-lime-neon capitalize">
                          {member.status}
                        </span>
                      </div>
                    </div>

                    {member.status === 'studying' && (
                      <button
                        onClick={onStartFocusRoom}
                        className="px-2.5 py-1 rounded-xl bg-white dark:bg-gray-700 text-[10px] font-bold text-teal-deep dark:text-lime-neon shadow-2xs hover:bg-sage-card"
                      >
                        Join Room
                      </button>
                    )}
                  </div>

                  {member.currentSubject && (
                    <div className="p-2 rounded-xl bg-white/60 dark:bg-gray-800/60 text-[11px] font-medium text-gray-700 dark:text-gray-300">
                      📖 {member.currentSubject}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-sage-darkCard rounded-3xl p-6 shadow-soft border border-gray-100 dark:border-gray-800/60">
            <h3 className="font-heading font-extrabold text-base text-gray-900 dark:text-white mb-4">
              Shared Course Communities
            </h3>

            <div className="space-y-3">
              {courses.map((c) => (
                <div
                  key={c.id}
                  className="p-4 rounded-2xl bg-sage-card/50 dark:bg-gray-800/40 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-xs shadow-2xs"
                      style={{ backgroundColor: c.color }}
                    >
                      {c.code}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-gray-900 dark:text-white">
                        {c.name}
                      </h4>
                      <p className="text-[11px] text-gray-500 dark:text-gray-400">
                        14 Classmates enrolled • Next Exam in 6 days
                      </p>
                    </div>
                  </div>

                  <button className="p-2 rounded-xl bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-200 hover:text-teal-deep">
                    <MessageSquare className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-sage-darkCard rounded-3xl p-6 shadow-soft border border-gray-100 dark:border-gray-800/60 flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-lime-neon flex items-center justify-center text-teal-deep mb-4 font-bold shadow-sm">
              <Sparkles className="w-6 h-6" />
            </div>

            <h3 className="font-heading font-extrabold text-lg text-gray-900 dark:text-white mb-2">
              Collaborative Study Rooms
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed mb-6">
              Study synchronously with peers using silent Pomodoro audio rooms and synchronized topic checkpoints.
            </p>

            <div className="space-y-3 text-xs text-gray-600 dark:text-gray-300">
              <div className="flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-teal-deep dark:text-lime-neon" />
                <span>Shared topic progress indicators</span>
              </div>
              <div className="flex items-center gap-2">
                <Radio className="w-4 h-4 text-amber-500" />
                <span>Live Pomodoro timer broadcast</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-500" />
                <span>Automated note & resource sharing</span>
              </div>
            </div>
          </div>

          <button
            onClick={onStartFocusRoom}
            className="w-full py-3.5 mt-6 rounded-2xl bg-teal-deep text-white font-extrabold text-xs shadow-md hover:bg-teal-dark transition-transform active:scale-95 flex items-center justify-center gap-2"
          >
            <Play className="w-4 h-4 fill-white" />
            Enter Active Study Room
          </button>
        </div>
      </div>
    </div>
  );
};
