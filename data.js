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
     description  — first caption paragraph (the story); shown in italic
     recorded     — second caption paragraph (gear list / credits); shown in
                    the mono "DotumChe" face. Omit if there isn't one.
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
    description: "MT is a third voice neither of us could get to alone. It emerged from two pretty different but ultimately complementary ways of working, and somehow each piece ends up feeling whole. Angel is both a new record and an MT retrospective. It contains work made over the last couple of years alongside more recent works. – Asher Sutherland.",
    recorded:    "Recorded on Akai CS-702D, Akai MPC 1, Ashton CG 34 AM, Behringer UC200, Blofeld Waldorf, Boss DV RV5, Ditto Loop Pedal, DL4 MK2, Epiphone Regent 50R, Fender Bass, GXL3000BP, Jazz Master, Lillians Dads Guitar, Moog Model D, Organ, Rhythm Wolf, Roland TR 8, Sennheiser e945, Strat, Tascam DP 02, Technics SL-1200MK7, Teenage Engineering PO-12, TG 100 Maniac, Vintage V6 60 WK, Zoom H1n, assembled in Ableton.",
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
    description: "Darning is Lillian Rainsford and Dali McDonald Recorded @ The Church of the Holy Sepulchre, Tamaki. Written and practiced in the old nunnery where Lillian was staying at the time. Big Thank you to Lillians Whanau for facilitating us. – Darning.",
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
    description: "These are songs for and about Murchison. – Dali McDonald.",
    recorded:    "Written by Cammy & Dali McDonald, recorded in Morningside, Tamaki. Additional tracking by Cammy, Aidan McDonald, Lillian Rainsford, Ella Bisdee, Phoenix Bisdee and George Turner. Recorded on Akai CS-702D, Akai MPC 1, Ashton CG 34 AM, Behringer UC200, Blofeld Waldorf, Boss DV RV5, Ditto Loop Pedal, DL4 MK2, Epiphone Regent 50R, Fender Bass, GXL3000BP, Jazz Master, Lillians Dads Guitar, Moog Model D, Organ, Rhythm Wolf, Roland TR 8, Sennheiser e945, Strat, Tascam DP 02, Technics SL-1200MK7, TG 100 Maniac, Vintage V6 60 WK, assembled in Ableton. Art By Hannah Jensen.",
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
    description: "Recorded in our flat adjacent to the Basin in Te Whanganui-a-tara between 2017 and 2018. I begun to have less and less vocalists over at the home studio, due to my messy nature and my reluctance to engineer / facilitate my collaborators. I had become skittish in all my professional and artistic aspirations. Shortly after recording these songs we moved to Auckland. – Dali McDonald.",
    recorded:    "Recorded on Akai CS-702D, Akai MPC 1, Behringer UC200, Blofeld Waldorf, Boss DV RV5, Ditto Loop Pedal, DL4 MK2, Epiphone Regent 50R, Fender Bass, GXL3000BP, Jazz Master, Moog Model D, Organ, Rhythm Wolf, Roland TR 8, Sennheiser e945, Strat, Tascam DP 02, Technics SL-1200MK7, TG 100 Maniac, assembled in Ableton.",
    format:      "Album",
    year:        "2026",
    releaseDate: "2026-05-23",
    genre:       ["Electronic"],
  },
  {
    title:       "I Need Your Love!",
    artist:      "FCKCPS",
    cover:       "https://f4.bcbits.com/img/a2943317371_10.jpg",
    downloadUrl: "https://example.com/i-need-your-love.zip",
    description: "Recorded in our flat on Ponsonby Road while I was working and DJ'ing in 3 lamps. Simple Stupid era of home production, smoking and drinking and so on. I was trying to sell myself to this new city / new scene. A wedding here and there, the bar on the weekend whatever working out was it wasn't that. Coffee dates, don't an artist make reckons. – FCKCPS.",
    recorded:    "Recorded on Akai CS-702D, Akai MPC 1, Behringer UC200, Blofeld Waldorf, Boss DV RV5, Ditto Loop Pedal, DL4 MK2, Epiphone Regent 50R, GXL3000BP, Jazz Master, Moog Model D, Organ, Rhythm Wolf, Roland TR 8, Sennheiser e945, Tascam DP 02, Technics SL-1200MK7, TG 100 Maniac, assembled in Ableton.",
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
    description: "Recorded in our flat on Ponsonby Road while I was working and DJ'ing in 3 lamps. Simple Stupid era of home production, smoking and drinking and so on. I was trying to sell myself to this new city / new scene. A wedding here and there, the bar on the weekend whatever working out was it wasn't that. Coffee dates, don't an artist make reckons. – FCKCPS.",
    recorded:    "Recorded on Akai CS-702D, Akai MPC 1, Behringer UC200, Blofeld Waldorf, Boss DV RV5, Ditto Loop Pedal, DL4 MK2, Epiphone Regent 50R, GXL3000BP, Jazz Master, Moog Model D, Organ, Rhythm Wolf, Roland TR 8, Sennheiser e945, Tascam DP 02, Technics SL-1200MK7, TG 100 Maniac, assembled in Ableton.",
    format:      "EP",
    year:        "2022",
    releaseDate: "2022-09-05",
    genre:       ["Dance", "House"],
  },
  {
    title:       "Neo/Vulgar",
    artist:      "MT",
    cover:       "neo-vulgar-mt.jpg",
    downloadUrl: "https://example.com/neo.zip",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    recorded:    "Recorded on Akai CS-702D, Akai MPC 1, Ashton CG 34 AM, Behringer UC200, Blofeld Waldorf, Boss DV RV5, Ditto Loop Pedal, DL4 MK2, Epiphone Regent 50R, Fender Bass, GXL3000BP, Jazz Master, Lillians Dads Guitar, Moog Model D, Organ, Rhythm Wolf, Roland TR 8, Sennheiser e945, Strat, Tascam DP 02, Technics SL-1200MK7, Teenage Engineering PO-12, TG 100 Maniac, Vintage V6 60 WK, Zoom H1n, assembled in Ableton.",
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
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    recorded:    "Recorded on Akai CS-702D, Akai MPC 1, Ashton CG 34 AM, Behringer UC200, Blofeld Waldorf, Boss DV RV5, Ditto Loop Pedal, DL4 MK2, Epiphone Regent 50R, Fender Bass, GXL3000BP, Jazz Master, Lillians Dads Guitar, Moog Model D, Organ, Rhythm Wolf, Roland TR 8, Sennheiser e945, Strat, Tascam DP 02, Technics SL-1200MK7, Teenage Engineering PO-12, TG 100 Maniac, Vintage V6 60 WK, Zoom H1n, assembled in Ableton.",
    format:      "Single",
    year:        "2023",
    releaseDate: "2023-07-29",
    genre:       ["Dance", "House"],
  },
];
