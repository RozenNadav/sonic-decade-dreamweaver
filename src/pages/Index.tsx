import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Music, Headphones } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import SongGenerator from "@/components/SongGenerator";

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
    // Simple keyword extraction - remove common words and split by spaces
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
      console.log('Sending request with:', { keywords: keywords || prompt, genre, decade });
      
      const response = await fetch('http://localhost:3001/api/generate-song', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          keywords: keywords || prompt,
          genre,
          decade,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error response:', errorData);
        throw new Error(errorData.details || 'Failed to generate song');
      }

      const data = await response.json();
      console.log('Received response:', data);
      setGeneratedSong(data.song);
      
      toast({
        title: "Song Generated!",
        description: `Created a ${genre} song in ${decade} style.`,
      });
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to generate song. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const generateSongContent = (keywordText: string, selectedGenre: string, selectedDecade: string) => {
    // Enhanced song generation logic based on genre and decade
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2">
            <Music className="h-8 w-8 text-purple-600" />
            <h1 className="text-4xl font-bold text-gray-900">AI Song Generator</h1>
            <Headphones className="h-8 w-8 text-purple-600" />
          </div>
          <p className="text-xl text-gray-600">Create unique songs based on your prompts, keywords, genre, and era</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Song Input</CardTitle>
              <CardDescription>Describe your song concept and preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="prompt">Song Prompt</Label>
                <Textarea
                  id="prompt"
                  placeholder="Describe your song concept, story, or theme..."
                  value={prompt}
                  onChange={(e) => handlePromptChange(e.target.value)}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="keywords">Extracted Keywords</Label>
                <Input
                  id="keywords"
                  placeholder="Keywords will be extracted automatically..."
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Genre</Label>
                  <Select value={genre} onValueChange={setGenre}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select genre" />
                    </SelectTrigger>
                    <SelectContent>
                      {genres.map((g) => (
                        <SelectItem key={g} value={g}>{g}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Decade</Label>
                  <Select value={decade} onValueChange={setDecade}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select decade" />
                    </SelectTrigger>
                    <SelectContent>
                      {decades.map((d) => (
                        <SelectItem key={d} value={d}>{d}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button 
                onClick={generateSong} 
                disabled={isGenerating} 
                className="w-full"
                size="lg"
              >
                {isGenerating ? "Generating Song..." : "Generate Song"}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Generated Song</CardTitle>
              <CardDescription>Your AI-generated song will appear here</CardDescription>
            </CardHeader>
            <CardContent>
              {generatedSong ? (
                <div className="space-y-4">
                  <pre className="whitespace-pre-wrap text-sm bg-gray-50 p-4 rounded-lg border overflow-auto max-h-96">
                    {generatedSong}
                  </pre>
                  <Button variant="outline" className="w-full">
                    Share Song
                  </Button>
                </div>
              ) : (
                <div className="text-center text-gray-500 py-8">
                  <Music className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Your generated song will appear here...</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
