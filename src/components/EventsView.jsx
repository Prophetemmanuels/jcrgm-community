import React, { useState } from 'react';
import { 
  Calendar, MapPin, Clock, Users, Plus, CheckCircle, 
  Sparkles, ExternalLink, Share2, Bell, BellRing
} from 'lucide-react';
import { UPCOMING_EVENTS } from '../churchData';

export default function EventsView({ onShareEvent }) {
  const [eventsList, setEventsList] = useState(UPCOMING_EVENTS);
  const [rsvpList, setRsvpList] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newTime, setNewTime] = useState('');
  const [newLocation, setNewLocation] = useState('Main Sanctuary');
  const [newTag, setNewTag] = useState('Fellowship');
  const [newDesc, setNewDesc] = useState('');

  const toggleRsvp = (id) => {
    if (rsvpList.includes(id)) {
      setRsvpList(rsvpList.filter(item => item !== id));
    } else {
      setRsvpList([...rsvpList, id]);
    }
  };

  const handleCreateEvent = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newEv = {
      id: 'ev-' + Date.now(),
      title: newTitle,
      time: newTime || 'Upcoming Saturday • 10:00 AM',
      location: newLocation,
      tag: newTag,
      badgeColor: 'bg-indigo-600',
      description: newDesc || 'Special church gathering and fellowship in the presence of the Lord.'
    };

    setEventsList([newEv, ...eventsList]);
    setShowAddModal(false);
    setNewTitle('');
    setNewDesc('');
  };

  return (
    <div className="h-full flex flex-col bg-white dark:bg-[#111b21] text-[#111b21] dark:text-[#e9edef] overflow-y-auto">
      {/* Header */}
      <div className="bg-[#f0f2f5] dark:bg-[#202c33] p-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-[#008069] text-white flex items-center justify-center">
            <Calendar size={18} />
          </div>
          <div>
            <h2 className="font-bold text-sm leading-tight">JCRGM Church Calendar & Services</h2>
            <p className="text-gray-500 text-xs">Stay synchronized with upcoming ministry events</p>
          </div>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-[#008069] hover:bg-[#006e58] text-white text-xs font-semibold rounded-lg transition cursor-pointer"
        >
          <Plus size={14} /> Announce Event
        </button>
      </div>

      {/* Events List */}
      <div className="p-4 sm:p-6 max-w-3xl mx-auto w-full space-y-4">
        {eventsList.map((ev) => {
          const isAttending = rsvpList.includes(ev.id);

          return (
            <div
              key={ev.id}
              className="bg-white dark:bg-[#1f2c34] border border-gray-200 dark:border-gray-800 rounded-2xl p-4 sm:p-5 shadow-xs hover:shadow-md transition space-y-3"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-bold text-white px-2 py-0.5 rounded-full ${ev.badgeColor || 'bg-[#008069]'}`}>
                    {ev.tag}
                  </span>
                  <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                    <Clock size={12} /> {ev.time}
                  </span>
                </div>

                <button
                  onClick={() => toggleRsvp(ev.id)}
                  className={`flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full border transition cursor-pointer ${
                    isAttending
                      ? 'bg-emerald-50 dark:bg-emerald-950 border-emerald-500 text-emerald-600 dark:text-emerald-400'
                      : 'border-gray-300 dark:border-gray-700 hover:border-[#008069]'
                  }`}
                >
                  {isAttending ? <BellRing size={12} /> : <Bell size={12} />}
                  {isAttending ? 'Attending & Reminded' : 'RSVP / Remind Me'}
                </button>
              </div>

              <div>
                <h3 className="font-bold text-base text-[#111b21] dark:text-[#e9edef]">
                  {ev.title}
                </h3>
                <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                  <MapPin size={12} className="text-[#008069]" /> {ev.location}
                </p>
              </div>

              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                {ev.description}
              </p>

              <div className="pt-2 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs">
                <span className="text-gray-400 text-[11px]">
                  All brethren & newcomers warmly welcome
                </span>
                <button
                  onClick={() => {
                    onShareEvent?.(`🗓️ *JCRGM Event Notice*: "${ev.title}"\n⏰ Time: ${ev.time}\n📍 Venue: ${ev.location}\nJoin us and be blessed!`);
                  }}
                  className="flex items-center gap-1 text-[#008069] dark:text-[#25d366] font-semibold hover:underline"
                >
                  <Share2 size={12} /> Share to Group
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Event Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-3">
          <div className="bg-white dark:bg-[#111b21] w-full max-w-md rounded-2xl shadow-xl overflow-hidden p-5 space-y-4">
            <h3 className="font-bold text-base text-[#111b21] dark:text-[#e9edef]">
              Schedule New Ministry Gathering
            </h3>
            <form onSubmit={handleCreateEvent} className="space-y-3 text-xs">
              <div>
                <label className="block font-medium mb-1 text-gray-600 dark:text-gray-300">Gathering Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. All Night Prayer Vigil"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-[#202c33] focus:outline-none focus:ring-1 focus:ring-[#008069]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-medium mb-1 text-gray-600 dark:text-gray-300">Date & Time</label>
                  <input
                    type="text"
                    placeholder="e.g. Friday 26 Sep • 9 PM"
                    value={newTime}
                    onChange={(e) => setNewTime(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-[#202c33] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-medium mb-1 text-gray-600 dark:text-gray-300">Category Tag</label>
                  <select
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-[#202c33] focus:outline-none"
                  >
                    <option value="Revival">Revival</option>
                    <option value="Service">Service</option>
                    <option value="Youth">Youth</option>
                    <option value="Vigil">Prayer Vigil</option>
                    <option value="Outreach">Outreach</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-medium mb-1 text-gray-600 dark:text-gray-300">Venue</label>
                <input
                  type="text"
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  placeholder="Sanctuary or Online"
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-[#202c33] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-medium mb-1 text-gray-600 dark:text-gray-300">Description & Theme</label>
                <textarea
                  rows={2}
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Scriptural anchor and event purpose..."
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-[#202c33] focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
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
                  Post Announcement
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
