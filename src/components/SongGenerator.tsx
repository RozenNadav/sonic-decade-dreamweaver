
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Music } from "lucide-react";

interface SongGeneratorProps {
  keywords: string;
  genre: string;
  decade: string;
  onSongGenerated: (song: string) => void;
}

const SongGenerator = ({ keywords, genre, decade, onSongGenerated }: SongGeneratorProps) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const generateAdvancedSong = (keywordText: string, selectedGenre: string, selectedDecade: string) => {
    const keywordList = keywordText.split(",").map(k => k.trim()).filter(k => k);
    
    // Era-specific themes and musical characteristics
    const genreDecadeStyles = {
      "Pop": {
        "1950s": {
          themes: ["young love", "dancing", "school", "summer romance", "drive-in movies"],
          style: "innocent, upbeat, simple melodies",
          vocals: "clean harmonies, doo-wop influence",
          instruments: "piano, simple drums, backing vocals"
        },
        "1960s": {
          themes: ["love and peace", "youth rebellion", "good vibrations", "holding hands", "surfing"],
          style: "British invasion, Motown influence, optimistic",
          vocals: "harmonious, Beatles-style, girl group vocals",
          instruments: "electric guitars, bass, drums, organ"
        },
        "1970s": {
          themes: ["dancing all night", "disco fever", "glamour", "Saturday night", "freedom"],
          style: "disco beats, orchestral, glamorous",
          vocals: "powerful, soulful, disco diva",
          instruments: "strings, disco beat, bass guitar, horns"
        },
        "1980s": {
          themes: ["neon lights", "big dreams", "power", "MTV generation", "electric nights"],
          style: "synth-heavy, dramatic, larger-than-life",
          vocals: "powerful, anthemic, with reverb",
          instruments: "synthesizers, drum machines, electric guitar"
        },
        "1990s": {
          themes: ["relationships", "growing up", "finding yourself", "real emotions", "being different"],
          style: "diverse, emotional range, authentic",
          vocals: "emotional, range from intimate to powerful",
          instruments: "guitars, hip-hop beats, R&B elements"
        },
        "2000s": {
          themes: ["party tonight", "being a star", "confidence", "club scene", "living it up"],
          style: "polished production, hip-hop influenced",
          vocals: "confident, auto-tuned, rhythmic",
          instruments: "electronic beats, synthesizers, samples"
        },
        "2010s": {
          themes: ["drop the beat", "festival vibes", "social media", "young and wild", "electric energy"],
          style: "EDM drops, electronic, festival-ready",
          vocals: "processed, electronic effects, catchy hooks",
          instruments: "EDM synths, heavy bass, electronic drums"
        },
        "2020s": {
          themes: ["mental health", "authenticity", "vulnerability", "finding peace", "real connections"],
          style: "lo-fi, bedroom pop, introspective",
          vocals: "intimate, conversational, authentic",
          instruments: "vintage synths, soft guitars, dreamy production"
        }
      },
      "Rock": {
        "1950s": {
          themes: ["rebellion", "cars", "breaking rules", "rock and roll", "teenage kicks"],
          style: "raw energy, simple but powerful",
          vocals: "energetic, slightly rough, rebellious",
          instruments: "electric guitar, upright bass, drums"
        },
        "1960s": {
          themes: ["revolution", "psychedelic experiences", "breaking boundaries", "social change", "mind expansion"],
          style: "experimental, psychedelic, revolutionary",
          vocals: "experimental, harmonies, effects",
          instruments: "electric guitars, bass, drums, effects pedals"
        },
        "1970s": {
          themes: ["freedom", "partying", "living wild", "arena shows", "guitar heroes"],
          style: "heavy, progressive, arena-ready",
          vocals: "powerful, blues-influenced, commanding",
          instruments: "heavy guitars, bass, drums, keyboards"
        },
        "1980s": {
          themes: ["excess", "power", "living large", "stadium shows", "guitar solos"],
          style: "hair metal, anthemic, theatrical",
          vocals: "high-pitched, dramatic, powerful",
          instruments: "heavy guitars, synthesizers, big drums"
        },
        "1990s": {
          themes: ["alienation", "authenticity", "social issues", "being real", "inner struggles"],
          style: "grunge, alternative, raw emotion",
          vocals: "raw, emotional, authentic angst",
          instruments: "distorted guitars, minimal production"
        },
        "2000s": {
          themes: ["anger", "relationships", "standing up", "breaking free", "emotional pain"],
          style: "nu-metal, emo, processed",
          vocals: "aggressive, emotional range, processed",
          instruments: "heavy guitars, electronic elements"
        },
        "2010s": {
          themes: ["nostalgia", "personal growth", "hope", "overcoming", "indie spirit"],
          style: "indie rock, electronic integration",
          vocals: "emotional depth, modern clarity",
          instruments: "guitars, electronic elements, modern production"
        },
        "2020s": {
          themes: ["mental health", "social justice", "authenticity", "finding voice", "diverse perspectives"],
          style: "genre-fusion, retro-modern, diverse",
          vocals: "authentic expression, varied styles",
          instruments: "vintage gear, modern production, genre fusion"
        }
      }
    };

    const currentStyle = genreDecadeStyles[selectedGenre]?.[selectedDecade] || genreDecadeStyles["Pop"]["2020s"];
    
    // Generate song that captures the era's essence
    const songSections = generateAuthenticSong(keywordList, currentStyle, selectedGenre, selectedDecade);
    
    return `🎵 "${songSections.title}" 🎵
${selectedGenre} • ${selectedDecade}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎼 MUSICAL STYLE:
• Era: ${selectedDecade} ${selectedGenre}
• Vibe: ${currentStyle.style}
• Vocals: ${currentStyle.vocals}
• Instrumentation: ${currentStyle.instruments}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${songSections.lyrics}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎹 PRODUCTION NOTES:
${songSections.productionNotes}

🎤 PERFORMANCE STYLE:
${songSections.performanceNotes}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Inspired by: ${keywordText}`;
  };

  const generateAuthenticSong = (keywords: string[], style: any, genre: string, decade: string) => {
    const mainKeyword = keywords[0] || "dreams";
    const themeKeywords = keywords.slice(1, 4);
    
    // Select era-appropriate themes
    const eraThemes = style.themes;
    const selectedTheme = eraThemes[Math.floor(Math.random() * eraThemes.length)];
    
    // Generate title that captures the era
    const title = generateEraTitle(mainKeyword, genre, decade);
    
    // Create lyrics that reflect the musical era's characteristics
    const verses = generateEraVerse(mainKeyword, themeKeywords, selectedTheme, genre, decade);
    const chorus = generateEraChorus(mainKeyword, themeKeywords, selectedTheme, genre, decade);
    const bridge = generateEraBridge(mainKeyword, themeKeywords, selectedTheme, genre, decade);

    const lyrics = `[Verse 1]
${verses.verse1.join('\n')}

[Chorus]
${chorus.join('\n')}

[Verse 2]
${verses.verse2.join('\n')}

[Chorus]
${chorus.join('\n')}

[Bridge]
${bridge.join('\n')}

[Final Chorus]
${chorus.join('\n')}`;

    const productionNotes = getEraProductionNotes(genre, decade);
    const performanceNotes = getEraPerformanceNotes(genre, decade);

    return { title, lyrics, productionNotes, performanceNotes };
  };

  const generateEraTitle = (mainKeyword: string, genre: string, decade: string) => {
    const titleFormats = {
      "1950s": [`${mainKeyword} Tonight`, `Rock Around ${mainKeyword}`, `${mainKeyword} Baby`],
      "1960s": [`${mainKeyword} Revolution`, `All You Need Is ${mainKeyword}`, `${mainKeyword} Generation`],
      "1970s": [`${mainKeyword} Fever`, `Dancing ${mainKeyword}`, `${mainKeyword} Nights`],
      "1980s": [`Electric ${mainKeyword}`, `${mainKeyword} in Neon`, `Power of ${mainKeyword}`],
      "1990s": [`${mainKeyword} Inside`, `Real ${mainKeyword}`, `${mainKeyword} & Pain`],
      "2000s": [`${mainKeyword} Tonight`, `Club ${mainKeyword}`, `${mainKeyword} Star`],
      "2010s": [`${mainKeyword} Drop`, `Festival ${mainKeyword}`, `Electric ${mainKeyword}`],
      "2020s": [`${mainKeyword} Feelings`, `Honest ${mainKeyword}`, `${mainKeyword} Therapy`]
    };

    const formats = titleFormats[decade] || [`${mainKeyword}`, `${mainKeyword} Song`];
    return formats[Math.floor(Math.random() * formats.length)];
  };

  const generateEraVerse = (mainKeyword: string, themeKeywords: string[], theme: string, genre: string, decade: string) => {
    // Generate verses that capture the era's lyrical style and themes
    if (decade === "1950s") {
      return {
        verse1: [
          `Well, ${mainKeyword} is calling, can you hear the sound?`,
          `All the kids are ${theme}, spinning round and round`,
          `${themeKeywords[0] || "Baby"} won't you take my hand tonight?`,
          `Everything's gonna be alright, alright, alright`
        ],
        verse2: [
          `Down at the ${theme}, where the music plays`,
          `${mainKeyword} in our hearts for days and days`,
          `${themeKeywords[1] || "Honey"} dance with me until the dawn`,
          `This feeling's gonna carry on and on`
        ]
      };
    } else if (decade === "1960s") {
      return {
        verse1: [
          `There's something happening with ${mainKeyword}`,
          `Can you feel the ${theme} in the air?`,
          `${themeKeywords[0] || "People"} everywhere are waking up`,
          `To a world where ${themeKeywords[1] || "love"} is enough`
        ],
        verse2: [
          `Colors dancing in the ${mainKeyword} light`,
          `Everything's groovy, everything's right`,
          `We're the children of a ${theme}`,
          `Living free, living the dream`
        ]
      };
    } else if (decade === "1970s") {
      return {
        verse1: [
          `Saturday night and the ${mainKeyword} is hot`,
          `Disco lights flashing, give me what you got`,
          `${theme} on the floor, can you feel the beat?`,
          `Move your body to the funky heat`
        ],
        verse2: [
          `Glitter and glamour, ${mainKeyword} divine`,
          `Tonight we're gonna make the stars align`,
          `${themeKeywords[0] || "Dancing"} like there's no tomorrow`,
          `Forget your troubles, forget your sorrow`
        ]
      };
    } else if (decade === "1980s") {
      return {
        verse1: [
          `Neon lights reflect in ${mainKeyword}`,
          `City nights and ${theme} calls`,
          `Synthesizers echo through the street`,
          `Electric ${themeKeywords[0] || "dreams"} make me complete`
        ],
        verse2: [
          `Power suits and ${mainKeyword} hair`,
          `Living large without a care`,
          `${theme} pumping through my veins`,
          `Nothing left but ${themeKeywords[1] || "passion"} remains`
        ]
      };
    } else if (decade === "1990s") {
      return {
        verse1: [
          `Sitting here with ${mainKeyword} on my mind`,
          `Trying to leave the ${theme} behind`,
          `${themeKeywords[0] || "Nothing"} seems to make much sense`,
          `Living life on this fence`
        ],
        verse2: [
          `Alternative ${mainKeyword}, that's who I am`,
          `Don't really care if you understand`,
          `${theme} is all I've ever known`,
          `In this world I stand alone`
        ]
      };
    } else if (decade === "2000s") {
      return {
        verse1: [
          `Club lights blazing, ${mainKeyword} in the air`,
          `Everybody's ${theme}, nobody has a care`,
          `Turn the music up, let the bass drop down`,
          `We're the ${themeKeywords[0] || "kings"} and queens of this town`
        ],
        verse2: [
          `Flip phone buzzing, ${mainKeyword} on the line`,
          `Everything's perfect, everything's fine`,
          `${theme} all night, sleep all day`,
          `Living life the millennial way`
        ]
      };
    } else if (decade === "2010s") {
      return {
        verse1: [
          `Bass is dropping, ${mainKeyword} in the crowd`,
          `EDM pumping, music's getting loud`,
          `${theme} at the festival, hands up high`,
          `Living for the ${themeKeywords[0] || "moment"}, touching the sky`
        ],
        verse2: [
          `Social media ${mainKeyword}, going viral tonight`,
          `Everything's electric, everything's bright`,
          `${theme} with the squad, memories we make`,
          `For the 'gram and for our own sake`
        ]
      };
    } else { // 2020s
      return {
        verse1: [
          `Late night thinking about ${mainKeyword}`,
          `Trying to process all this ${theme}`,
          `${themeKeywords[0] || "Therapy"} sessions, working on myself`,
          `Finding peace, finding mental health`
        ],
        verse2: [
          `Vulnerable ${mainKeyword}, sharing how I feel`,
          `In a world that's asking me to heal`,
          `${theme} and growth, that's my journey now`,
          `Learning to love myself somehow`
        ]
      };
    }
  };

  const generateEraChorus = (mainKeyword: string, themeKeywords: string[], theme: string, genre: string, decade: string) => {
    if (decade === "1950s") {
      return [
        `Rock around the ${mainKeyword}, rock around tonight`,
        `Everything's gonna be alright`,
        `${theme} with me, baby, don't you cry`,
        `We'll rock until the day we die`
      ];
    } else if (decade === "1960s") {
      return [
        `All you need is ${mainKeyword}, ${mainKeyword} is all you need`,
        `${theme} and love is all we need`,
        `Come together, right now`,
        `${mainKeyword} will show us how`
      ];
    } else if (decade === "1970s") {
      return [
        `${mainKeyword} fever, burning up the night`,
        `Disco lights make everything feel right`,
        `Keep on ${theme}, don't stop the groove`,
        `Feel the rhythm, feel the move`
      ];
    } else if (decade === "1980s") {
      return [
        `Electric ${mainKeyword}, power in the night`,
        `Neon dreams burning bright`,
        `${theme} forever, never gonna stop`,
        `Take it to the top, to the top`
      ];
    } else if (decade === "1990s") {
      return [
        `${mainKeyword} inside, tearing me apart`,
        `${theme} has always been my art`,
        `I won't pretend to be someone I'm not`,
        `This is all I've got, all I've got`
      ];
    } else if (decade === "2000s") {
      return [
        `Turn the ${mainKeyword} up, let the bass line drop`,
        `Party don't stop, party don't stop`,
        `${theme} tonight, we're living the dream`,
        `Nothing's impossible, or so it seems`
      ];
    } else if (decade === "2010s") {
      return [
        `When the beat drops, ${mainKeyword} comes alive`,
        `Festival vibes, we survive and thrive`,
        `${theme} in the air, hands up to the sky`,
        `Electric nights, we're born to fly`
      ];
    } else { // 2020s
      return [
        `${mainKeyword} and healing, that's my vibe`,
        `Learning to be real, learning to describe`,
        `${theme} and growth, mental health is key`,
        `This is who I'm meant to be`
      ];
    }
  };

  const generateEraBridge = (mainKeyword: string, themeKeywords: string[], theme: string, genre: string, decade: string) => {
    if (decade === "1950s") {
      return [
        `When the jukebox plays our song`,
        `${mainKeyword} will carry us along`
      ];
    } else if (decade === "1960s") {
      return [
        `In the age of ${theme}`,
        `${mainKeyword} sets us free`
      ];
    } else if (decade === "1970s") {
      return [
        `Mirror ball spinning, ${mainKeyword} shining bright`,
        `Disco will never die tonight`
      ];
    } else if (decade === "1980s") {
      return [
        `Synthesized ${mainKeyword}, digital soul`,
        `Technology makes us whole`
      ];
    } else if (decade === "1990s") {
      return [
        `Generation X, ${mainKeyword} in our veins`,
        `Alternative is all that remains`
      ];
    } else if (decade === "2000s") {
      return [
        `Y2K ${mainKeyword}, millennium dreams`,
        `Nothing's quite what it seems`
      ];
    } else if (decade === "2010s") {
      return [
        `Social media ${mainKeyword}, viral fame`,
        `We're all playing the same game`
      ];
    } else { // 2020s
      return [
        `In this age of ${mainKeyword} and truth`,
        `We're finding our authentic youth`
      ];
    }
  };

  const getEraProductionNotes = (genre: string, decade: string) => {
    const productionMap = {
      "Pop": {
        "1950s": "Record live with minimal overdubs, use ribbon mics, add natural room reverb",
        "1960s": "Multi-track recording, vocal harmonies, add strings and horns, use plate reverb",
        "1970s": "Full orchestration, disco beat with four-on-the-floor, rich bass, string sections",
        "1980s": "Heavy synthesizer layers, gated reverb on drums, digital delay, compressed vocals",
        "1990s": "Blend of live instruments and samples, crisp digital production, hip-hop influences",
        "2000s": "Auto-tuned vocals, heavily compressed mix, hip-hop beats, electronic elements",
        "2010s": "EDM-style drops, festival-ready mix, electronic synths, trap-influenced hi-hats",
        "2020s": "Lo-fi textures, vintage warmth, bedroom pop aesthetics, intimate production"
      },
      "Rock": {
        "1950s": "Simple mic setup, live recording, natural room sound, minimal effects",
        "1960s": "Experimental studio techniques, feedback, phasing, reverse reverb, tape loops",
        "1970s": "Big drum sound, guitar solos prominent, arena reverb, analog warmth",
        "1980s": "Gated reverb, powerful drums, layered guitars, digital effects",
        "1990s": "Raw, unpolished sound, analog recording, minimal overdubs, authentic feel",
        "2000s": "Heavily processed guitars, digital effects, samples, nu-metal production",
        "2010s": "Modern clarity with vintage elements, electronic integration, stadium sound",
        "2020s": "Analog warmth meets digital precision, genre-blending production"
      }
    };

    return productionMap[genre]?.[decade] || "Modern production with period-appropriate elements";
  };

  const getEraPerformanceNotes = (genre: string, decade: string) => {
    const performanceMap = {
      "Pop": {
        "1950s": "Clean, wholesome delivery with subtle vibrato and doo-wop harmonies",
        "1960s": "Group harmonies, British accent influence, optimistic energy",
        "1970s": "Powerful, soulful delivery with disco diva confidence",
        "1980s": "Dramatic, theatrical with heavy reverb and synthesized backing",
        "1990s": "Emotional authenticity, range from intimate to powerful",
        "2000s": "Confident, auto-tuned precision with rhythmic delivery",
        "2010s": "Electronic processing, trap-influenced rhythm, festival energy",
        "2020s": "Intimate, conversational, vulnerable authenticity"
      },
      "Rock": {
        "1950s": "Raw energy, slight roughness, rebellious attitude",
        "1960s": "Experimental vocal techniques, psychedelic influences, varied dynamics",
        "1970s": "Powerful, blues-influenced, arena-commanding presence",
        "1980s": "High-pitched, theatrical, hair metal screams and power",
        "1990s": "Grunge growl, authentic angst, emotional rawness",
        "2000s": "Aggressive dynamics, nu-metal influence, processed anger",
        "2010s": "Modern rock clarity with emotional depth and indie sensibility",
        "2020s": "Authentic expression with genre-blending vocal styles"
      }
    };

    return performanceMap[genre]?.[decade] || "Contemporary style with period influences";
  };

  const handleGenerate = () => {
    if (!keywords || !genre || !decade) return;
    
    setIsGenerating(true);
    setTimeout(() => {
      const song = generateAdvancedSong(keywords, genre, decade);
      onSongGenerated(song);
      setIsGenerating(false);
    }, 2500);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Music className="h-5 w-5" />
          Song Generator
        </CardTitle>
        <CardDescription>Era-authentic song generation capturing the true spirit of each musical period</CardDescription>
      </CardHeader>
      <CardContent>
        <Button 
          onClick={handleGenerate} 
          disabled={isGenerating || !keywords || !genre || !decade}
          className="w-full"
          size="lg"
        >
          {isGenerating ? "🎵 Creating your song..." : "🎼 Generate Song"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default SongGenerator;
