import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: ['http://localhost:8080', 'http://127.0.0.1:8080'], // Allow both localhost and 127.0.0.1
  methods: ['GET', 'POST', 'OPTIONS'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Song generation endpoint
app.post('/api/generate-song', async (req, res) => {
  try {
    const { keywords, genre, decade } = req.body;

    if (!keywords || !genre || !decade) {
      return res.status(400).json({ 
        error: 'Missing required parameters',
        details: { keywords, genre, decade }
      });
    }

    console.log('Generating song with:', { keywords, genre, decade });

    // Create a prompt that incorporates the genre and decade characteristics
    const prompt = `Create a ${genre} song from the ${decade} with the following keywords: ${keywords}. 
    Include:
    1. A catchy title
    2. Complete lyrics with verses, chorus, and bridge
    3. Musical style notes specific to ${genre} in the ${decade}
    4. Production notes that capture the era's sound
    5. Performance style guidance
    
    Format the response with clear sections and maintain the authentic style of ${genre} music from the ${decade}.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        {
          role: "system",
          content: "You are a professional songwriter and music producer with deep knowledge of music history and production techniques across different eras and genres."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.8,
      max_tokens: 2000,
    });

    const generatedSong = completion.choices[0].message.content;
    console.log('Song generated successfully');

    res.json({ song: generatedSong });
  } catch (error) {
    console.error('Error generating song:', error);
    res.status(500).json({ 
      error: 'Failed to generate song',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`Health check available at http://localhost:${port}/api/health`);
}); 