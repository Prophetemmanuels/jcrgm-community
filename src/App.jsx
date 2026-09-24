import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageSquare, Users, BookOpen, Calendar, Radio, Heart, 
  Flame, Search, Send, Smile, Paperclip, MoreVertical, 
  Phone, Video, ShieldCheck, CheckCheck, Moon, Sun, 
  Sparkles, Check, Pin, Bell, Mic, Volume2, Share2, 
  ChevronDown, Image, FileText, CornerDownRight
} from 'lucide-react';
import confetti from 'canvas-confetti';

import { 
  INITIAL_CHANNELS, 
  INITIAL_MESSAGES, 
  BIBLE_SAMPLE_CHAPTERS 
} from './churchData';

import ChannelInfoModal from './components/ChannelInfoModal';
import GivingModal from './components/GivingModal';
import BibleReaderView from './components/BibleReaderView';
import SermonsView from './components/SermonsView';
import EventsView from './components/EventsView';
import StatusStoriesView from './components/StatusStoriesView';
import AudioPrayerLineModal from './components/AudioPrayerLineModal';
import PrayerSanctuaryModal from './components/PrayerSanctuaryModal';
import InstallPromptModal from './components/InstallPromptModal';

export default function App() {
  // Navigation tabs: 'chats', 'status', 'bible', 'sermons', 'events'
  const [activeTab, setActiveTab] = useState('chats');
  const [selectedChannelId, setSelectedChannelId] = useState('announcements');
  const [channels, setChannels] = useState(INITIAL_CHANNELS);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showChannelInfo, setShowChannelInfo] = useState(false);
  const [showGivingModal, setShowGivingModal] = useState(false);
  const [showCallModal, setShowCallModal] = useState(false);
  const [callType, setCallType] = useState('audio');
  const [showPrayerModal, setShowPrayerModal] = useState(false);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState('All');
  const [isRecordingAudio, setIsRecordingAudio] = useState(false);

  const messagesEndRef = useRef(null);

  // Auto-scroll chat to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, selectedChannelId, activeTab]);

  // Active channel object
  const activeChannel = channels.find(c => c.id === selectedChannelId) || channels[0];
  const currentMessages = messages[selectedChannelId] || [];

  // Filter channels based on search and category tab
  const filteredChannels = channels.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          c.subtitle.toLowerCase().includes(searchTerm.toLowerCase());
    if (!matchesSearch) return false;
    if (activeCategoryFilter === 'All') return true;
    return c.category === activeCategoryFilter;
  });

  // Sending message handler
  const handleSendMessage = (e) => {
    e?.preventDefault();
    if (!inputText.trim()) return;

    const newMsg = {
      id: 'm-' + Date.now(),
      sender: 'You (Saint)',
      senderRole: 'Member',
      avatar: '🕊️',
      isLeadership: false,
      timestamp: 'Just now',
      content: inputText,
      reactions: { '🙏': 1 },
      isMine: true
    };

    const updated = {
      ...messages,
      [selectedChannelId]: [...(messages[selectedChannelId] || []), newMsg]
    };

    setMessages(updated);
    setInputText('');

    // Update channel snippet
    setChannels(prev => prev.map(ch => {
      if (ch.id === selectedChannelId) {
        return {
          ...ch,
          lastMessageTime: 'Just now',
          subtitle: `You: ${inputText.slice(0, 30)}...`
        };
      }
      return ch;
    }));

    // Trigger subtle amen celebration if "amen" is typed
    if (/amen|hallelujah|glory|praise/i.test(inputText)) {
      try {
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.8 }
        });
      } catch {}
    }
  };

  // Quick reaction toggle (Amen, Heart, Fire, etc.)
  const handleToggleReaction = (msgId, emoji) => {
    const channelMsgs = messages[selectedChannelId] || [];
    const updatedMsgs = channelMsgs.map(msg => {
      if (msg.id === msgId) {
        const reactions = { ...(msg.reactions || {}) };
        reactions[emoji] = (reactions[emoji] || 0) + 1;
        return { ...msg, reactions };
      }
      return msg;
    });

    setMessages({
      ...messages,
      [selectedChannelId]: updatedMsgs
    });
  };

  // Pray / Amen for prayer request counter
  const handleAmenPrayer = (msgId) => {
    const channelMsgs = messages[selectedChannelId] || [];
    const updatedMsgs = channelMsgs.map(msg => {
      if (msg.id === msgId) {
        return {
          ...msg,
          prayerCount: (msg.prayerCount || 0) + 1,
          hasPrayed: true
        };
      }
      return msg;
    });

    setMessages({
      ...messages,
      [selectedChannelId]: updatedMsgs
    });

    try {
      confetti({ particleCount: 35, spread: 50, origin: { y: 0.7 } });
    } catch {}
  };

  // Quick verse insertion into chat from Bible or Sermon tool
  const handleShareToCurrentChat = (shareText) => {
    setActiveTab('chats');
    setInputText(shareText);
  };

  // Add prayer request to prayer channel
  const handleAltarPrayerSubmit = (petitionText, urgency) => {
    const newPrayerMsg = {
      id: 'm-prayer-' + Date.now(),
      sender: 'You (Intercession Partner)',
      senderRole: 'Member',
      avatar: '🕊️',
      isLeadership: false,
      timestamp: 'Just now',
      content: petitionText,
      prayerCount: 1,
      isPrayerRequest: true,
      urgency: urgency,
      reactions: { '🙏': 1, '🔥': 1 },
      isMine: true
    };

    setMessages(prev => ({
      ...prev,
      'prayer-requests': [...(prev['prayer-requests'] || []), newPrayerMsg]
    }));

    setSelectedChannelId('prayer-requests');
    setActiveTab('chats');
  };

  // Simulate audio voice note recording
  const handleToggleAudioRecord = () => {
    if (isRecordingAudio) {
      setIsRecordingAudio(false);
      // Post a voice note message
      const audioMsg = {
        id: 'm-voice-' + Date.now(),
        sender: 'You (Saint)',
        senderRole: 'Member',
        avatar: '🕊️',
        isLeadership: false,
        timestamp: 'Just now',
        content: '🎙️ Spoken Prayer / Audio Testimony (0:24)',
        isVoiceNote: true,
        reactions: { '🙏': 2, '❤️': 1 },
        isMine: true
      };
      setMessages(prev => ({
        ...prev,
        [selectedChannelId]: [...(prev[selectedChannelId] || []), audioMsg]
      }));
    } else {
      setIsRecordingAudio(true);
    }
  };

  return (
    <div className={`w-screen h-screen flex flex-col font-sans select-none overflow-hidden ${isDarkMode ? 'dark bg-[#0b141a]' : 'bg-[#d1d7db]'}`}>
      
      {/* WhatsApp Green Top Accent Bar */}
      <div className="h-2.5 bg-[#00a884] shrink-0"></div>

      {/* Main Container Envelope */}
      <div className="flex-1 max-w-[1700px] w-full mx-auto flex overflow-hidden shadow-2xl relative bg-white dark:bg-[#111b21]">
        
        {/* ================= LEFT SIDEBAR (CHANNELS & COMMUNITY DIRECTORY) ================= */}
        <aside className="w-full sm:w-96 md:w-[420px] shrink-0 border-r border-gray-200 dark:border-gray-800 flex flex-col bg-white dark:bg-[#111b21] h-full z-20">
          
          {/* Header Bar */}
          <div className="p-3 bg-[#f0f2f5] dark:bg-[#202c33] border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-full bg-[#008069] flex items-center justify-center text-white shadow-sm ring-2 ring-emerald-400">
                <span className="text-xl font-bold">✝</span>
              </div>
              <div>
                <h1 className="font-bold text-sm tracking-tight text-[#111b21] dark:text-[#e9edef] leading-tight">
                  The JCRGM Community
                </h1>
                <p className="text-[11px] text-[#008069] dark:text-[#25d366] font-semibold flex items-center gap-1">
                  <ShieldCheck size={12} /> Jesus Christ Reigns Gospel Ministry
                </p>
              </div>
            </div>

            {/* Top Control Icons */}
            <div className="flex items-center gap-1 text-gray-600 dark:text-gray-300">
              <button 
                onClick={() => setShowGivingModal(true)}
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-emerald-600 dark:text-emerald-400 transition"
                title="Kingdom Giving & Tithes"
              >
                <Heart size={18} className="fill-emerald-600/20" />
              </button>

              <button 
                onClick={() => setShowPrayerModal(true)}
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-rose-500 transition"
                title="Post Prayer Request"
              >
                <Flame size={18} />
              </button>

              <button 
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                title={isDarkMode ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
              >
                {isDarkMode ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} />}
              </button>
            </div>
          </div>

          {/* WhatsApp-Style Navigation Tabs (Chats, Status/Stories, Bible, Sermons, Events) */}
          <div className="bg-[#f0f2f5] dark:bg-[#202c33] px-2 border-b border-gray-200 dark:border-gray-800 flex items-center justify-around text-xs font-semibold">
            <button
              onClick={() => setActiveTab('chats')}
              className={`py-2.5 px-3 flex items-center gap-1.5 border-b-2 transition ${
                activeTab === 'chats'
                  ? 'border-[#008069] text-[#008069] dark:text-[#25d366]'
                  : 'border-transparent text-gray-500 hover:text-gray-800 dark:hover:text-gray-200'
              }`}
            >
              <MessageSquare size={15} />
              Fellowship
            </button>

            <button
              onClick={() => setActiveTab('status')}
              className={`py-2.5 px-3 flex items-center gap-1.5 border-b-2 transition relative ${
                activeTab === 'status'
                  ? 'border-[#008069] text-[#008069] dark:text-[#25d366]'
                  : 'border-transparent text-gray-500 hover:text-gray-800 dark:hover:text-gray-200'
              }`}
            >
              <Sparkles size={15} />
              Status
              <span className="w-2 h-2 rounded-full bg-[#25d366]"></span>
            </button>

            <button
              onClick={() => setActiveTab('bible')}
              className={`py-2.5 px-3 flex items-center gap-1.5 border-b-2 transition ${
                activeTab === 'bible'
                  ? 'border-[#008069] text-[#008069] dark:text-[#25d366]'
                  : 'border-transparent text-gray-500 hover:text-gray-800 dark:hover:text-gray-200'
              }`}
            >
              <BookOpen size={15} />
              Bible
            </button>

            <button
              onClick={() => setActiveTab('sermons')}
              className={`py-2.5 px-3 flex items-center gap-1.5 border-b-2 transition ${
                activeTab === 'sermons'
                  ? 'border-[#008069] text-[#008069] dark:text-[#25d366]'
                  : 'border-transparent text-gray-500 hover:text-gray-800 dark:hover:text-gray-200'
              }`}
            >
              <Radio size={15} />
              Pulpit
            </button>

            <button
              onClick={() => setActiveTab('events')}
              className={`py-2.5 px-3 flex items-center gap-1.5 border-b-2 transition ${
                activeTab === 'events'
                  ? 'border-[#008069] text-[#008069] dark:text-[#25d366]'
                  : 'border-transparent text-gray-500 hover:text-gray-800 dark:hover:text-gray-200'
              }`}
            >
              <Calendar size={15} />
              Events
            </button>
          </div>

          {/* Quick Filter Pill Categories */}
          <div className="p-2 border-b border-gray-100 dark:border-gray-800 flex items-center gap-1 overflow-x-auto text-[11px] no-scrollbar">
            {['All', 'Official', 'Worship', 'Spiritual Life', 'Departments', 'Pastoral'].map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategoryFilter(cat)}
                className={`px-2.5 py-1 rounded-full whitespace-nowrap transition font-medium ${
                  activeCategoryFilter === cat
                    ? 'bg-[#008069] text-white shadow-xs'
                    : 'bg-gray-100 dark:bg-[#202c33] text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="p-2">
            <div className="relative flex items-center">
              <Search size={16} className="absolute left-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search fellowship rooms, sermons, brethren..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#f0f2f5] dark:bg-[#202c33] text-xs text-[#111b21] dark:text-[#e9edef] rounded-lg pl-9 pr-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#008069]"
              />
            </div>
          </div>

          {/* Channels & Rooms List */}
          <div className="flex-1 overflow-y-auto divide-y divide-gray-100 dark:divide-gray-800/50">
            {filteredChannels.map((channel) => {
              const isSelected = selectedChannelId === channel.id && activeTab === 'chats';

              return (
                <div
                  key={channel.id}
                  onClick={() => {
                    setSelectedChannelId(channel.id);
                    setActiveTab('chats');
                  }}
                  className={`flex items-center gap-3 p-3 cursor-pointer transition select-none ${
                    isSelected
                      ? 'bg-[#f0f2f5] dark:bg-[#2a3942]'
                      : 'hover:bg-gray-50 dark:hover:bg-[#202c33]'
                  }`}
                >
                  {/* Channel Avatar */}
                  <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center text-2xl shrink-0 shadow-xs relative">
                    {channel.avatar}
                    {channel.isOfficial && (
                      <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-blue-500 rounded-full border-2 border-white dark:border-[#111b21] flex items-center justify-center text-[8px] text-white font-bold">
                        ✓
                      </span>
                    )}
                  </div>

                  {/* Channel Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <h3 className="font-semibold text-xs sm:text-sm text-[#111b21] dark:text-[#e9edef] truncate">
                        {channel.name}
                      </h3>
                      <span className="text-[10px] text-gray-400 font-medium">
                        {channel.lastMessageTime}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate pr-2">
                        {channel.subtitle}
                      </p>
                      {channel.unread > 0 && (
                        <span className="shrink-0 bg-[#25d366] text-white dark:text-black font-bold text-[10px] rounded-full h-4 min-w-[16px] px-1 flex items-center justify-center">
                          {channel.unread}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            {filteredChannels.length === 0 && (
              <div className="p-8 text-center text-xs text-gray-400">
                No fellowship rooms found matching "{searchTerm}"
              </div>
            )}
          </div>

          {/* Bottom Quick Tithe / Praise Bar */}
          <div className="p-3 bg-[#f0f2f5] dark:bg-[#202c33] border-t border-gray-200 dark:border-gray-800 flex items-center justify-between">
            <button
              onClick={() => setShowGivingModal(true)}
              className="flex-1 flex items-center justify-center gap-2 py-2 bg-[#008069] hover:bg-[#006e58] text-white text-xs font-bold rounded-xl shadow-xs transition"
            >
              <Heart size={14} className="fill-white" />
              Sow Kingdom Seed / Tithe
            </button>
          </div>
        </aside>

        {/* ================= RIGHT MAIN WORKSPACE ================= */}
        <main className="flex-1 flex flex-col h-full bg-[#efeae2] dark:bg-[#0b141a] overflow-hidden relative">
          
          {/* VIEW SWITCHER */}
          {activeTab === 'bible' ? (
            <BibleReaderView onShareVerse={handleShareToCurrentChat} />
          ) : activeTab === 'sermons' ? (
            <SermonsView onShareSermon={handleShareToCurrentChat} />
          ) : activeTab === 'events' ? (
            <EventsView onShareEvent={handleShareToCurrentChat} />
          ) : activeTab === 'status' ? (
            <StatusStoriesView onShareToChat={handleShareToCurrentChat} />
          ) : (
            /* ================= ACTIVE FELLOWSHIP CHAT ROOM ================= */
            <div className="h-full flex flex-col overflow-hidden">
              
              {/* Chat Header */}
              <div className="p-3 bg-[#f0f2f5] dark:bg-[#202c33] border-b border-gray-200 dark:border-gray-800 flex items-center justify-between z-10">
                <div 
                  onClick={() => setShowChannelInfo(true)}
                  className="flex items-center gap-3 cursor-pointer hover:opacity-90 transition"
                >
                  <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center text-xl shrink-0">
                    {activeChannel.avatar}
                  </div>
                  <div>
                    <h2 className="font-bold text-sm text-[#111b21] dark:text-[#e9edef] flex items-center gap-1.5 leading-tight">
                      {activeChannel.name}
                      {activeChannel.isOfficial && (
                        <span className="text-[10px] bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300 px-1.5 py-0.2 rounded font-semibold">
                          Official JCRGM
                        </span>
                      )}
                    </h2>
                    <p className="text-[11px] text-gray-500 dark:text-gray-400">
                      {activeChannel.membersCount} saints enrolled • Tap for details & guidelines
                    </p>
                  </div>
                </div>

                {/* Call & Intercession shortcuts */}
                <div className="flex items-center gap-1 text-gray-600 dark:text-gray-300">
                  <button
                    onClick={() => { setCallType('video'); setShowCallModal(true); }}
                    className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                    title="Start Live Video Fellowship"
                  >
                    <Video size={19} />
                  </button>
                  <button
                    onClick={() => { setCallType('audio'); setShowCallModal(true); }}
                    className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                    title="Join Audio Prayer Line"
                  >
                    <Phone size={18} />
                  </button>
                  <button
                    onClick={() => setShowChannelInfo(true)}
                    className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                    title="Channel Info"
                  >
                    <MoreVertical size={19} />
                  </button>
                </div>
              </div>

              {/* Chat Messages Scroll Container */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3 chat-doodle-bg">
                {/* Security and spiritual encryption notice */}
                <div className="max-w-md mx-auto text-center my-2">
                  <div className="inline-flex items-center gap-1.5 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 text-amber-800 dark:text-amber-200 px-3 py-1.5 rounded-lg text-xs shadow-xs">
                    <ShieldCheck size={14} className="shrink-0 text-amber-600" />
                    <span>
                      Fellowship under pastoral grace. All prayers & messages in this sanctuary are kept in reverence.
                    </span>
                  </div>
                </div>

                {/* Messages List */}
                {currentMessages.map((msg) => {
                  const isMine = msg.isMine;

                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${isMine ? 'items-end' : 'items-start'} group`}
                    >
                      {/* Bubble */}
                      <div
                        className={`relative max-w-lg rounded-2xl p-3 shadow-xs text-xs sm:text-sm ${
                          isMine
                            ? 'bg-[#d9fdd3] dark:bg-[#005c4b] text-[#111b21] dark:text-[#e9edef] rounded-tr-xs'
                            : 'bg-white dark:bg-[#202c33] text-[#111b21] dark:text-[#e9edef] rounded-tl-xs'
                        } ${msg.urgency === 'High' ? 'ring-2 ring-rose-500' : ''}`}
                      >
                        {/* Sender info if group */}
                        {!isMine && (
                          <div className="flex items-center gap-1.5 mb-1">
                            <span className="text-base">{msg.avatar}</span>
                            <span className="font-bold text-xs text-[#008069] dark:text-[#25d366]">
                              {msg.sender}
                            </span>
                            {msg.senderRole && (
                              <span className="text-[9px] bg-emerald-100 dark:bg-emerald-950 text-[#008069] dark:text-[#25d366] px-1.5 py-0.2 rounded font-medium">
                                {msg.senderRole}
                              </span>
                            )}
                          </div>
                        )}

                        {/* Pinned banner */}
                        {msg.pinned && (
                          <div className="flex items-center gap-1 text-[10px] font-bold text-amber-700 dark:text-amber-300 mb-1.5">
                            <Pin size={10} /> PINNED PASTORAL ADVISORY
                          </div>
                        )}

                        {/* Urgent Prayer Request Badge */}
                        {msg.isPrayerRequest && (
                          <div className="flex items-center justify-between gap-2 mb-2 p-1.5 rounded-lg bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300">
                            <span className="font-bold flex items-center gap-1 text-[11px]">
                              <Flame size={12} /> Altar Prayer Petition
                            </span>
                            <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.2 rounded bg-rose-200 dark:bg-rose-900 text-rose-900 dark:text-rose-100">
                              {msg.urgency || 'Urgent'}
                            </span>
                          </div>
                        )}

                        {/* Voice Note Simulation UI */}
                        {msg.isVoiceNote ? (
                          <div className="flex items-center gap-3 py-1">
                            <button className="w-8 h-8 rounded-full bg-[#008069] text-white flex items-center justify-center">
                              ▶
                            </button>
                            <div className="flex-1 space-y-1">
                              <div className="h-1.5 bg-gray-300 dark:bg-gray-700 rounded-full w-full overflow-hidden">
                                <div className="bg-[#008069] h-full w-2/5"></div>
                              </div>
                              <div className="text-[10px] text-gray-500 font-mono">0:14 / 0:24</div>
                            </div>
                          </div>
                        ) : (
                          /* Text Content */
                          <div className="whitespace-pre-wrap leading-relaxed">
                            {msg.content}
                          </div>
                        )}

                        {/* Prayer Intercession Count Bar */}
                        {msg.isPrayerRequest && (
                          <div className="mt-3 pt-2 border-t border-rose-100 dark:border-rose-900/60 flex items-center justify-between">
                            <span className="text-[11px] text-gray-500 flex items-center gap-1">
                              <Heart size={12} className="text-rose-500 fill-rose-500" />
                              <strong className="text-rose-600 dark:text-rose-400">{msg.prayerCount || 0}</strong> Brethren Interceding
                            </span>

                            <button
                              onClick={() => handleAmenPrayer(msg.id)}
                              className={`px-2.5 py-1 rounded-full text-[11px] font-bold flex items-center gap-1 transition ${
                                msg.hasPrayed 
                                  ? 'bg-rose-600 text-white shadow-xs' 
                                  : 'bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 hover:bg-rose-200'
                              }`}
                            >
                              <Flame size={12} />
                              {msg.hasPrayed ? 'Praying Amen!' : 'Stand in Agreement 🙏'}
                            </button>
                          </div>
                        )}

                        {/* Timestamp & Delivery status */}
                        <div className="flex items-center justify-end gap-1 mt-1 text-[10px] text-gray-400">
                          <span>{msg.timestamp}</span>
                          {isMine && <CheckCheck size={12} className="text-[#008069] dark:text-[#25d366]" />}
                        </div>

                        {/* Emoji Reactions Badges */}
                        {msg.reactions && Object.keys(msg.reactions).length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-1.5">
                            {Object.entries(msg.reactions).map(([emoji, count]) => (
                              <button
                                key={emoji}
                                onClick={() => handleToggleReaction(msg.id, emoji)}
                                className="px-1.5 py-0.5 rounded-full bg-gray-100 dark:bg-[#111b21] border border-gray-200 dark:border-gray-700 text-[11px] flex items-center gap-1 shadow-2xs hover:scale-105 transition"
                              >
                                <span>{emoji}</span>
                                <span className="font-semibold text-[10px] text-gray-600 dark:text-gray-300">
                                  {count}
                                </span>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Quick reaction hover toolbar */}
                      <div className="opacity-0 group-hover:opacity-100 transition flex items-center gap-1 mt-1 px-1">
                        {['🙏', '❤️', '🔥', '🙌', '💡'].map(emo => (
                          <button
                            key={emo}
                            onClick={() => handleToggleReaction(msg.id, emo)}
                            className="text-xs hover:scale-125 transition p-0.5"
                            title={`React ${emo}`}
                          >
                            {emo}
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}

                <div ref={messagesEndRef} />
              </div>

              {/* Chat Input Bar */}
              <div className="p-3 bg-[#f0f2f5] dark:bg-[#202c33] border-t border-gray-200 dark:border-gray-800">
                <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                  
                  {/* Emoji shortcut */}
                  <button
                    type="button"
                    onClick={() => setInputText(prev => prev + ' Amen! 🙌 ')}
                    className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition"
                    title="Insert Amen"
                  >
                    <Smile size={20} />
                  </button>

                  {/* Attachment menu */}
                  <button
                    type="button"
                    onClick={() => setShowPrayerModal(true)}
                    className="p-2 text-gray-500 hover:text-rose-500 transition"
                    title="Altar Prayer Petition"
                  >
                    <Flame size={20} />
                  </button>

                  {/* Scripture helper button */}
                  <button
                    type="button"
                    onClick={() => setActiveTab('bible')}
                    className="p-2 text-gray-500 hover:text-[#008069] transition"
                    title="Browse Holy Scripture"
                  >
                    <BookOpen size={20} />
                  </button>

                  {/* Text Input */}
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder={`Exhort the brethren in ${activeChannel.name}...`}
                    className="flex-1 bg-white dark:bg-[#2a3942] text-[#111b21] dark:text-[#e9edef] px-4 py-2.5 rounded-xl border border-transparent focus:border-[#008069] focus:outline-none text-xs sm:text-sm placeholder-gray-400"
                  />

                  {/* Audio Note Recorder */}
                  <button
                    type="button"
                    onClick={handleToggleAudioRecord}
                    className={`p-2.5 rounded-full transition ${
                      isRecordingAudio 
                        ? 'bg-red-500 text-white animate-pulse' 
                        : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                    }`}
                    title={isRecordingAudio ? 'Stop and send voice prayer' : 'Record voice note prayer'}
                  >
                    <Mic size={20} />
                  </button>

                  {/* Send Button */}
                  <button
                    type="submit"
                    disabled={!inputText.trim()}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition ${
                      inputText.trim()
                        ? 'bg-[#008069] hover:bg-[#006e58] text-white shadow-md'
                        : 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    <Send size={18} className={inputText.trim() ? 'translate-x-0.5' : ''} />
                  </button>
                </form>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ================= MODALS ================= */}
      {showChannelInfo && (
        <ChannelInfoModal 
          channel={activeChannel} 
          onClose={() => setShowChannelInfo(false)}
          onStartCall={(t) => {
            setShowChannelInfo(false);
            setCallType(t);
            setShowCallModal(true);
          }}
        />
      )}

      {showGivingModal && (
        <GivingModal onClose={() => setShowGivingModal(false)} />
      )}

      {showCallModal && (
        <AudioPrayerLineModal 
          channel={activeChannel}
          initialType={callType}
          onClose={() => setShowCallModal(false)} 
        />
      )}

      {showPrayerModal && (
        <PrayerSanctuaryModal 
          onClose={() => setShowPrayerModal(false)} 
          onSubmitPrayer={handleAltarPrayerSubmit}
        />
      )}

      {/* Auto Install App Prompt Modal on load */}
      <InstallPromptModal />

    </div>
  );
}
