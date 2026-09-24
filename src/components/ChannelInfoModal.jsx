import React, { useState } from 'react';
import { 
  X, ShieldCheck, Heart, Sparkles, BookOpen, Clock, 
  MapPin, Phone, Users, Flame, Volume2, Calendar, Share2
} from 'lucide-react';

export default function ChannelInfoModal({ channel, onClose, onStartCall }) {
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-3 backdrop-blur-xs">
      <div className="bg-white dark:bg-[#111b21] w-full max-w-md rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-150">
        {/* Header with WhatsApp-like colored hero */}
        <div className="bg-[#008069] dark:bg-[#005c4b] p-5 text-white relative flex flex-col items-center">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-1 rounded-full hover:bg-black/20 text-white transition"
          >
            <X size={20} />
          </button>
          
          <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-4xl shadow-inner mb-3 border-2 border-white/40">
            {channel.avatar}
          </div>
          <h2 className="text-xl font-bold text-center px-4 flex items-center gap-2">
            {channel.name}
          </h2>
          <p className="text-white/80 text-xs mt-1 font-medium">{channel.subtitle}</p>
          
          <div className="flex items-center gap-4 mt-4">
            <button 
              onClick={() => onStartCall('audio')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/20 hover:bg-white/30 text-xs font-semibold backdrop-blur-sm transition"
            >
              <Phone size={14} /> Voice Devotion
            </button>
            <button 
              onClick={handleShare}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/20 hover:bg-white/30 text-xs font-semibold backdrop-blur-sm transition"
            >
              <Share2 size={14} /> {copied ? 'Link Copied!' : 'Invite Saints'}
            </button>
          </div>
        </div>

        {/* Scrollable details */}
        <div className="p-4 overflow-y-auto space-y-4 text-sm text-[#111b21] dark:text-[#e9edef]">
          {/* About / Description */}
          <div className="bg-[#f0f2f5] dark:bg-[#202c33] p-3 rounded-xl">
            <span className="text-xs uppercase tracking-wider text-[#008069] dark:text-[#25d366] font-bold block mb-1">
              Ministry Purpose & Vision
            </span>
            <p className="leading-relaxed text-xs sm:text-sm">{channel.description}</p>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-3 rounded-xl border border-gray-200 dark:border-gray-800 flex items-center gap-2.5">
              <Users className="text-[#008069] dark:text-[#25d366]" size={18} />
              <div>
                <div className="font-bold">{channel.membersCount} Brethren</div>
                <div className="text-gray-500 dark:text-gray-400 text-[11px]">Active Members</div>
              </div>
            </div>
            <div className="p-3 rounded-xl border border-gray-200 dark:border-gray-800 flex items-center gap-2.5">
              <ShieldCheck className="text-blue-500" size={18} />
              <div>
                <div className="font-bold">Verified Group</div>
                <div className="text-gray-500 dark:text-gray-400 text-[11px]">Under Pastoral Oversight</div>
              </div>
            </div>
          </div>

          {/* Guidelines */}
          <div className="border-t border-gray-100 dark:border-gray-800 pt-3">
            <h4 className="font-semibold text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
              Sanctuary Etiquette & Rules
            </h4>
            <ul className="space-y-1.5 text-xs text-gray-600 dark:text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-[#008069] font-bold">•</span>
                Let all things be done unto edifying, exhortation, and comfort (1 Cor 14:26).
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#008069] font-bold">•</span>
                No spam, unsolicited commerce, or unverified doctrines.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#008069] font-bold">•</span>
                Keep prayer requests respectful and guard confidential counseling.
              </li>
            </ul>
          </div>

          {/* Location & Church Office */}
          <div className="bg-emerald-50 dark:bg-emerald-950/40 p-3 rounded-xl border border-emerald-200 dark:border-emerald-800/50 text-xs">
            <div className="font-semibold text-emerald-900 dark:text-emerald-300 flex items-center gap-1.5">
              <MapPin size={14} /> Jesus Christ Reigns Gospel Ministry (JCRGM)
            </div>
            <p className="text-emerald-800 dark:text-emerald-400 mt-1">
              Cathedral of Grace & Victory • Weekly Services: Sun 8:30am & 10:45am • Wed 6:00pm
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-gray-200 dark:border-gray-800 bg-[#f0f2f5] dark:bg-[#111b21] flex justify-end">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-[#008069] hover:bg-[#006e58] text-white text-xs font-semibold rounded-lg transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
