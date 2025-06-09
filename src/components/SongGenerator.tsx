
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
    
    // Advanced genre and decade-specific song structures and styles
    const genreDecadeStyles = {
      "Pop": {
        "1950s": {
          structure: "AABA",
          instruments: "piano, simple drums, vocal harmonies",
          themes: "innocent love, teenage romance, simple pleasures",
          style: "doo-wop influenced, clean vocals, wholesome"
        },
        "1960s": {
          structure: "verse-chorus-verse-chorus-bridge-chorus",
          instruments: "guitar, bass, drums, harmonies",
          themes: "love, youth culture, social change",
          style: "Motown, British invasion, girl groups"
        },
        "1970s": {
          structure: "intro-verse-chorus-verse-chorus-bridge-chorus-outro",
          instruments: "strings, disco beats, synthesizers",
          themes: "dancing, freedom, disco culture",
          style: "disco-pop, orchestral arrangements, danceable"
        },
        "1980s": {
          structure: "intro-verse-prechorus-chorus-verse-prechorus-chorus-bridge-chorus-outro",
          instruments: "synthesizers, drum machines, electric guitar",
          themes: "excess, materialism, romance, power",
          style: "synth-pop, new wave, power ballads"
        },
        "1990s": {
          structure: "verse-chorus-verse-chorus-bridge-chorus-chorus",
          instruments: "alternative rock instruments, samples",
          themes: "relationships, angst, diversity",
          style: "teen pop, R&B influence, alternative edge"
        },
        "2000s": {
          structure: "intro-verse-prechorus-chorus-verse-prechorus-chorus-bridge-chorus-outro",
          instruments: "digital production, auto-tune, hip-hop beats",
          themes: "celebrity culture, relationships, empowerment",
          style: "highly produced, hip-hop influenced, electronic"
        },
        "2010s": {
          structure: "verse-prechorus-chorus-drop-verse-prechorus-chorus-bridge-chorus",
          instruments: "EDM elements, trap beats, vocal chops",
          themes: "social media, youth culture, empowerment",
          style: "EDM-pop, trap influence, festival-ready"
        },
        "2020s": {
          structure: "verse-prechorus-chorus-post-chorus-verse-prechorus-chorus-bridge-outro",
          instruments: "bedroom pop, lo-fi elements, vintage synths",
          themes: "mental health, authenticity, nostalgia",
          style: "genre-blending, vulnerable, retro-modern"
        }
      },
      "Rock": {
        "1950s": {
          structure: "12-bar blues, verse-chorus",
          instruments: "electric guitar, upright bass, drums",
          themes: "rebellion, cars, young love",
          style: "rockabilly, country influence, simple but energetic"
        },
        "1960s": {
          structure: "verse-chorus-verse-chorus-bridge-solo-chorus",
          instruments: "electric guitars, bass, drums, keyboards",
          themes: "social revolution, psychedelia, love and peace",
          style: "garage rock, psychedelic, folk rock"
        },
        "1970s": {
          structure: "intro-verse-chorus-verse-chorus-solo-bridge-chorus-outro",
          instruments: "electric guitars, bass, drums, keyboards",
          themes: "freedom, partying, social commentary",
          style: "hard rock, progressive rock, arena rock"
        },
        "1980s": {
          structure: "intro-verse-chorus-verse-chorus-solo-bridge-chorus-outro",
          instruments: "electric guitars, synthesizers, drums",
          themes: "excess, power, relationships",
          style: "hair metal, new wave rock, arena anthems"
        },
        "1990s": {
          structure: "verse-chorus-verse-chorus-bridge-solo-chorus",
          instruments: "distorted guitars, bass, drums, minimal production",
          themes: "alienation, angst, social issues",
          style: "grunge, alternative rock, punk revival"
        },
        "2000s": {
          structure: "intro-verse-chorus-verse-chorus-bridge-breakdown-chorus",
          instruments: "heavy guitars, electronic elements, samples",
          themes: "anger, relationships, social commentary",
          style: "nu-metal, emo, post-grunge"
        },
        "2010s": {
          structure: "verse-chorus-verse-chorus-bridge-breakdown-chorus",
          instruments: "guitars, electronic elements, orchestral arrangements",
          themes: "nostalgia, personal struggles, hope",
          style: "indie rock, electronic rock, stadium anthems"
        },
        "2020s": {
          structure: "verse-prechorus-chorus-verse-prechorus-chorus-bridge-outro",
          instruments: "vintage gear, modern production, genre fusion",
          themes: "authenticity, mental health, social justice",
          style: "genre-fusion, retro-modern, diverse influences"
        }
      }
    };

    const currentStyle = genreDecadeStyles[selectedGenre]?.[selectedDecade] || genreDecadeStyles["Pop"]["2020s"];
    
    // Generate more sophisticated lyrics based on the era and genre
    const songSections = generateSongSections(keywordList, currentStyle, selectedGenre, selectedDecade);
    
    return `🎵 "${songSections.title}" 🎵
${selectedGenre} • ${selectedDecade}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎼 STYLE NOTES:
• Genre: ${selectedGenre} (${selectedDecade} era)
• Instruments: ${currentStyle.instruments}
• Vibe: ${currentStyle.style}
• Themes: ${currentStyle.themes}
• Structure: ${currentStyle.structure}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${songSections.lyrics}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎹 PRODUCTION NOTES:
${songSections.productionNotes}

🎤 VOCAL STYLE:
${songSections.vocalStyle}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Generated from keywords: ${keywordText}`;
  };

  const generateSongSections = (keywords: string[], style: any, genre: string, decade: string) => {
    const mainKeyword = keywords[0] || "dreams";
    const secondKeyword = keywords[1] || "hope";
    const thirdKeyword = keywords[2] || "time";
    
    const title = `${mainKeyword.charAt(0).toUpperCase() + mainKeyword.slice(1)} ${decade}`;
    
    const verses = {
      verse1: [
        `In the ${decade}, when ${mainKeyword} was all we knew`,
        `${secondKeyword} dancing in the ${thirdKeyword} so true`,
        `${genre} on the radio, filling up the night`,
        `Everything felt possible, everything felt right`
      ],
      verse2: [
        `${keywords[3] || "Stories"} from the ${decade}, echo in my mind`,
        `${keywords[4] || "Memories"} of ${mainKeyword}, the ${secondKeyword} we'd find`,
        `Those ${genre} rhythms calling, through the ${keywords[5] || "darkness"} clear`,
        `Taking us back to when ${keywords[6] || "love"} cast away all fear`
      ]
    };

    const chorus = [
      `We are the children of ${decade}`,
      `${mainKeyword} and ${secondKeyword} in our ${genre} parade`,
      `${thirdKeyword} can't erase the ${keywords[7] || "feeling"} that we made`,
      `Forever young in ${decade}, never gonna fade`
    ];

    const bridge = [
      `When the world gets heavy, and the ${keywords[4] || "music"} seems to die`,
      `We remember ${decade}, we remember ${mainKeyword} in the sky`
    ];

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
${chorus.join('\n')}
(${mainKeyword} in ${decade})
(Never gonna fade away)`;

    const productionNotes = getProductionNotes(genre, decade);
    const vocalStyle = getVocalStyle(genre, decade);

    return { title, lyrics, productionNotes, vocalStyle };
  };

  const getProductionNotes = (genre: string, decade: string) => {
    const productionMap = {
      "Pop": {
        "1950s": "Record with analog equipment, add subtle reverb, keep it clean and simple",
        "1960s": "Layer vocal harmonies, use vintage reverb, add orchestral strings",
        "1970s": "Disco beat, string sections, rich bass lines, dance-ready mix",
        "1980s": "Heavy use of synthesizers, gated reverb on drums, polished production",
        "1990s": "Crisp digital production, strong beat, pop-rock elements",
        "2000s": "Auto-tune effects, hip-hop influenced beats, heavily compressed",
        "2010s": "EDM drops, electronic elements, festival-ready sound",
        "2020s": "Lo-fi textures, vintage warmth, bedroom pop aesthetics"
      },
      "Rock": {
        "1950s": "Raw recording, simple mic setup, live room sound",
        "1960s": "Experimental studio techniques, feedback, psychedelic effects",
        "1970s": "Big drum sounds, guitar solos, arena rock production",
        "1980s": "Reverb-heavy, powerful drums, layered guitars",
        "1990s": "Raw, distorted sound, minimal overdubs, authentic feel",
        "2000s": "Heavily processed, nu-metal crunch, electronic elements",
        "2010s": "Modern clarity, electronic integration, stadium sound",
        "2020s": "Analog warmth meets digital precision, diverse sonic palette"
      }
    };

    return productionMap[genre]?.[decade] || "Modern production with vintage inspiration";
  };

  const getVocalStyle = (genre: string, decade: string) => {
    const vocalMap = {
      "Pop": {
        "1950s": "Clean, innocent delivery with subtle vibrato",
        "1960s": "Harmony-rich, influenced by Motown and British invasion",
        "1970s": "Disco-influenced, powerful and soulful",
        "1980s": "Dramatic, often with reverb and effects",
        "1990s": "Emotional range, from whisper to power vocals",
        "2000s": "Polished with auto-tune, confident delivery",
        "2010s": "Electronic processing, trap-influenced rhythm",
        "2020s": "Authentic, vulnerable, conversational style"
      },
      "Rock": {
        "1950s": "Energetic, slightly rough around the edges",
        "1960s": "Experimental, psychedelic influence, varied dynamics",
        "1970s": "Powerful, arena-ready, blues-influenced",
        "1980s": "Theatrical, hair metal screams, anthemic",
        "1990s": "Raw emotion, grunge growl, authentic angst",
        "2000s": "Aggressive, nu-metal influenced, electronic processed",
        "2010s": "Modern rock clarity, emotional depth",
        "2020s": "Genre-blending approach, authentic expression"
      }
    };

    return vocalMap[genre]?.[decade] || "Contemporary style with period influences";
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
        <CardDescription>Advanced AI song generation with era-specific styling</CardDescription>
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
