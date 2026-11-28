import type { LegalDocuments } from '@/i18n/legal/types';

/*
 * English legal documents. Keep them in step with tr.ts, and update `updated` whenever
 * the meaning changes. They describe what the site actually does: change them together
 * with the code (new cookies, analytics, a mail service, another host).
 */

const en = {
  privacy: {
    title: 'Privacy Policy',
    description: 'What personal data tedem.dev handles, why, for how long, and your rights over it.',
    path: 'privacy',
    updated: '2026-11-28',
    summary: [
      'No analytics, no advertising and no third-party trackers.',
      'The server keeps short-lived logs (IP address, page, browser) for security; they are deleted after 14 days.',
      'Only the cookies the site needs, plus a theme cookie if you allow it.',
      'If you email me, your message is used only to reply to you.',
    ],
    sections: [
      {
        id: 'controller',
        title: 'Who is responsible',
        blocks: [
          'tedem.dev is a personal website run by {owner}, based in Istanbul, Turkey. {owner} is the data controller for the personal data described here, under the Turkish Personal Data Protection Law No. 6698 (KVKK) and, where it applies, the EU General Data Protection Regulation (GDPR).',
          'For anything about this policy or your data, write to {email}.',
        ],
      },
      {
        id: 'data',
        title: 'What data is handled, and why',
        blocks: [
          {
            table: {
              head: ['Data', 'Purpose', 'Legal basis', 'Kept for'],
              rows: [
                [
                  'Server logs: IP address, date and time, requested page, browser (user agent), referring page',
                  'Keeping the site secure and running, finding errors and abuse',
                  'Legitimate interest (KVKK art. 5/2-f, GDPR art. 6(1)(f))',
                  '14 days',
                ],
                [
                  'Necessary cookies',
                  'Sessions, protecting forms against forged requests, remembering your cookie choice',
                  'Legitimate interest; strictly necessary for the site',
                  'See Cookies below',
                ],
                [
                  'Theme preference (cookie and local storage)',
                  'Remembering the light, dark or system theme between visits',
                  'Your consent (KVKK art. 5/1, GDPR art. 6(1)(a))',
                  '1 year, or until you withdraw consent',
                ],
                [
                  'Emails you send: your address, name and message',
                  'Reading and replying to your message',
                  'Legitimate interest; steps you asked for (KVKK art. 5/2-c, GDPR art. 6(1)(b))',
                  'Until the conversation is over, at most 2 years',
                ],
                [
                  'Comments: your name, email address and comment',
                  'Publishing the comment under your name after review; the email address is never shown and is used only to answer you in private or to deal with abuse',
                  'Your request to publish it (KVKK art. 5/2-c, GDPR art. 6(1)(b)); legitimate interest for moderation',
                  'While the post is online, or until you ask for removal',
                ],
                [
                  'Account data, only if you register: name, email, password (stored hashed), two-factor and passkey data',
                  'Signing in to the admin area',
                  'Performance of a contract (KVKK art. 5/2-c, GDPR art. 6(1)(b))',
                  'Until the account is deleted',
                ],
              ],
            },
          },
          'Personal data is not used for automated decisions or profiling.',
          'Once approved, a comment and the name you gave are public on the post’s page; comments that are not approved are deleted.',
        ],
      },
      {
        id: 'not-collected',
        title: 'What is not collected',
        blocks: [
          {
            list: [
              'No analytics or statistics tools, and no advertising.',
              'No social media widgets or embedded content that reports back to other companies.',
              'Fonts and all other files are served from this server, not from a third-party network.',
              'Your data is never sold or rented to anyone.',
            ],
          },
          'Links to other sites (GitHub, LinkedIn and others) are plain links. Once you follow one, that site’s own privacy policy applies.',
        ],
      },
      {
        id: 'cookies',
        title: 'Cookies',
        blocks: [
          'A cookie is a small file your browser keeps for a site. tedem.dev uses these:',
          {
            table: {
              head: ['Name', 'Type', 'Purpose', 'Lifetime'],
              rows: [
                [
                  'tedem_session',
                  'Necessary',
                  'Keeps your session (and your sign-in, if you have an account)',
                  '2 hours of inactivity',
                ],
                [
                  'XSRF-TOKEN',
                  'Necessary',
                  'Protects forms against cross-site request forgery',
                  '2 hours of inactivity',
                ],
                ['cookie_consent', 'Necessary', 'Remembers your cookie choice', 'About 6 months'],
                ['appearance', 'Preference', 'Remembers your theme (also kept in local storage)', '1 year'],
              ],
            },
          },
          'Necessary cookies cannot be turned off, as the site does not work without them. The preference cookie is set only with your consent, which you can give or withdraw at any time in {cookieSettings}. Withdrawing it deletes the stored theme.',
        ],
      },
      {
        id: 'sharing',
        title: 'Who else handles the data',
        blocks: [
          {
            list: [
              'Hosting: the site runs on a virtual server at Google Cloud Platform, which processes the data above only to run that server.',
              'Email: messages you send are stored by my email provider.',
              'Authorities: only when the law requires it.',
            ],
          },
          'These providers may store data outside Turkey. Such transfers rely on the safeguards required by KVKK article 9 and, where it applies, Chapter V of the GDPR, such as standard contractual clauses.',
        ],
      },
      {
        id: 'security',
        title: 'Security',
        blocks: [
          'The site is served only over HTTPS. Passwords are stored hashed, sessions are encrypted, sign-in and registration are rate limited, and accounts can use two-factor authentication and passkeys. No system is perfectly secure; if you find a problem, please report it to {email}.',
        ],
      },
      {
        id: 'rights',
        title: 'Your rights',
        blocks: [
          'Under KVKK article 11 and, where it applies, the GDPR, you can:',
          {
            list: [
              'learn whether your personal data is processed, and request information about it;',
              'learn the purpose of the processing and whether the data is used accordingly;',
              'know the third parties, in Turkey or abroad, to whom it is transferred;',
              'have incomplete or inaccurate data corrected, and have data deleted or destroyed;',
              'ask for those corrections and deletions to be passed on to the third parties who received the data;',
              'object to a result against you that arises only from automated analysis;',
              'claim compensation for damage caused by unlawful processing;',
              'under the GDPR, also restrict processing, object to it, receive your data in a portable format, and withdraw consent at any time.',
            ],
          },
          'Send requests to {email}. They are answered free of charge and within 30 days at the latest. You may also complain to the Turkish Personal Data Protection Authority (KVKK) or, in the EU, to your local data protection authority.',
        ],
      },
      {
        id: 'children',
        title: 'Children',
        blocks: [
          'The site is not aimed at children, and accounts are not meant for anyone under 18. If you believe a child has sent personal data, write to {email} and it will be deleted.',
        ],
      },
      {
        id: 'changes',
        title: 'Changes to this policy',
        blocks: [
          'This policy changes when the site does. The date at the top shows the latest version; significant changes are also noted on this page.',
        ],
      },
    ],
  },

  terms: {
    title: 'Terms of Service',
    description: 'The rules for using tedem.dev: content ownership, acceptable use, accounts and liability.',
    path: 'terms',
    updated: '2026-11-28',
    summary: [
      'The site is free to read; please use it fairly.',
      'Posts and design are mine; quote them with a link back.',
      'Code snippets in posts are free to use in your own projects.',
      'Everything is shared as is, as personal opinion and without warranty.',
    ],
    sections: [
      {
        id: 'about',
        title: 'About these terms',
        blocks: [
          'These terms apply to tedem.dev and all of its pages (“the site”), run by {owner}. By using the site you agree to them; if you do not, please do not use it.',
          'The {privacy} explains how personal data is handled and is part of these terms.',
        ],
      },
      {
        id: 'content',
        title: 'Content and ownership',
        blocks: [
          'Unless stated otherwise, the posts, text, design and images on the site belong to {owner} and are protected by copyright, including the Turkish Law No. 5846 on Intellectual and Artistic Works.',
          {
            list: [
              'You may quote short excerpts, with credit and a link to the original page.',
              'Republishing whole posts, translating them, or using them commercially needs written permission.',
              'Code snippets in posts may be used in your own projects, free of charge and without warranty, unless the post says otherwise.',
              'Names and logos of other products belong to their owners and appear only to refer to them.',
            ],
          },
        ],
      },
      {
        id: 'acceptable-use',
        title: 'Acceptable use',
        blocks: [
          'When using the site, do not:',
          {
            list: [
              'try to break into it, disrupt it or test its security without permission (security reports are welcome at {email});',
              'send automated requests that burden the server, or get around its rate limits;',
              'create accounts in bulk or by automated means;',
              'use the content to mislead people or to pretend to be {owner}.',
            ],
          },
          'Access may be blocked for anyone who breaks these rules.',
        ],
      },
      {
        id: 'accounts',
        title: 'Accounts',
        blocks: [
          'The admin area exists to run the site. Creating an account gives no right to publish content. You are responsible for keeping your sign-in details safe. Accounts that break these terms, or that are not used, may be suspended or deleted without notice.',
        ],
      },
      {
        id: 'comments',
        title: 'Comments',
        blocks: [
          'Comments are reviewed before they appear, and may be declined or removed at any time without a reason. When you comment:',
          {
            list: [
              'be respectful, and stay on the topic of the post;',
              'do not post advertising, spam, illegal content, or other people’s personal data;',
              'do not pretend to be someone else.',
            ],
          },
          'You keep the rights to what you write and are responsible for it. By sending a comment, you allow it to be shown, with the name you gave, on the site. To have one of your comments removed, write to {email}.',
        ],
      },
      {
        id: 'links',
        title: 'Links to other sites',
        blocks: [
          'The site links to other sites for convenience. {owner} does not control them and is not responsible for their content or practices.',
        ],
      },
      {
        id: 'warranty',
        title: 'No warranty',
        blocks: [
          'Content is personal opinion and experience, may go out of date, and is not professional advice. The site is provided “as is” and “as available”, without any warranty that it is accurate, complete or always available.',
        ],
      },
      {
        id: 'liability',
        title: 'Limitation of liability',
        blocks: [
          'To the extent the law allows, {owner} is not liable for damage arising from the use of the site or its content, or from being unable to use it. Nothing in these terms limits liability that the law does not allow to be limited, such as liability for intent or gross negligence.',
        ],
      },
      {
        id: 'changes',
        title: 'Changes to these terms',
        blocks: [
          'These terms may be updated; the date at the top shows the latest version. Using the site after a change means you accept the new version.',
        ],
      },
      {
        id: 'law',
        title: 'Governing law',
        blocks: [
          'These terms are governed by the laws of the Republic of Turkey. Istanbul courts and enforcement offices have jurisdiction over disputes, without affecting any mandatory rights you have as a consumer.',
        ],
      },
      {
        id: 'contact',
        title: 'Contact',
        blocks: ['Questions about these terms: {email}.'],
      },
    ],
  },
} satisfies LegalDocuments;

export default en;
