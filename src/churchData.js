// Initial Mock Data and Bible Verses for JCRGM Community
export const INITIAL_CHANNELS = [
  {
    id: 'announcements',
    name: 'General Announcements 📢',
    subtitle: 'Official broadcasts from Pastoral Leadership',
    type: 'broadcast', // Only leadership can post or admin updates
    avatar: '🏛️',
    isOfficial: true,
    category: 'Official',
    unread: 2,
    lastMessageTime: '10:45 AM',
    membersCount: 840,
    description: 'Welcome to the official communication board of Jesus Christ Reigns Gospel Ministry (JCRGM). Here you receive sermon schedules, ministry updates, and official communications.',
  },
  {
    id: 'sunday-service',
    name: 'Sunday Live Service & Fellowship 🕊️',
    subtitle: 'Sunday Worship, Sermon Notes & Discussion',
    type: 'group',
    avatar: '⛪',
    isOfficial: true,
    category: 'Worship',
    unread: 5,
    lastMessageTime: '11:15 AM',
    membersCount: 512,
    description: 'Community fellowship hub during and after services. Share your amen, key takeaways from the pulpit, and engage with the sermon of the day.',
  },
  {
    id: 'prayer-requests',
    name: 'Prayer Warriors & Requests 🙏',
    subtitle: 'Bear one another\'s burdens (Galatians 6:2)',
    type: 'prayer',
    avatar: '🔥',
    isOfficial: true,
    category: 'Spiritual Life',
    unread: 3,
    lastMessageTime: '09:30 AM',
    membersCount: 420,
    description: 'Confidential and shared prayer sanctuary. Submit prayer requests, join the midnight prayer vigils, and click "Amen / Praying" to intercede for brethren.',
  },
  {
    id: 'daily-devotional',
    name: 'Daily Rhema & Scripture 📖',
    subtitle: 'Morning Manna & Quiet Time Study',
    type: 'devotional',
    avatar: '🌅',
    isOfficial: true,
    category: 'Spiritual Life',
    unread: 0,
    lastMessageTime: '06:00 AM',
    membersCount: 780,
    description: 'Every morning get spiritual nourishment, guided reading from the Word of God, reflection questions, and memorization verses.',
  },
  {
    id: 'youth-ignite',
    name: 'JCRGM Youth & Young Adults ⚡',
    subtitle: 'Ignite Fellowship, Campus Outreach & Music',
    type: 'group',
    avatar: '🎸',
    isOfficial: false,
    category: 'Departments',
    unread: 12,
    lastMessageTime: '12:04 PM',
    membersCount: 230,
    description: 'For young professionals, university students, and youth. Vibrant discussions on faith, purpose, relationships, and modern Christian living.',
  },
  {
    id: 'women-of-grace',
    name: 'Daughters of Zion / Women of Grace 🌸',
    subtitle: 'Proverbs 31 Sisterhood & Mentorship',
    type: 'group',
    avatar: '👑',
    isOfficial: false,
    category: 'Departments',
    unread: 1,
    lastMessageTime: 'Yesterday',
    membersCount: 310,
    description: 'Empowering women in faith, family, business, and kingdom impact.',
  },
  {
    id: 'men-of-valour',
    name: 'Men of Valour Fellowship 🛡️',
    subtitle: 'Iron Sharpens Iron (Proverbs 27:17)',
    type: 'group',
    avatar: '🦁',
    isOfficial: false,
    category: 'Departments',
    unread: 0,
    lastMessageTime: 'Sep 22',
    membersCount: 280,
    description: 'Kingdom men standing strong in integrity, leadership, priesthood at home, and marketplace dominion.',
  },
  {
    id: 'testimonies',
    name: 'Praise Reports & Testimonies 🌟',
    subtitle: 'They overcame by the blood of the Lamb',
    type: 'testimonies',
    avatar: '🙌',
    isOfficial: false,
    category: 'Spiritual Life',
    unread: 4,
    lastMessageTime: 'Yesterday',
    membersCount: 650,
    description: 'God has done it! Post your praise reports and celebrate the miracles God is working in the JCRGM family.',
  },
  {
    id: 'pastor-office',
    name: 'Pastor David & Pastoral Team (Direct Desk) ✉️',
    subtitle: 'Confidential Pastoral Guidance & Counseling',
    type: 'direct',
    avatar: '👨‍💼',
    isOfficial: true,
    category: 'Pastoral',
    unread: 1,
    lastMessageTime: '08:45 AM',
    membersCount: 2,
    description: 'Private 1-on-1 pastoral line for confidential spiritual counsel, home visit booking, and dedication requests.',
  }
];

export const INITIAL_MESSAGES = {
  'announcements': [
    {
      id: 'm-ann-1',
      sender: 'Resident Pastor David',
      senderRole: 'Senior Pastor',
      avatar: '👨‍💼',
      isLeadership: true,
      timestamp: 'Yesterday at 4:00 PM',
      content: 'Shalom Beloved family of JCRGM! Greetings in the precious name of our Lord and Saviour Jesus Christ. Reminder that our Monthly 3-Day Fasting and Prayer Revival begins this Wednesday. The theme is: "UNCOMMON HARVEST & DIVINE ACCELERATION" (Amos 9:13).',
      reactions: { '🙏': 84, '🔥': 52, '❤️': 67 },
      pinned: true
    },
    {
      id: 'm-ann-2',
      sender: 'Church Secretariat',
      senderRole: 'Admin Office',
      avatar: '🏛️',
      isLeadership: true,
      timestamp: 'Today at 10:45 AM',
      content: '🚨 ANNOUNCEMENT: The Sanctuary Audio-Visual team invites new volunteers for camera operation, sound engineering, and social stream graphics. Training will take place this Saturday at 10:00 AM at the Main Sanctuary. Register in the Church Office or reply here.',
      reactions: { '👍': 24, '🙌': 19 },
      pinned: false
    }
  ],
  'sunday-service': [
    {
      id: 'm-ss-1',
      sender: 'Elder Matthew',
      senderRole: 'Elder / Liturgy',
      avatar: '🧔',
      isLeadership: true,
      timestamp: '10:00 AM',
      content: 'Sermon Focus for this week: "WALKING BY FAITH, NOT BY SIGHT" (2 Corinthians 5:7). Pastor emphasized that when God speaks a promise, your physical eyes might see delay, but your spiritual spirit must declare fulfilment!',
      reactions: { '🔥': 41, 'Amen': 55, '❤️': 23 }
    },
    {
      id: 'm-ss-2',
      sender: 'Sister Grace Tembo',
      senderRole: 'Member',
      avatar: '👩🏾',
      isLeadership: false,
      timestamp: '10:15 AM',
      content: 'Amen! That point struck my heart: "Doubt looks at the storm, Faith looks at the Savior in the boat!" Hallelujah!',
      reactions: { '❤️': 18, 'Amen': 32 }
    },
    {
      id: 'm-ss-3',
      sender: 'Brother Brian Chirwa',
      senderRole: 'Choir Director',
      avatar: '👨🏾',
      isLeadership: false,
      timestamp: '11:15 AM',
      content: 'The choir anthem lyrics from this morning are now uploaded on our media drive. God was truly glorified in our praise today!',
      reactions: { '🎵': 22, '🙌': 15 }
    }
  ],
  'prayer-requests': [
    {
      id: 'm-pr-1',
      sender: 'Deaconess Martha',
      senderRole: 'Intercession Leader',
      avatar: '👵🏾',
      isLeadership: true,
      timestamp: '08:00 AM',
      content: 'Good morning saints. Let us join hands in prayer for our Brother Emmanuel who was admitted for surgery this afternoon. We declare Isaiah 53:5 - By His stripes he is healed! Praying team, please lift him up.',
      prayerCount: 38,
      reactions: { '🙏': 49, '❤️': 21 },
      isPrayerRequest: true,
      urgency: 'High'
    },
    {
      id: 'm-pr-2',
      sender: 'Sis Naomi K.',
      senderRole: 'Youth Member',
      avatar: '👩',
      isLeadership: false,
      timestamp: '09:30 AM',
      content: 'Dear church family, requesting prayer for my final university bar examinations this Friday and Saturday. Trusting God for clarity of mind and divine favor.',
      prayerCount: 27,
      reactions: { '🙏': 34, '🌟': 14 },
      isPrayerRequest: true,
      urgency: 'Medium'
    }
  ],
  'daily-devotional': [
    {
      id: 'm-dd-1',
      sender: 'Pastoral Study Desk',
      senderRole: 'Pastor David',
      avatar: '📖',
      isLeadership: true,
      timestamp: '06:00 AM',
      content: '🌅 TODAY\'S RHEMA WORD: "The Secret Place of Peace"\n\n📖 Scripture: Psalm 91:1-2\n"He who dwells in the secret place of the Most High shall abide under the shadow of the Almighty. I will say of the LORD, He is my refuge and my fortress: my God; in Him will I trust."\n\n💡 Reflection: Living in worry is trying to carry a burden God never asked you to shoulder. In prayer this morning, surrender every anxious thought at the foot of Calvary.\n\n🎯 Action Point: Memorize Psalm 91:2 today and recite it whenever stress knocks on your door.',
      reactions: { '❤️': 62, '🙏': 88, '💡': 31 }
    }
  ],
  'youth-ignite': [
    {
      id: 'm-yi-1',
      sender: 'Pastor Kenny',
      senderRole: 'Youth Pastor',
      avatar: '🧢',
      isLeadership: true,
      timestamp: 'Yesterday',
      content: 'What a night at the Acoustic Worship Night last Friday! Big shoutout to all who packed the hall. Next Friday: "Career, Tech & Kingdom Finance" masterclass with Bro Samuel.',
      reactions: { '⚡': 35, '🎸': 19 }
    },
    {
      id: 'm-yi-2',
      sender: 'Chileshe M.',
      senderRole: 'Youth Media',
      avatar: '🎧',
      isLeadership: false,
      timestamp: '12:04 PM',
      content: 'Who has the Spotify link for the new JCRGM Praise playlist? Need it for my commute!',
      reactions: { '🎵': 8 }
    }
  ],
  'testimonies': [
    {
      id: 'm-test-1',
      sender: 'Brother Joseph Banda',
      senderRole: 'Member',
      avatar: '🧔🏾',
      isLeadership: false,
      timestamp: 'Yesterday at 3:15 PM',
      content: 'GLORY TO GOD IN THE HIGHEST! 🌟\nAfter 9 months of looking for employment and several rejections, during the Tuesday Breakthrough service, Pastor prophesied that before the month ends, someone here will receive 2 offer letters. On Thursday I got called by a multinational firm with double the compensation! God is faithful in JCRGM!',
      reactions: { '🙌': 72, '🎉': 45, '🔥': 38, '❤️': 51 }
    }
  ],
  'pastor-office': [
    {
      id: 'm-po-1',
      sender: 'Pastor David',
      senderRole: 'Senior Pastor',
      avatar: '👨‍💼',
      isLeadership: true,
      timestamp: '08:45 AM',
      content: 'Peace be with you my dear brother/sister. How can the pastoral office assist you today? Whether you need prayer, spiritual counseling, baby dedication or marriage counseling, feel free to share here in strict confidence.',
      reactions: { '🙏': 2 }
    }
  ]
};

export const CHURCH_STATUS_UPDATES = [
  {
    id: 'status-1',
    author: 'Pastor David',
    avatar: '👨‍💼',
    time: '2 hours ago',
    title: 'Mid-Week Communion Service',
    text: '"When we break the bread, we partake in the supernatural life of Christ." See you all this Wednesday at 6 PM!',
    bgGradient: 'from-amber-700 to-amber-900',
    views: 312,
    verse: '1 Corinthians 11:24'
  },
  {
    id: 'status-2',
    author: 'JCRGM Choir',
    avatar: '🎵',
    time: '4 hours ago',
    title: 'Rehearsals under the Anointing',
    text: 'Preparing glorious sounds for this Sunday. Get ready to dance and worship like David!',
    bgGradient: 'from-purple-800 to-indigo-900',
    views: 198,
    verse: 'Psalm 150:6'
  },
  {
    id: 'status-3',
    author: 'Evangelism Unit',
    avatar: '🌍',
    time: '6 hours ago',
    title: 'Street Outreach Report',
    text: '27 souls gave their lives to Jesus in today’s community medical and gospel drive! Heaven is rejoicing.',
    bgGradient: 'from-emerald-800 to-teal-900',
    views: 450,
    verse: 'Luke 15:7'
  },
  {
    id: 'status-4',
    author: 'Women of Grace',
    avatar: '🌸',
    time: 'Yesterday',
    title: 'Sisterhood Tea & Prayer',
    text: 'Mark your calendars for our quarterly retreat next month. Registration details coming up.',
    bgGradient: 'from-rose-800 to-pink-900',
    views: 260,
    verse: 'Proverbs 31:25'
  }
];

export const UPCOMING_EVENTS = [
  {
    id: 'ev-1',
    title: 'Sunday Celebration Service',
    time: 'Every Sunday • 08:30 AM & 10:45 AM',
    location: 'Main Sanctuary & Online Live Stream',
    tag: 'Service',
    badgeColor: 'bg-emerald-600',
    description: 'Encounter deep worship, transformative preaching, and fervent prayer with Senior Pastor David.'
  },
  {
    id: 'ev-2',
    title: '3-Day Fasting & Prayer Revival',
    time: 'Starts This Wednesday • 06:00 PM Daily',
    location: 'Sanctuary & Zoom Stream',
    tag: 'Revival',
    badgeColor: 'bg-amber-600',
    description: 'Breaking spiritual bondages, praying for our families, church growth, and national prosperity.'
  },
  {
    id: 'ev-3',
    title: 'Youth Ignite Summit 2026',
    time: 'Saturday, Oct 11 • 02:00 PM',
    location: 'Youth Fellowship Arena',
    tag: 'Youth',
    badgeColor: 'bg-blue-600',
    description: 'Empowering kingdom giants in technology, entrepreneurship, arts, and ministry.'
  },
  {
    id: 'ev-4',
    title: 'Couples & Family Enrichment Night',
    time: 'Friday, Oct 24 • 06:30 PM',
    location: 'Banquet Hall',
    tag: 'Family',
    badgeColor: 'bg-rose-600',
    description: 'Building Christ-centered marriages with biblical counsel, dinner, and Q&A sessions.'
  }
];

export const BIBLE_BOOKS = [
  { name: 'Genesis', chapters: 50, testament: 'OT' },
  { name: 'Psalms', chapters: 150, testament: 'OT' },
  { name: 'Proverbs', chapters: 31, testament: 'OT' },
  { name: 'Isaiah', chapters: 66, testament: 'OT' },
  { name: 'Matthew', chapters: 28, testament: 'NT' },
  { name: 'John', chapters: 21, testament: 'NT' },
  { name: 'Romans', chapters: 16, testament: 'NT' },
  { name: '1 Corinthians', chapters: 16, testament: 'NT' },
  { name: 'Ephesians', chapters: 6, testament: 'NT' },
  { name: 'Philippians', chapters: 4, testament: 'NT' },
  { name: 'Hebrews', chapters: 13, testament: 'NT' },
  { name: 'Revelation', chapters: 22, testament: 'NT' },
];

export const BIBLE_SAMPLE_CHAPTERS = {
  'Psalms 23': [
    { v: 1, text: 'The LORD is my shepherd; I shall not want.' },
    { v: 2, text: 'He makes me to lie down in green pastures; He leads me beside the still waters.' },
    { v: 3, text: 'He restores my soul; He leads me in the paths of righteousness For His name’s sake.' },
    { v: 4, text: 'Yea, though I walk through the valley of the shadow of death, I will fear no evil; For You are with me; Your rod and Your staff, they comfort me.' },
    { v: 5, text: 'You prepare a table before me in the presence of my enemies; You anoint my head with oil; My cup runs over.' },
    { v: 6, text: 'Surely goodness and mercy shall follow me All the days of my life; And I will dwell in the house of the LORD Forever.' }
  ],
  'John 14': [
    { v: 1, text: '“Let not your heart be troubled; you believe in God, believe also in Me.' },
    { v: 2, text: 'In My Father’s house are many mansions; if it were not so, I would have told you. I go to prepare a place for you.' },
    { v: 6, text: 'Jesus said to him, “I am the way, the truth, and the life. No one comes to the Father except through Me.”' },
    { v: 27, text: '“Peace I leave with you, My peace I give to you; not as the world gives do I give to you. Let not your heart be troubled, neither let it be afraid.”' }
  ],
  'Philippians 4': [
    { v: 4, text: 'Rejoice in the Lord always. Again I will say, rejoice!' },
    { v: 6, text: 'Be anxious for nothing, but in everything by prayer and supplication, with thanksgiving, let your requests be made known to God;' },
    { v: 7, text: 'and the peace of God, which surpasses all understanding, will guard your hearts and minds through Christ Jesus.' },
    { v: 13, text: 'I can do all things through Christ who strengthens me.' },
    { v: 19, text: 'And my God shall supply all your need according to His riches in glory by Christ Jesus.' }
  ],
  'Romans 8': [
    { v: 1, text: 'There is therefore now no condemnation to those who are in Christ Jesus, who do not walk according to the flesh, but according to the Spirit.' },
    { v: 28, text: 'And we know that all things work together for good to those who love God, to those who are the called according to His purpose.' },
    { v: 31, text: 'What then shall we say to these things? If God is for us, who can be against us?' },
    { v: 37, text: 'Yet in all these things we are more than conquerors through Him who loved us.' }
  ]
};

export const SERMON_PODCASTS = [
  {
    id: 'sermon-1',
    title: 'Supernatural Favor in Unfavorable Times',
    preacher: 'Resident Pastor David',
    duration: '42 mins',
    date: 'Sep 20, 2026',
    scripture: 'Genesis 39:2-4',
    category: 'Sunday Message',
    listens: '1.2k',
    description: 'Understanding how the presence of God transforms disadvantage into a stepping stone for kingdom elevation.'
  },
  {
    id: 'sermon-2',
    title: 'The Mystery of Prevailing Intercession',
    preacher: 'Deaconess Martha',
    duration: '35 mins',
    date: 'Sep 17, 2026',
    scripture: 'James 5:16-18',
    category: 'Midweek Revival',
    listens: '840',
    description: 'Learn the spiritual keys of heartfelt, persistent prayer that opens ancient gates and releases divine answers.'
  },
  {
    id: 'sermon-3',
    title: 'Youth on Fire: Purity & Purpose',
    preacher: 'Pastor Kenny',
    duration: '29 mins',
    date: 'Sep 13, 2026',
    scripture: '1 Timothy 4:12',
    category: 'Youth Ignite',
    listens: '960',
    description: 'Navigating modern culture without compromising biblical principles. How young believers lead by example.'
  }
];

export const CHURCH_GIVING_CATEGORIES = [
  { id: 'tithe', name: 'Tithe (Malachi 3:10)', desc: '10% dedicated unto the Lord for the work of His sanctuary' },
  { id: 'offering', name: 'General Sunday Offering', desc: 'Free-will offering for ministry sustenance & worship' },
  { id: 'building', name: 'Sanctuary Building & Expansion Project', desc: 'Phase 2 Auditorium Construction & Multipurpose Youth Hall' },
  { id: 'missions', name: 'Evangelism & Rural Missions', desc: 'Supporting church plants, crusade outreaches & charity distributions' },
  { id: 'welfare', name: 'Benevolence & Widows Support', desc: 'Assisting vulnerable families, orphans, and church brethren in need' }
];
