import React, { useState } from 'react';
import { 
  Plus, Eye, Clock, Sparkles, Check, ChevronLeft, ChevronRight, X 
} from 'lucide-react';
import { CHURCH_STATUS_UPDATES } from '../churchData';

export default function StatusStoriesView({ onShareToChat }) {
  const [statuses, setStatuses] = useState(CHURCH_STATUS_UPDATES);
  const [activeStoryIndex, setActiveStoryIndex] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newStatusText, setNewStatusText] = useState('');
  const [newStatusVerse, setNewStatusVerse] = useState('');
  const [newGradient, setNewGradient] = useState('from-emerald-800 to-teal-900');

  const gradients = [
    { label: 'Emerald Glory', class: 'from-emerald-800 to-teal-900' },
    { label: 'Royal Anointing', class: 'from-purple-800 to-indigo-900' },
    { label: 'Golden Fire', class: 'from-amber-700 to-amber-900' },
    { label: 'Rose Grace', class: 'from-rose-800 to-pink-900' },
    { label: 'Deep Ocean', class: 'from-blue-800 to-cyan-900' }
  ];

  const handlePostStatus = (e) => {
    e.preventDefault();
    if (!newStatusText.trim()) return;

    const newObj = {
      id: 'status-' + Date.now(),
      author: 'You (Saint)',
      avatar: '🕊️',
      time: 'Just now',
      title: 'My Daily Testimony & Word',
      text: newStatusText,
      bgGradient: newGradient,
      views: 1,
      verse: newStatusVerse || 'Philippians 4:13'
    };

    setStatuses([newObj, ...statuses]);
    setNewStatusText('');
    setNewStatusVerse('');
    setShowAddModal(false);
  };

  const currentActiveStory = activeStoryIndex !== null ? statuses[activeStoryIndex] : null;

  return (
    <div className="h-full flex flex-col bg-white dark:bg-[#111b21] text-[#111b21] dark:text-[#e9edef] overflow-y-auto">
      {/* Top Header */}
      <div className="p-4 bg-[#f0f2f5] dark:bg-[#202c33] border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
        <div>
          <h2 className="font-bold text-sm leading-tight flex items-center gap-1.5">
            Community Status & Rhema Stories
            <span className="text-[10px] bg-emerald-100 dark:bg-emerald-950 text-[#008069] dark:text-[#25d366] px-1.5 py-0.5 rounded font-medium">
              24-Hour Exhortation
            </span>
          </h2>
          <p className="text-gray-500 text-xs">Share daily biblical inspirations and praise updates</p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-[#008069] hover:bg-[#006e58] text-white text-xs font-semibold rounded-lg transition cursor-pointer"
        >
          <Plus size={14} /> Update My Status
        </button>
      </div>

      {/* Main Grid */}
      <div className="p-4 sm:p-6 max-w-4xl mx-auto w-full">
        {/* My Status Card */}
        <div 
          onClick={() => setShowAddModal(true)}
          className="p-3 mb-6 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700 flex items-center gap-3 cursor-pointer hover:border-[#008069] transition"
        >
          <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950 text-[#008069] dark:text-[#25d366] flex items-center justify-center font-bold text-xl relative">
            🕊️
            <span className="absolute bottom-0 right-0 w-4 h-4 bg-[#008069] text-white rounded-full flex items-center justify-center text-[10px] font-bold">
              +
            </span>
          </div>
          <div>
            <div className="font-bold text-xs sm:text-sm">My Spiritual Status</div>
            <div className="text-[11px] text-gray-500">Tap to add your testimony, scripture or praise point</div>
          </div>
        </div>

        <h3 className="font-bold text-xs uppercase tracking-wider text-gray-400 mb-3">
          Recent Sanctuary Stories ({statuses.length})
        </h3>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {statuses.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => setActiveStoryIndex(idx)}
              className={`h-64 rounded-2xl p-4 bg-gradient-to-br ${item.bgGradient} text-white flex flex-col justify-between shadow-md cursor-pointer transform hover:-translate-y-1 transition duration-200 relative overflow-hidden group`}
            >
              {/* Subtle background glow */}
              <div className="absolute -right-8 -bottom-8 w-28 h-28 bg-white/10 rounded-full blur-xl group-hover:scale-125 transition"></div>

              {/* Author bar */}
              <div className="flex items-center gap-2.5 z-10">
                <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-lg border border-white/30">
                  {item.avatar}
                </div>
                <div>
                  <h4 className="font-bold text-xs leading-tight drop-shadow-xs">{item.author}</h4>
                  <span className="text-[10px] text-white/80">{item.time}</span>
                </div>
              </div>

              {/* Status Message */}
              <div className="my-auto z-10 text-center px-2">
                <p className="font-serif text-sm sm:text-base font-semibold leading-relaxed drop-shadow-md">
                  {item.text}
                </p>
                {item.verse && (
                  <span className="inline-block mt-2 text-[10px] font-sans font-bold bg-black/30 backdrop-blur-sm px-2 py-0.5 rounded-full border border-white/20">
                    📖 {item.verse}
                  </span>
                )}
              </div>

              {/* Footer info */}
              <div className="flex items-center justify-between text-[11px] text-white/80 z-10 pt-2 border-t border-white/15">
                <span className="flex items-center gap-1 font-mono text-[10px]">
                  <Eye size={12} /> {item.views} brethren viewed
                </span>
                <span className="text-[10px] font-bold underline">Tap to view</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fullscreen Story Viewer Modal */}
      {currentActiveStory && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-2 backdrop-blur-md">
          <div className={`w-full max-w-sm h-[82vh] rounded-2xl bg-gradient-to-br ${currentActiveStory.bgGradient} text-white flex flex-col justify-between p-5 relative shadow-2xl animate-in zoom-in-95`}>
            {/* Top Close & Progress Bar */}
            <div>
              <div className="w-full bg-white/30 h-1 rounded-full mb-3 overflow-hidden">
                <div className="bg-white h-full w-3/4 animate-pulse"></div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{currentActiveStory.avatar}</span>
                  <div>
                    <div className="font-bold text-sm leading-tight">{currentActiveStory.author}</div>
                    <div className="text-[10px] text-white/70">{currentActiveStory.time}</div>
                  </div>
                </div>
                <button 
                  onClick={() => setActiveStoryIndex(null)}
                  className="p-1 rounded-full hover:bg-black/20 text-white transition"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Story Text */}
            <div className="text-center px-4 my-auto">
              <h3 className="text-xs uppercase tracking-widest text-white/70 font-bold mb-2">
                {currentActiveStory.title}
              </h3>
              <p className="font-serif text-lg leading-relaxed font-bold">
                "{currentActiveStory.text}"
              </p>
              {currentActiveStory.verse && (
                <div className="mt-4 inline-block font-sans text-xs bg-black/40 px-3 py-1 rounded-full border border-white/30">
                  📖 {currentActiveStory.verse}
                </div>
              )}
            </div>

            {/* Interactive footer */}
            <div className="flex items-center justify-between pt-3 border-t border-white/20">
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => {
                    onShareToChat?.(`✨ *Status from ${currentActiveStory.author}*:\n"${currentActiveStory.text}"\n📖 ${currentActiveStory.verse || ''}`);
                    setActiveStoryIndex(null);
                  }}
                  className="px-3 py-1 rounded-full bg-white/20 hover:bg-white/30 text-xs font-semibold backdrop-blur-sm"
                >
                  Reply Amen
                </button>
              </div>

              {/* Prev / Next buttons */}
              <div className="flex items-center gap-1">
                <button
                  disabled={activeStoryIndex === 0}
                  onClick={() => setActiveStoryIndex(Math.max(0, activeStoryIndex - 1))}
                  className="p-1.5 rounded-full bg-black/20 hover:bg-black/40 disabled:opacity-30"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  disabled={activeStoryIndex === statuses.length - 1}
                  onClick={() => setActiveStoryIndex(Math.min(statuses.length - 1, activeStoryIndex + 1))}
                  className="p-1.5 rounded-full bg-black/20 hover:bg-black/40 disabled:opacity-30"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Status Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-3">
          <div className="bg-white dark:bg-[#111b21] w-full max-w-md rounded-2xl shadow-xl overflow-hidden p-5 space-y-4">
            <h3 className="font-bold text-base text-[#111b21] dark:text-[#e9edef]">
              Post Status Update to JCRGM
            </h3>
            
            <form onSubmit={handlePostStatus} className="space-y-3 text-xs">
              <div>
                <label className="block font-medium mb-1 text-gray-600 dark:text-gray-300">
                  Your Rhema Message / Testimony
                </label>
                <textarea
                  rows={3}
                  required
                  value={newStatusText}
                  onChange={(e) => setNewStatusText(e.target.value)}
                  placeholder="Share what God laid on your heart today..."
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-[#202c33] focus:outline-none focus:ring-1 focus:ring-[#008069]"
                />
              </div>

              <div>
                <label className="block font-medium mb-1 text-gray-600 dark:text-gray-300">
                  Scripture Anchor (Optional)
                </label>
                <input
                  type="text"
                  value={newStatusVerse}
                  onChange={(e) => setNewStatusVerse(e.target.value)}
                  placeholder="e.g. Psalm 121:1-2"
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-[#202c33] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-medium mb-1 text-gray-600 dark:text-gray-300">
                  Background Theme
                </label>
                <div className="flex gap-2">
                  {gradients.map((g) => (
                    <button
                      key={g.class}
                      type="button"
                      onClick={() => setNewGradient(g.class)}
                      className={`h-8 flex-1 rounded-lg bg-gradient-to-br ${g.class} border-2 ${
                        newGradient === g.class ? 'border-white ring-2 ring-[#008069]' : 'border-transparent'
                      }`}
                      title={g.label}
                    />
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#008069] text-white font-bold rounded-lg hover:bg-[#006e58]"
                >
                  Publish Status
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
