import React, { useState } from 'react';
import { 
  Phone, PhoneOff, Mic, MicOff, Video, VideoOff, 
  Volume2, Users, Hand, MessageSquare, ShieldCheck 
} from 'lucide-react';

export default function AudioPrayerLineModal({ channel, onClose, initialType = 'audio' }) {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(initialType === 'video');
  const [isHandRaised, setIsHandRaised] = useState(false);
  const [callDuration, setCallDuration] = useState('04:18');

  const participants = [
    { name: 'Pastor David (Leader)', role: 'Host', isSpeaking: true, avatar: '👨‍💼' },
    { name: 'Deaconess Martha', role: 'Intercessor', isSpeaking: false, avatar: '👵🏾' },
    { name: 'Elder Matthew', role: 'Liturgy', isSpeaking: false, avatar: '🧔' },
    { name: 'You (Saint)', role: 'Participant', isSpeaking: !isMuted, avatar: '🕊️' }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-3 backdrop-blur-md">
      <div className="bg-[#111b21] border border-gray-800 text-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95">
        
        {/* Top bar */}
        <div className="p-4 bg-[#1f2c34] flex items-center justify-between border-b border-gray-800">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping"></div>
            <div>
              <h3 className="font-bold text-sm leading-tight flex items-center gap-1.5">
                {channel?.name || 'Sanctuary Prayer Line'}
              </h3>
              <p className="text-[11px] text-emerald-400 font-mono">
                LIVE INTERCESSION • {callDuration}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 bg-black/40 px-2.5 py-1 rounded-full text-xs text-gray-300">
            <Users size={13} /> 18 Brethren Online
          </div>
        </div>

        {/* Video / Avatar Grid Area */}
        <div className="p-6 flex-1 flex flex-col items-center justify-center min-h-[280px] bg-[#0b141a]">
          {isVideoOn ? (
            <div className="w-full h-56 bg-zinc-900 rounded-2xl relative overflow-hidden flex items-center justify-center border border-zinc-800">
              <div className="text-center">
                <div className="w-20 h-20 rounded-full bg-emerald-900/60 flex items-center justify-center text-4xl mx-auto mb-2 border-2 border-emerald-500">
                  👨‍💼
                </div>
                <div className="font-bold text-sm">Pastor David is Ministering</div>
                <div className="text-xs text-zinc-400">"Father, let Your fire fall upon every family..."</div>
              </div>
              <span className="absolute bottom-2 left-2 bg-black/60 px-2 py-0.5 rounded text-[10px] font-mono text-emerald-400">
                HD Audio & Video Encrypted
              </span>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
              {participants.map((p, i) => (
                <div 
                  key={i} 
                  className={`p-3 rounded-2xl bg-[#1f2c34] flex flex-col items-center text-center border relative ${
                    p.isSpeaking ? 'border-emerald-500 shadow-md ring-1 ring-emerald-500/50' : 'border-gray-800'
                  }`}
                >
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-2xl mb-1.5">
                    {p.avatar}
                  </div>
                  <span className="font-semibold text-xs leading-tight truncate w-full">{p.name}</span>
                  <span className="text-[10px] text-gray-400">{p.role}</span>
                  {p.isSpeaking && (
                    <span className="absolute top-2 right-2 text-[10px] bg-emerald-500 text-black font-bold px-1 rounded">
                      Speaking
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Scripture banner on bottom */}
          <div className="mt-4 bg-[#1f2c34]/70 px-4 py-2 rounded-xl text-center border border-gray-800">
            <span className="text-xs text-emerald-400 font-serif italic">
              "For where two or three are gathered together in my name, there am I in the midst of them."
            </span>
            <span className="block text-[10px] text-gray-400 mt-0.5 font-sans">Matthew 18:20</span>
          </div>
        </div>

        {/* Call Controls */}
        <div className="p-4 bg-[#1f2c34] flex items-center justify-center gap-4 border-t border-gray-800">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition ${
              isMuted ? 'bg-red-500/20 text-red-400 border border-red-500' : 'bg-gray-700 hover:bg-gray-600 text-white'
            }`}
            title={isMuted ? 'Unmute microphone' : 'Mute microphone'}
          >
            {isMuted ? <MicOff size={20} /> : <Mic size={20} />}
          </button>

          <button
            onClick={() => setIsVideoOn(!isVideoOn)}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition ${
              !isVideoOn ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-emerald-600 text-white'
            }`}
            title="Toggle video camera"
          >
            {isVideoOn ? <Video size={20} /> : <VideoOff size={20} />}
          </button>

          <button
            onClick={() => setIsHandRaised(!isHandRaised)}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition ${
              isHandRaised ? 'bg-amber-500 text-black' : 'bg-gray-700 hover:bg-gray-600 text-white'
            }`}
            title="Raise hand to pray or testify"
          >
            <Hand size={20} />
          </button>

          {/* End Call */}
          <button
            onClick={onClose}
            className="w-14 h-12 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center shadow-lg transition"
            title="Disconnect Prayer Line"
          >
            <PhoneOff size={22} />
          </button>
        </div>
      </div>
    </div>
  );
}
