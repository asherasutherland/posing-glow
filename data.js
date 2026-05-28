/* =============================================================================
   POSING GLOW — Release catalogue

   Add a new release by copying any block below and editing the fields.
   Order matters: the first item in this array is shown first on the page.

   Required fields:
     title        — album / EP / single name
     artist       — artist name
     downloadUrl  — full URL to the download file

   Optional fields:
     cover        — path or URL to cover image; omit for a text placeholder
     description  — short paragraph shown below the byline; if omitted, a
                    generic Lorem ipsum is used as a placeholder
     format       — "Album" | "EP" | "Single"   (reserved for future list view)
     year         — "2024", etc.                (reserved for future list view)
     releaseDate  — ISO date "YYYY-MM-DD"       (reserved for future use)
     genre        — array of genre strings      (reserved for future use)
     stemsUrl     — URL to a stems download     (reserved for future use)
   ============================================================================= */

const releases = [
  {
    title:       "Angel",
    artist:      "MT",
    cover:       "angel-mt.jpg",
    downloadUrl: "https://example.com/angel.zip",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    format:      "Album",
    year:        "2026",
    releaseDate: "2026-05-23",
    genre:       ["Electronic"],
  },
  {
    title:       "Early Works",
    artist:      "Darning",
    cover:       "early works-darning.jpg",
    downloadUrl: "https://example.com/early-works.zip",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    format:      "Album",
    year:        "2026",
    releaseDate: "2026-03-15",
    genre:       ["Country", "Folk"],
  },
  {
    title:       "Brony",
    artist:      "Dali McDonald",
    cover:       "brony-dali mcdonald.jpg",
    downloadUrl: "https://example.com/brony.zip",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Curabitur pretium tincidunt lacus, nulla gravida orci a odio.",
    format:      "Album",
    year:        "2026",
    releaseDate: "2026-04-22",
    genre:       ["Electronic", "Folk"],
  },
  {
    title:       "Bot Haven",
    artist:      "Rot Water",
    cover:       "bot haven-rot water.jpeg",
    downloadUrl: "https://example.com/bot-haven.zip",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.",
    format:      "Album",
    year:        "2026",
    releaseDate: "2026-05-23",
    genre:       ["Electronic"],
  },
  {
    title:       "MUTTS",
    artist:      "MT",
    cover:       "https://f4.bcbits.com/img/a1180933863_10.jpg",
    downloadUrl: "https://example.com/mutts.zip",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    format:      "Album",
    year:        "2026",
    releaseDate: "2026-05-10",
    genre:       ["Electronic", "Dance", "Field Recordings"],
    stemsUrl:    "https://example.com/stems.zip",
  },
  {
    title:       "I Need Your Love!",
    artist:      "FCKCPS",
    cover:       "https://f4.bcbits.com/img/a2943317371_10.jpg",
    downloadUrl: "https://example.com/i-need-your-love.zip",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Praesent in mauris eu tortor porttitor accumsan. Mauris suscipit, ligula sit amet pharetra semper, nibh ante cursus purus.",
    format:      "EP",
    year:        "2024",
    releaseDate: "2024-06-18",
    genre:       ["Dance", "House"],
  },
  {
    title:       "We Should Be Out!",
    artist:      "FCKCPS",
    cover:       "https://f4.bcbits.com/img/a2193983146_10.jpg",
    downloadUrl: "https://example.com/we-should-be-out.zip",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit.",
    format:      "EP",
    year:        "2022",
    releaseDate: "2022-09-05",
    genre:       ["Dance", "House"],
  },
  {
    title:       "Neo",
    artist:      "MT",
    cover:       "https://f4.bcbits.com/img/a3732510150_10.jpg",
    downloadUrl: "https://example.com/neo.zip",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    format:      "Single",
    year:        "2024",
    releaseDate: "2024-11-12",
    genre:       ["Dance", "House", "Breaks"],
    stemsUrl:    "https://example.com/stems.zip",
  },
  {
    title:       "Something Special",
    artist:      "MT",
    cover:       "https://f4.bcbits.com/img/a0733587722_10.jpg",
    downloadUrl: "https://example.com/something-special.zip",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    format:      "Single",
    year:        "2023",
    releaseDate: "2023-07-29",
    genre:       ["Dance", "House"],
  },
];
