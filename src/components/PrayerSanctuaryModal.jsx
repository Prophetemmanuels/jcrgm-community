import React, { useState } from 'react';
import { 
  Heart, HandHeart, Sparkles, Send, ShieldCheck, 
  CheckCircle, Plus, AlertCircle, Share2, Flame
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function PrayerSanctuaryModal({ onClose, onSubmitPrayer }) {
  const [topic, setTopic] = useState('');
  const [urgency, setUrgency] = useState('Medium');
  const [isConfidential, setIsConfidential] = useState(false);
  const [prayerTarget, setPrayerTarget] = useState('Healing');

  const categories = ['Healing & Health', 'Financial Breakthrough', 'Family & Marriage', 'Spiritual Deliverance', 'Academics & Career', 'General Thanksgiving'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!topic.trim()) return;

    const formattedRequest = `🙏 *PRAYER PETITION: [${prayerTarget.toUpperCase()}]*\nPriority: ${urgency}\n"${topic}"\n— Shared by Saint for Church Intercession.`;

    onSubmitPrayer(formattedRequest, urgency);
    try {
      confetti({ particleCount: 50, spread: 60 });
    } catch {}
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-3 backdrop-blur-xs">
      <div className="bg-white dark:bg-[#111b21] w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-red-800 to-rose-700 text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-xl">
              🔥
            </div>
            <div>
              <h2 className="font-bold text-base leading-tight">JCRGM Altar of Prayer</h2>
              <p className="text-white/80 text-xs">"The effective, fervent prayer of a righteous man avails much" (Jas 5:16)</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-black/20 text-white">
            ✕
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-5 overflow-y-auto space-y-4 text-xs sm:text-sm">
          {/* Category Picker */}
          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-2">
              Select Burden / Petition Category
            </label>
            <div className="grid grid-cols-2 gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setPrayerTarget(cat)}
                  className={`p-2 rounded-xl border text-left text-xs font-semibold transition ${
                    prayerTarget === cat
                      ? 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400'
                      : 'border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1">
              Your Petition / Prayer Request
            </label>
            <textarea
              rows={4}
              required
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Detail your request, scriptures you are standing on, and specific points you want the intercessors to agree with you on..."
              className="w-full p-3 bg-gray-50 dark:bg-[#202c33] border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-rose-500 text-xs sm:text-sm"
            />
          </div>

          {/* Urgency */}
          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1.5">
              Urgency Level
            </label>
            <div className="flex gap-2">
              {['Normal', 'Medium', 'High (Urgent Emergency)'].map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setUrgency(lvl)}
                  className={`flex-1 py-1.5 rounded-lg border text-xs font-semibold ${
                    urgency === lvl
                      ? 'bg-rose-600 text-white border-rose-600'
                      : 'border-gray-200 dark:border-gray-800'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          {/* Confidential Notice */}
          <div className="flex items-center gap-2 p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 rounded-xl">
            <ShieldCheck size={20} className="text-amber-600 shrink-0" />
            <div className="text-[11px] text-amber-800 dark:text-amber-200">
              Our 24-hour intercessory altar prays over every petition every morning & midnight vigil.
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 bg-rose-700 hover:bg-rose-800 text-white font-bold rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <Flame size={16} /> Lay Petition on the Altar
          </button>
        </form>
      </div>
    </div>
  );
}
