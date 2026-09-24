import React, { useState } from 'react';
import { 
  Play, Pause, Headphones, Radio, Volume2, Sparkles, 
  Download, Clock, Calendar, Bookmark, Share2, Award, Heart
} from 'lucide-react';
import { SERMON_PODCASTS } from '../churchData';

export default function SermonsView({ onShareSermon }) {
  const [playingId, setPlayingId] = useState(null);
  const [activeTab, setActiveTab] = useState('recent'); // recent, live, series
  const [isLiveStreaming, setIsLiveStreaming] = useState(false);
  const [savedSermons, setSavedSermons] = useState([]);

  const togglePlay = (id) => {
    if (playingId === id) {
      setPlayingId(null);
    } else {
      setPlayingId(id);
    }
  };

  return (
    <div className="h-full flex flex-col bg-white dark:bg-[#111b21] text-[#111b21] dark:text-[#e9edef] overflow-y-auto">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#005c4b] to-[#008069] text-white p-5">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Radio className="animate-pulse text-amber-300" size={20} />
            <span className="text-xs font-bold tracking-wider uppercase bg-white/20 px-2 py-0.5 rounded-full">
              JCRGM Sanctuary Media
            </span>
          </div>
          <span className="text-xs bg-amber-400 text-black font-bold px-2 py-0.5 rounded-full">
            High Definition Audio
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold">Pulpit Rhema & Podcast Sermons</h2>
        <p className="text-white/80 text-xs sm:text-sm mt-1 max-w-xl">
          Listen to anointed messages by Senior Pastor David, guest apostles, and ministers. Feed your spirit anytime, anywhere.
        </p>

        {/* Live Audio Stream Banner */}
        <div className="mt-4 bg-black/30 backdrop-blur-sm rounded-xl p-3 flex flex-wrap items-center justify-between gap-3 border border-white/10">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-3 h-3 rounded-full bg-red-500 animate-ping absolute inset-0"></div>
              <div className="w-3 h-3 rounded-full bg-red-500 relative"></div>
            </div>
            <div>
              <div className="text-xs font-bold">JCRGM Online Radio / Live Broadcast</div>
              <div className="text-[11px] text-white/70">Broadcasting praise and sermons 24/7</div>
            </div>
          </div>
          <button
            onClick={() => setIsLiveStreaming(!isLiveStreaming)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition ${
              isLiveStreaming ? 'bg-red-600 text-white' : 'bg-white text-[#008069] hover:bg-white/90'
            }`}
          >
            {isLiveStreaming ? <Pause size={14} /> : <Play size={14} className="fill-current" />}
            {isLiveStreaming ? 'Streaming Live Now...' : 'Tune In Live'}
          </button>
        </div>
      </div>

      {/* Sermons List */}
      <div className="p-4 sm:p-6 max-w-3xl mx-auto w-full space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400">
            Recent Message Archive
          </h3>
          <span className="text-xs text-gray-400">3 Anointed Messages</span>
        </div>

        <div className="space-y-3">
          {SERMON_PODCASTS.map((sermon) => {
            const isPlaying = playingId === sermon.id;
            return (
              <div
                key={sermon.id}
                className={`p-4 rounded-2xl border transition-all ${
                  isPlaying 
                    ? 'border-[#008069] bg-emerald-50/50 dark:bg-emerald-950/20 shadow-md' 
                    : 'border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 bg-gray-50/50 dark:bg-[#1f2c34]/40'
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <button
                    onClick={() => togglePlay(sermon.id)}
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition shrink-0 ${
                      isPlaying
                        ? 'bg-[#008069] text-white shadow-md'
                        : 'bg-emerald-100 dark:bg-emerald-950/60 text-[#008069] dark:text-[#25d366] hover:scale-105'
                    }`}
                  >
                    {isPlaying ? <Pause size={20} /> : <Play size={20} className="fill-current ml-0.5" />}
                  </button>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-[#008069] dark:text-[#25d366]">
                        {sermon.category}
                      </span>
                      <span className="text-xs text-gray-400 font-mono flex items-center gap-1">
                        <Clock size={11} /> {sermon.duration}
                      </span>
                      <span className="text-xs text-gray-400 font-mono flex items-center gap-1">
                        <Calendar size={11} /> {sermon.date}
                      </span>
                    </div>

                    <h4 className="font-bold text-sm sm:text-base text-[#111b21] dark:text-[#e9edef] leading-snug">
                      {sermon.title}
                    </h4>
                    
                    <p className="text-xs text-[#008069] dark:text-[#25d366] font-semibold mt-0.5">
                      {sermon.preacher} • <span className="font-serif italic font-normal text-gray-500">{sermon.scripture}</span>
                    </p>

                    <p className="text-xs text-gray-600 dark:text-gray-300 mt-2 line-clamp-2">
                      {sermon.description}
                    </p>

                    {/* Fake Audio Waveform if playing */}
                    {isPlaying && (
                      <div className="mt-3 p-2 bg-white dark:bg-[#111b21] rounded-xl border border-gray-200 dark:border-gray-800 flex items-center gap-2">
                        <Volume2 size={16} className="text-[#008069] animate-bounce" />
                        <div className="flex-1 flex items-center gap-1 h-4">
                          {[30, 70, 45, 90, 60, 100, 40, 80, 50, 65, 30, 85, 95, 40, 60, 75, 45].map((h, i) => (
                            <div 
                              key={i} 
                              className="flex-1 bg-[#008069] rounded-full transition-all duration-300" 
                              style={{ height: `${h}%` }}
                            />
                          ))}
                        </div>
                        <span className="text-[10px] font-mono text-gray-500">14:20 / {sermon.duration}</span>
                      </div>
                    )}

                    {/* Action buttons */}
                    <div className="flex items-center gap-3 mt-3 pt-2 border-t border-gray-200/60 dark:border-gray-800 text-xs">
                      <button
                        onClick={() => {
                          onShareSermon?.(`🎙️ *Sermon Podcast*: "${sermon.title}"\nPreacher: ${sermon.preacher} (${sermon.scripture})\nAvailable now on JCRGM Audio Pulpit.`);
                        }}
                        className="flex items-center gap-1 text-gray-500 hover:text-[#008069] transition"
                      >
                        <Share2 size={13} /> Share in Fellowship
                      </button>
                      <button 
                        onClick={() => {
                          alert(`Downloading offline MP3: ${sermon.title}...`);
                        }}
                        className="flex items-center gap-1 text-gray-500 hover:text-[#008069] transition"
                      >
                        <Download size={13} /> Save Offline
                      </button>
                      <span className="text-[11px] text-gray-400 ml-auto">
                        🎧 {sermon.listens} listens
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
