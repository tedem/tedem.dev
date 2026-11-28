/*
 * English copy of the public site. The Turkish file (tr.ts) must have exactly the same
 * shape: a missing or extra key fails the type check. Values that depend on a number or
 * a name are functions.
 */

const en = {
  layout: {
    topOfPage: 'Top of the page',
    skipToContent: 'Skip to main content',
  },

  nav: {
    home: 'Home',
    about: 'About',
    posts: 'Posts',
    contact: 'Contact',
    main: 'Main',
    menu: 'Navigation menu',
    login: 'Login',
    getInTouch: 'Get in touch',
    /** Name of the language switch, written in the language it leads to. */
    switchLabel: 'Bu sayfanın Türkçesi',
  },

  /**
   * Path names shown after "~/" in navigation and section headings. Decoration only:
   * the URLs themselves are English in both languages (/about, /en/about).
   */
  paths: {
    about: 'about',
    posts: 'posts',
    contact: 'contact',
    approach: 'approach',
  },

  common: {
    opensInNewTab: '(opens in a new tab)',
    elsewhere: 'Elsewhere',
    showMore: 'Show more',
    showLess: 'Show less',
    backHome: 'Back home',
    allPosts: 'All posts',
    readAboutMe: 'Read about me',
    minutes: (count: number) => `${count} min`,
    minutesRead: (count: number) => `${count} min read`,
    read: 'read',
  },

  footer: {
    sayHello: 'say-hello',
    sayHelloText: 'Open to new projects, questions and good ideas.',
    elsewhere: 'elsewhere',
    rights: 'All rights reserved.',
    backToTop: 'Back to top',
    theme: { label: 'Theme', light: 'Light', dark: 'Dark', system: 'System' },
    cookieSettings: 'Cookie settings',
    legal: 'Legal',
  },

  /** Shared parts of the legal pages; the documents themselves are in i18n/legal. */
  legal: {
    updated: 'Last updated',
    contents: 'on-this-page',
    summary: 'In short',
    summaryNote: 'A plain-language summary. The full text below is what applies.',
    cookieSettings: 'cookie settings',
    readAlso: 'Also read',
    questions: 'Questions?',
    questionsText: 'Write to me about anything on this page.',
  },

  /** Cookie banner and settings (components/site/cookie-consent.tsx). */
  cookies: {
    path: 'cookies',
    region: 'Cookie consent',
    title: 'A few cookies, no tracking',
    text: 'This site uses cookies to work and, if you allow it, to remember your theme. No analytics, no ads, nothing shared with third parties.',
    noTracking: 'No tracking · No ads',
    acceptAll: 'Accept all',
    rejectAll: 'Reject all',
    customize: 'Customize',
    save: 'Save choices',
    settingsTitle: 'Cookie settings',
    settingsText: 'Choose which cookies this site may set. You can change this at any time from the footer.',
    policyLink: 'Read the Privacy Policy',
    alwaysOn: 'Always on',
    on: 'On',
    off: 'Off',
    categories: {
      necessary: {
        title: 'Necessary',
        text: 'Keep the site secure and working: they protect forms from forged requests and remember this choice.',
      },
      preferences: {
        title: 'Preferences',
        text: 'Remember the theme you pick (light, dark or system) between visits.',
      },
    },
  },

  // TODO: replace the placeholder bio with your own, here and in tr.ts.
  profile: {
    lead: 'I build web products end to end, from the database and API to the interface people actually use.',
    body: 'I care about accessibility, performance and maintainable code, and I like owning a feature from the first idea to production.',
    role: 'Full stack developer',
    location: 'İstanbul, Turkey',
    focus: 'End-to-end products',
    /** The owner's city, as shown next to the clock. */
    city: 'Istanbul',
    aboutDescription: 'Who I am, what I do and the tools I reach for.',
    focusAreas: [
      { label: 'Frontend', value: 'Accessible, fast interfaces with React and Next.js.' },
      { label: 'Backend', value: 'APIs and data models with Node.js, PHP and Laravel.' },
      { label: 'Mobile', value: 'Native iOS apps with Swift and SwiftUI.' },
    ],
    principles: [
      {
        title: 'Find the real question.',
        detail: 'Listen closely, make sense of the moving parts, and agree on what matters before making anything.',
      },
      {
        title: 'Make it feel inevitable.',
        detail: 'Give the idea a clear shape through considered design, useful technology, and a little restraint.',
      },
      {
        title: 'Refine until it feels right.',
        detail: 'Fine-tune interactions, remove friction, and give the final details the attention they deserve.',
      },
    ],
    stackGroups: {
      languages: 'Languages',
      frameworks: 'Frameworks',
      platform: 'Platform & data',
      tooling: 'Tooling',
    },
  },

  time: {
    sameTime: 'Same time as you',
    /** "3h ahead of you", "2h 30m behind you". */
    difference: (hours: number, minutes: number, ahead: boolean) =>
      `${[hours && `${hours}h`, minutes && `${minutes}m`].filter(Boolean).join(' ')} ${ahead ? 'ahead of' : 'behind'} you`,
    timeIn: (city: string) => `Time in ${city}`,
    localTimeIn: (city: string) => `Local time in ${city}`,
    atDesk: 'Probably at my desk',
    awayFromDesk: 'Probably away from my desk',
    workingHours: (start: string, end: string, city: string) =>
      `I usually work ${start}–${end} ${city} time, on weekdays.`,
    weekdays: (city: string) => `Weekdays, ${city} time`,
  },

  hero: {
    eyebrow: 'Thoughtful by design. Curious by default.',
    greeting: "Hi, I'm",
    intro: 'I turn thoughtful ideas into meaningful digital experiences, crafted with care from concept to completion.',
    exploreWork: 'Explore my work',
    aboutMe: 'A little about me',
  },

  aboutSection: {
    tagline: 'A bit about me',
    title: 'Building the web, end to end.',
    bio: 'Bio',
    details: 'Details',
    role: 'Role',
    location: 'Location',
    experience: 'Experience',
    years: (count: number) => `${count}+ years`,
    focus: 'Focus',
    timezone: 'Timezone',
    whatIDo: 'What I do',
    stack: 'Stack',
    stackIntro: 'Languages, frameworks and tools I use day to day, from web apps to native iOS.',
    stackContinued: 'Stack, continued',
    play: 'Play',
    pause: 'Pause',
    playScrolling: 'Play scrolling',
    pauseScrolling: 'Pause scrolling',
    moreSections: '(2 more sections: What I do and Stack)',
  },

  postsSection: {
    tagline: 'Latest articles and thoughts',
  },

  posts: {
    title: 'Things I keep thinking about.',
    description: 'A few short notes on making, noticing, and finding a clearer way through.',
    emptyTitle: 'No posts found.',
    emptyDetail: 'They may be hiding, procrastinating, or stuck in draft purgatory.',
    listTitle: 'All posts',
    columns: { date: 'Date', title: 'Title', read: 'Read' },
    breadcrumb: 'Breadcrumb',
    morePosts: 'More posts',
    newer: 'Newer post',
    older: 'Older post',
    published: 'Published',
    updated: 'Updated',
    stats: {
      label: 'Archive in numbers',
      posts: (count: number) => (count === 1 ? '1 post' : `${count} posts`),
      minutes: (count: number) => `${count} min of reading`,
      since: (year: number) => `since ${year}`,
    },
    latest: 'Latest',
    readPost: 'Read post',
    comments: (count: number) => (count === 1 ? '1 comment' : `${count} comments`),
    search: {
      label: 'Search posts',
      placeholder: 'Search titles and descriptions…',
      shortcut: 'Press / to search',
      clear: 'Clear search',
      results: (count: number, total: number) => `${count} of ${total}`,
      emptyTitle: (query: string) => `Nothing matches “${query}”.`,
      emptyText: 'Try a shorter or different word.',
    },
    sort: { label: 'Sort', newest: 'Newest', oldest: 'Oldest' },
    yearCount: (count: number) => (count === 1 ? '1 post' : `${count} posts`),
    archive: 'Archive',
    contents: 'on-this-page',
    toggleContents: 'Contents',
    copyLink: 'Copy link',
    linkCopied: 'Link copied',
    copyCode: 'Copy code',
    codeCopied: 'Copied',
    readingProgress: 'Reading progress',
    jumpToComments: 'Jump to comments',
    writtenBy: 'Written by',
    aboutAuthor: 'More about me',
    contactAuthor: 'Get in touch',
    share: {
      label: 'Share',
      on: (name: string) => `Share on ${name}`,
      email: 'Email',
      native: 'Share…',
      emailBody: (title: string, url: string) => `${title}\n\n${url}`,
    },
    backToTop: 'Back to top',
    rail: {
      reading: 'reading',
      progress: 'Read so far',
      remaining: (minutes: number) => `~${minutes} min left`,
      done: 'Done. Thanks for reading!',
      notStarted: 'Not started yet',
      stats: 'stats',
      words: 'Words',
      characters: 'Characters',
      charactersHint: 'without spaces',
      readingTime: 'Reading time',
      headings: 'Headings',
      codeBlocks: 'Code blocks',
      links: 'Links',
      images: 'Images',
      comments: 'Comments',
      language: 'Language',
      id: 'Post code',
      published: 'Published',
      updated: 'Updated',
      ageLabel: 'Age',
      age: (days: number) => (days === 0 ? 'today' : days === 1 ? '1 day' : `${days} days`),
    },
    words: (count: string) => `${count} words`,
  },

  /** Comments under a post (components/site/comments.tsx). */
  comments: {
    path: 'comments',
    title: 'Comments',
    count: (count: number) => (count === 1 ? '1 comment' : `${count} comments`),
    emptyTitle: 'No comments yet.',
    emptyText: 'Questions, corrections and second opinions are all welcome.',
    author: 'Author',
    reply: 'Reply',
    replyTo: (name: string) => `Reply to ${name}`,
    cancel: 'Cancel',
    form: {
      title: 'Leave a comment',
      replyTitle: (name: string) => `Replying to ${name}`,
      name: 'Name',
      email: 'Email',
      emailHint: 'Never shown. Only used if I need to answer in private.',
      body: 'Comment',
      bodyPlaceholder: 'A thought, a question or a correction…',
      submit: 'Send comment',
      submitReply: 'Send reply',
      sending: 'Sending…',
      characters: (count: number, max: number) => `${count} / ${max}`,
      notice:
        'Comments appear after review. Sending one means you agree to the {terms}; the {privacy} explains how your data is handled.',
    },
    errors: {
      name: 'Enter your name (up to 80 characters).',
      email: 'Enter a valid email address.',
      body: (max: number) => `Write a comment of 2 to ${max} characters.`,
      parent: 'That comment can no longer be replied to.',
      throttled: 'That is a lot of comments in a short time. Please try again a little later.',
    },
    sent: {
      title: 'Thanks, your comment is in.',
      text: 'It will appear here once it has been reviewed.',
      again: 'Write another',
      close: 'Close',
    },
  },

  approach: {
    tagline: 'Small steps, thoughtful outcomes',
    titleStart: 'Thought first.',
    titleEnd: 'Craft always.',
    description: "A clear process makes room for good surprises. Here's how I like to get there.",
  },

  contact: {
    title: 'Have a good one in mind?',
    description: "Let's talk about your project and see if we're a good fit for each other.",
    tagline: 'Good things start a conversation',
    availability: 'Available for new projects',
    replyTime: 'I usually reply within 24 hours.',
    emailSubject: 'Project inquiry',
    getInTouch: 'Get in touch',
    copyEmail: 'Copy email',
    copyAddress: 'Copy address',
    copied: 'Copied',
    copiedMessage: 'Email address copied to clipboard',
    copyError: 'Could not copy the email address. Use the email link instead.',
    moreLinks: (count: number) => `(${count} more ${count === 1 ? 'link' : 'links'})`,
    writeToMe: 'Write to me',
    startEmail: 'Start an email',
    whenToExpect: 'When to expect a reply',
    replyTimeLabel: 'Reply time',
    workingHoursLabel: 'Working hours',
  },

  aboutPage: {
    atAGlance: 'At a glance',
    role: 'Role',
    basedIn: 'Based in',
    experience: 'Experience',
    focus: 'Focus',
    localTime: 'Local time',
    onThisPage: 'On this page',
    chapters: {
      whatIDo: 'What I do',
      howIWork: 'How I work',
      stack: 'Stack',
      elsewhere: 'Elsewhere',
    },
    step: (count: number) => `Step ${count}`,
    elsewhereText: 'Find me on these, or write to me directly.',
  },

  errors: {
    label: (status: number) => `Error ${status}`,
    403: {
      title: 'Access denied',
      message: "This page exists, but you don't have access to it.",
      shell: (path: string) => `cd: ${path}: Permission denied`,
    },
    404: {
      title: 'Page not found',
      message: 'The page you are looking for does not exist or has moved.',
      shell: (path: string) => `cd: ${path}: No such file or directory`,
    },
    500: {
      title: 'Something went wrong',
      message: 'An error on my side stopped this page from loading. Please try again in a moment.',
      shell: (path: string) => `${path}: process exited with code 1`,
    },
    503: {
      title: 'Back soon',
      message: 'The site is down for maintenance. Please check back in a few minutes.',
      shell: (path: string) => `${path}: service unavailable`,
    },
    reportProblem: 'Report a problem',
    tryThese: 'Or try one of these',
  },
};

export type Messages = typeof en;

export default en;
