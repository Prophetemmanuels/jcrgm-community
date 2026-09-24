import React, { useState } from 'react';
import { 
  BookOpen, Search, Bookmark, Share2, Copy, Sparkles, 
  ChevronRight, ArrowLeft, Heart, Check
} from 'lucide-react';
import { BIBLE_BOOKS, BIBLE_SAMPLE_CHAPTERS } from '../churchData';

export default function BibleReaderView({ onShareVerse }) {
  const [selectedBook, setSelectedBook] = useState('Psalms');
  const [selectedChapter, setSelectedChapter] = useState(23);
  const [searchFilter, setSearchFilter] = useState('');
  const [copiedVerse, setCopiedVerse] = useState(null);
  const [savedVerses, setSavedVerses] = useState([]);

  const currentPassageKey = `${selectedBook} ${selectedChapter}`;
  const verses = BIBLE_SAMPLE_CHAPTERS[currentPassageKey] || [
    { v: 1, text: 'For the LORD is good; His mercy is everlasting, and His truth endures to all generations.' },
    { v: 2, text: 'The Lord will give strength unto His people; the Lord will bless His people with peace.' },
    { v: 3, text: 'Trust in the LORD with all your heart, and lean not on your own understanding; in all your ways acknowledge Him, and He shall direct your paths.' },
    { v: 4, text: 'Call to Me, and I will answer you, and show you great and mighty things, which you do not know.' }
  ];

  const handleCopy = (verseObj) => {
    const text = `"${verseObj.text}" — ${selectedBook} ${selectedChapter}:${verseObj.v} (NKJV) | JCRGM Community`;
    navigator.clipboard?.writeText(text);
    setCopiedVerse(verseObj.v);
    setTimeout(() => setCopiedVerse(null), 2000);
  };

  const toggleBookmark = (verseObj) => {
    const key = `${selectedBook} ${selectedChapter}:${verseObj.v}`;
    if (savedVerses.includes(key)) {
      setSavedVerses(savedVerses.filter(k => k !== key));
    } else {
      setSavedVerses([...savedVerses, key]);
    }
  };

  const filteredBooks = BIBLE_BOOKS.filter(b => 
    b.name.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div className="h-full flex flex-col bg-white dark:bg-[#111b21] text-[#111b21] dark:text-[#e9edef] overflow-hidden">
      {/* Top Bible Toolbar */}
      <div className="p-3 bg-[#f0f2f5] dark:bg-[#202c33] border-b border-gray-200 dark:border-gray-800 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#008069] text-white flex items-center justify-center font-bold">
            <BookOpen size={18} />
          </div>
          <div>
            <h2 className="font-bold text-sm leading-tight flex items-center gap-1.5">
              Holy Scripture (NKJV)
              <span className="text-[10px] bg-emerald-100 dark:bg-emerald-950 text-[#008069] dark:text-[#25d366] px-1.5 py-0.5 rounded font-medium">
                Rhema Study
              </span>
            </h2>
            <p className="text-gray-500 text-[11px]">The Living Word of God</p>
          </div>
        </div>

        {/* Current Reference Selector */}
        <div className="flex items-center gap-1.5">
          <select 
            value={selectedBook}
            onChange={(e) => {
              setSelectedBook(e.target.value);
              // Pick an available sample chapter or fallback to 1
              if (e.target.value === 'Psalms') setSelectedChapter(23);
              else if (e.target.value === 'John') setSelectedChapter(14);
              else if (e.target.value === 'Philippians') setSelectedChapter(4);
              else if (e.target.value === 'Romans') setSelectedChapter(8);
              else setSelectedChapter(1);
            }}
            className="text-xs font-semibold bg-white dark:bg-[#111b21] border border-gray-300 dark:border-gray-700 rounded-lg px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#008069]"
          >
            {BIBLE_BOOKS.map(b => (
              <option key={b.name} value={b.name}>{b.name}</option>
            ))}
          </select>

          <span className="text-gray-400 font-bold">:</span>

          <input
            type="number"
            min={1}
            max={150}
            value={selectedChapter}
            onChange={(e) => setSelectedChapter(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-14 text-xs font-semibold bg-white dark:bg-[#111b21] border border-gray-300 dark:border-gray-700 rounded-lg px-2 py-1.5 text-center focus:outline-none focus:ring-1 focus:ring-[#008069]"
          />
        </div>
      </div>

      {/* Main Body */}
      <div className="flex-1 flex overflow-hidden">
        {/* Quick Chapter side navigator */}
        <div className="w-48 hidden md:flex flex-col border-r border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#0c1317] p-2 overflow-y-auto">
          <div className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-2 px-1">
            Featured Scripture
          </div>
          {[
            { book: 'Psalms', ch: 23, title: 'The Good Shepherd' },
            { book: 'John', ch: 14, title: 'The Way, Truth & Life' },
            { book: 'Philippians', ch: 4, title: 'Rejoice in the Lord' },
            { book: 'Romans', ch: 8, title: 'More than Conquerors' },
          ].map((item) => (
            <button
              key={item.book + item.ch}
              onClick={() => { setSelectedBook(item.book); setSelectedChapter(item.ch); }}
              className={`p-2 text-left rounded-lg text-xs mb-1 transition flex flex-col ${
                selectedBook === item.book && selectedChapter === item.ch
                  ? 'bg-emerald-100 dark:bg-emerald-950/60 text-[#008069] dark:text-[#25d366] font-bold'
                  : 'hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
              }`}
            >
              <span>{item.book} {item.ch}</span>
              <span className="text-[10px] opacity-75 font-normal">{item.title}</span>
            </button>
          ))}

          <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-800">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 px-1">
              Search Book
            </span>
            <input 
              type="text" 
              placeholder="Filter book..." 
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="mt-1 w-full text-xs p-1.5 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#111b21] focus:outline-none"
            />
            <div className="mt-2 space-y-0.5 max-h-48 overflow-y-auto">
              {filteredBooks.slice(0, 8).map(b => (
                <button
                  key={b.name}
                  onClick={() => setSelectedBook(b.name)}
                  className="w-full text-left px-2 py-1 text-xs rounded hover:bg-gray-200 dark:hover:bg-gray-800 truncate"
                >
                  {b.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Verses Reading Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 max-w-2xl mx-auto">
          {/* Chapter Banner */}
          <div className="border-b border-gray-200 dark:border-gray-800 pb-3 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-serif font-bold text-[#008069] dark:text-[#25d366]">
                {selectedBook} Chapter {selectedChapter}
              </h1>
              <p className="text-xs text-gray-500">New King James Version (NKJV) • JCRGM Scripture Repository</p>
            </div>
            <button 
              onClick={() => {
                const allText = verses.map(v => `${v.v}. ${v.text}`).join(' ');
                onShareVerse?.(`📖 *${selectedBook} ${selectedChapter}*\n${allText}`);
              }}
              className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 bg-[#008069] text-white rounded-lg hover:bg-[#006e58] transition"
              title="Share entire chapter to community chat"
            >
              <Share2 size={13} />
              Share Chapter
            </button>
          </div>

          {/* Verses List */}
          <div className="space-y-3 font-serif leading-relaxed text-sm sm:text-base">
            {verses.map((verse) => {
              const verseRef = `${selectedBook} ${selectedChapter}:${verse.v}`;
              const isSaved = savedVerses.includes(verseRef);

              return (
                <div 
                  key={verse.v}
                  className="group relative p-2.5 rounded-xl hover:bg-emerald-50/60 dark:hover:bg-[#202c33]/50 transition border border-transparent hover:border-emerald-200 dark:hover:border-emerald-900/40"
                >
                  <p>
                    <sup className="text-xs font-bold text-[#008069] dark:text-[#25d366] font-sans mr-2 select-none">
                      {verse.v}
                    </sup>
                    <span>{verse.text}</span>
                  </p>

                  {/* Hover action toolbar for verse */}
                  <div className="opacity-0 group-hover:opacity-100 transition mt-2 flex items-center gap-2 font-sans text-xs">
                    <button
                      onClick={() => handleCopy(verse)}
                      className="px-2 py-1 rounded bg-white dark:bg-[#2a3942] border border-gray-200 dark:border-gray-700 flex items-center gap-1 hover:text-[#008069] shadow-xs"
                    >
                      {copiedVerse === verse.v ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
                      {copiedVerse === verse.v ? 'Copied' : 'Copy'}
                    </button>
                    
                    <button
                      onClick={() => toggleBookmark(verse)}
                      className={`px-2 py-1 rounded border flex items-center gap-1 shadow-xs ${
                        isSaved 
                          ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 text-amber-600'
                          : 'bg-white dark:bg-[#2a3942] border-gray-200 dark:border-gray-700 hover:text-amber-500'
                      }`}
                    >
                      <Bookmark size={12} className={isSaved ? 'fill-amber-500' : ''} />
                      {isSaved ? 'Saved' : 'Bookmark'}
                    </button>

                    <button
                      onClick={() => {
                        const formatted = `📖 *${selectedBook} ${selectedChapter}:${verse.v}*\n"${verse.text}"\n— JCRGM Rhema Word`;
                        onShareVerse?.(formatted);
                      }}
                      className="px-2 py-1 rounded bg-[#008069] text-white flex items-center gap-1 hover:bg-[#006e58] shadow-xs"
                    >
                      <Share2 size={12} />
                      Send to Chat
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Daily Rhema Reflection */}
          <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40 rounded-xl p-4 text-xs font-sans space-y-2 mt-6">
            <div className="flex items-center gap-1.5 font-bold text-amber-800 dark:text-amber-300">
              <Sparkles size={16} /> Pastoral Rhema Meditation
            </div>
            <p className="text-amber-900/80 dark:text-amber-200/80 leading-relaxed">
              "Thy word is a lamp unto my feet, and a light unto my path" (Psalm 119:105). Take 3 minutes in quiet prayer right now. Re-read verse 1 slowly, confess it out loud, and thank the Lord for His enduring faithfulness.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
