import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Music, Headphones, Sparkles, Wand2 } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const Index = () => {
  const [prompt, setPrompt] = useState("");
  const [keywords, setKeywords] = useState("");
  const [genre, setGenre] = useState("");
  const [decade, setDecade] = useState("");
  const [generatedSong, setGeneratedSong] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const genres = [
    "Pop", "Rock", "Hip-Hop", "R&B", "Country", "Jazz", "Blues", 
    "Folk", "Electronic", "Reggae", "Punk", "Metal", "Disco", "Funk"
  ];

  const decades = [
    "1950s", "1960s", "1970s", "1980s", "1990s", "2000s", "2010s", "2020s"
  ];

  const extractKeywords = (text: string) => {
    const commonWords = ['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'is', 'was', 'are', 'were', 'be', 'been', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should'];
    const words = text.toLowerCase().split(/\s+/).filter(word => 
      word.length > 2 && !commonWords.includes(word) && /^[a-zA-Z]+$/.test(word)
    );
    return [...new Set(words)].slice(0, 8).join(", ");
  };

  const handlePromptChange = (value: string) => {
    setPrompt(value);
    if (value.trim()) {
      const extractedKeywords = extractKeywords(value);
      setKeywords(extractedKeywords);
    } else {
      setKeywords("");
    }
  };

  const generateSong = async () => {
    if (!prompt || !genre || !decade) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields before generating a song.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    try {
      const response = await fetch('http://localhost:3001/api/generate-song', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          keywords: keywords || prompt,
          genre,
          decade
        })
      });

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      setGeneratedSong(data.song);
      toast({
        title: "Song Generated!",
        description: `Created a ${genre} song in ${decade} style.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to generate song",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const generateSongContent = (keywordText: string, selectedGenre: string, selectedDecade: string) => {
    const keywordList = keywordText.split(",").map(k => k.trim()).filter(k => k);
    
    const genreStyles = {
      "Pop": {
        "1950s": { structure: "verse-chorus-verse-chorus-bridge-chorus", vibe: "innocent, catchy, simple" },
        "1960s": { structure: "verse-chorus-verse-chorus-middle8-chorus", vibe: "upbeat, harmonious, British invasion" },
        "1970s": { structure: "verse-chorus-verse-chorus-bridge-chorus-outro", vibe: "disco-influenced, danceable, glamorous" },
        "1980s": { structure: "intro-verse-prechorus-chorus-verse-prechorus-chorus-bridge-chorus-outro", vibe: "synth-heavy, energetic, larger-than-life" },
        "1990s": { structure: "verse-chorus-verse-chorus-bridge-chorus-chorus-outro", vibe: "emotional, diverse, experimental" },
        "2000s": { structure: "intro-verse-prechorus-chorus-verse-prechorus-chorus-bridge-chorus-outro", vibe: "polished, hip-hop influenced, auto-tuned" },
        "2010s": { structure: "verse-prechorus-chorus-verse-prechorus-chorus-bridge-chorus-outro", vibe: "electronic, drop-heavy, social media aware" },
        "2020s": { structure: "verse-prechorus-chorus-post-chorus-verse-prechorus-chorus-bridge-outro", vibe: "genre-blending, vulnerable, authentic" }
      },
      "Rock": {
        "1950s": { structure: "verse-chorus-verse-chorus-solo-chorus", vibe: "rebellious, simple, rhythm-focused" },
        "1960s": { structure: "verse-chorus-verse-chorus-bridge-solo-chorus", vibe: "experimental, psychedelic, revolutionary" },
        "1970s": { structure: "intro-verse-chorus-verse-chorus-solo-bridge-chorus-outro", vibe: "heavy, progressive, arena-ready" },
        "1980s": { structure: "intro-verse-chorus-verse-chorus-solo-bridge-chorus-outro", vibe: "anthemic, hair metal, powerful" },
        "1990s": { structure: "verse-chorus-verse-chorus-bridge-solo-chorus-outro", vibe: "grunge, alternative, raw emotion" },
        "2000s": { structure: "intro-verse-chorus-verse-chorus-bridge-solo-chorus-outro", vibe: "nu-metal, emo, commercial" },
        "2010s": { structure: "verse-chorus-verse-chorus-bridge-breakdown-chorus", vibe: "indie, revival, atmospheric" },
        "2020s": { structure: "verse-prechorus-chorus-verse-prechorus-chorus-bridge-outro", vibe: "genre-fusion, nostalgic, diverse" }
      }
    };

    const style = genreStyles[selectedGenre]?.[selectedDecade] || genreStyles["Pop"]["2020s"];
    
    const verses = [
      `In the world of ${keywordList[0] || "dreams"}, where ${keywordList[1] || "hope"} shines bright`,
      `${keywordList[2] || "Time"} keeps moving, ${keywordList[3] || "love"} takes flight`,
      `Through the ${selectedDecade} we remember, ${keywordList[4] || "music"} in our souls`,
      `${selectedGenre} rhythms calling, making us whole`
    ];

    const chorus = [
      `We are the ${keywordList[0] || "dreamers"}, living in ${selectedDecade}`,
      `${selectedGenre} in our hearts, never to fade`,
      `${keywordList[1] || "Dancing"} through the ${keywordList[2] || "night"}, feeling so ${keywordList[3] || "alive"}`,
      `This is our ${keywordList[4] || "moment"}, this is our time to thrive`
    ];

    const bridge = [
      `When the ${keywordList[5] || "world"} gets heavy, and the ${keywordList[6] || "road"} seems long`,
      `We remember this ${keywordList[7] || "feeling"}, we remember this song`
    ];

    return `Title: "${keywordList[0] || "Untitled"} (${selectedDecade} ${selectedGenre})"

Style: ${style.vibe}
Structure: ${style.structure}

[Verse 1]
${verses[0]}
${verses[1]}

[Chorus]
${chorus[0]}
${chorus[1]}
${chorus[2]}
${chorus[3]}

[Verse 2]
${verses[2]}
${verses[3]}

[Chorus]
${chorus[0]}
${chorus[1]}
${chorus[2]}
${chorus[3]}

[Bridge]
${bridge[0]}
${bridge[1]}

[Final Chorus]
${chorus[0]}
${chorus[1]}
${chorus[2]}
${chorus[3]}

---
Generated with keywords: ${keywordText}
Genre: ${selectedGenre} | Era: ${selectedDecade}`;
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-pink-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-48 h-48 bg-purple-400/10 rounded-full blur-2xl animate-pulse delay-500"></div>
        <div className="absolute top-1/3 right-1/3 w-32 h-32 bg-cyan-400/20 rounded-full blur-xl"></div>
        <div className="absolute bottom-1/3 left-1/2 w-40 h-40 bg-yellow-400/10 rounded-full blur-2xl"></div>
      </div>
      
      <div className="relative z-10 p-6 md:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center space-y-8 mb-16 group">
            <div className="space-y-4">
              <h1 className="text-6xl md:text-7xl font-thin text-white tracking-tight">
                Artist creation,
              </h1>
              <h2 className="text-6xl md:text-7xl font-bold text-white tracking-tight">
                with AI On artist
              </h2>
            </div>
            <p className="text-xl text-white/80 max-w-2xl mx-auto font-light leading-relaxed">
              Transform your creative vision into unique songs with AI-powered generation. 
              Simply describe your concept and watch it come to life.
            </p>
            <div className="flex items-center justify-center gap-4 pt-4">
              <Button className="glass-button-3d px-8 py-3 text-lg font-medium">
                <Wand2 className="h-5 w-5 mr-2" />
                Start Creating
              </Button>
              <Button 
                variant="outline" 
                className="glass-button-secondary-3d px-8 py-3 text-lg font-light opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                Learn More
              </Button>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Input Section */}
            <div className="glass-card-3d group">
              <div className="p-8">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
                    <Sparkles className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">Song Input</h3>
                    <p className="text-white/70 font-light">Describe your song concept</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="space-y-3">
                    <Label htmlFor="prompt" className="text-white font-medium">Song Prompt</Label>
                    <Textarea
                      id="prompt"
                      placeholder="Describe your song concept, story, or theme..."
                      value={prompt}
                      onChange={(e) => handlePromptChange(e.target.value)}
                      rows={4}
                      className="glass-input-3d text-white placeholder:text-white/50 bg-white/10 backdrop-blur-md border-white/20"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="keywords" className="text-white font-medium">Keywords</Label>
                    <Input
                      id="keywords"
                      placeholder="Keywords will be extracted automatically..."
                      value={keywords}
                      onChange={(e) => setKeywords(e.target.value)}
                      className="glass-input-3d text-white placeholder:text-white/50 bg-white/10 backdrop-blur-md border-white/20"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label className="text-white font-medium">Genre</Label>
                      <Select value={genre} onValueChange={setGenre}>
                        <SelectTrigger className="glass-input-3d text-white bg-white/10 backdrop-blur-md border-white/20">
                          <SelectValue placeholder="Select genre" />
                        </SelectTrigger>
                        <SelectContent className="glass-dropdown-3d">
                          {genres.map((g) => (
                            <SelectItem key={g} value={g} className="text-white hover:bg-white/10 focus:bg-white/10">{g}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-3">
                      <Label className="text-white font-medium">Decade</Label>
                      <Select value={decade} onValueChange={setDecade}>
                        <SelectTrigger className="glass-input-3d text-white bg-white/10 backdrop-blur-md border-white/20">
                          <SelectValue placeholder="Select decade" />
                        </SelectTrigger>
                        <SelectContent className="glass-dropdown-3d">
                          {decades.map((d) => (
                            <SelectItem key={d} value={d} className="text-white hover:bg-white/10 focus:bg-white/10">{d}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Button 
                    onClick={generateSong}
                    disabled={isGenerating}
                    className="glass-button-3d w-full py-6 text-lg font-medium"
                  >
                    {isGenerating ? (
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Generating...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Music className="h-5 w-5" />
                        Generate Song
                      </div>
                    )}
                  </Button>
                </div>
              </div>
            </div>

            {/* Output Section */}
            <div className="glass-card-3d group">
              <div className="p-8">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl">
                    <Headphones className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">Generated Song</h3>
                    <p className="text-white/70 font-light">Your AI-created masterpiece</p>
                  </div>
                </div>

                <div className="glass-content-3d">
                  {generatedSong ? (
                    <pre className="text-white/90 font-mono text-sm whitespace-pre-wrap">{generatedSong}</pre>
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-white/50 text-lg">Your generated song will appear here</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index; 