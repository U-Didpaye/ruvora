import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { movies } from '@/data/movies';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const prompt = body?.prompt;

    if (!prompt || typeof prompt !== 'string' || prompt.trim() === '') {
      return NextResponse.json(
        { success: false, error: 'Please provide a valid movie prompt or title.' },
        { status: 400 }
      );
    }

    const trimmedPrompt = prompt.trim();
    const apiKey = process.env.OPENAI_API_KEY;

    // Check if the prompt matches any of our known 12 movies
    const matchedMovie = movies.find(
      (m) =>
        m.title.toLowerCase() === trimmedPrompt.toLowerCase() ||
        trimmedPrompt.toLowerCase().includes(m.title.toLowerCase()) ||
        m.slug.toLowerCase() === trimmedPrompt.toLowerCase()
    );

    // If OpenAI API Key is configured, attempt calling OpenAI API
    if (apiKey) {
      try {
        const openai = new OpenAI({ apiKey });

        const systemMessage = `You are RuvOra AI, a world-class film critic and movie intelligence expert.
Return a structured JSON object responding to the user's movie prompt with these exact keys:
- "title": string (Movie title)
- "year": string (Release year)
- "genres": array of strings (1-3 genres)
- "director": string (Director name)
- "runtime": string (e.g. "2h 49m")
- "overview": string (2-3 concise sentences summarizing plot and theme)
- "whyWatch": array of exactly 3 bullet points explaining why to watch
- "bestFor": array of exactly 3 bullet points listing ideal audiences
- "aiVerdict": string (2-3 sentences delivering the final authoritative verdict)

Respond ONLY with valid JSON. Do not include markdown code block formatting.`;

        const completion = await openai.chat.completions.create({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: systemMessage },
            { role: 'user', content: trimmedPrompt },
          ],
          response_format: { type: 'json_object' },
          temperature: 0.7,
        });

        const content = completion.choices[0]?.message?.content;
        if (content) {
          const parsed = JSON.parse(content);
          if (matchedMovie) {
            parsed.slug = matchedMovie.slug;
          }
          return NextResponse.json({ success: true, data: parsed });
        }
      } catch (openAiErr) {
        console.warn('OpenAI API call failed or misconfigured, using fallback engine:', openAiErr);
      }
    }

    // Fallback Engine when API Key is not present or API call fails
    if (matchedMovie) {
      return NextResponse.json({
        success: true,
        data: {
          title: matchedMovie.title,
          year: matchedMovie.year,
          genres: matchedMovie.genres,
          director: matchedMovie.director,
          runtime: matchedMovie.runtime,
          overview: matchedMovie.description,
          whyWatch: matchedMovie.whyWatch,
          bestFor: matchedMovie.bestFor,
          aiVerdict: matchedMovie.aiInsight,
          slug: matchedMovie.slug,
        },
      });
    }

    // Default fallback for custom or unknown prompts
    const fallbackMovie = movies[0]; // Interstellar default
    return NextResponse.json({
      success: true,
      data: {
        title: matchedMovie ? (matchedMovie as any).title : prompt.replace(/[^a-zA-Z0-9\s]/g, ''),
        year: '2024',
        genres: ['Sci-Fi', 'Drama'],
        director: 'Cinematic Master',
        runtime: '2h 15m',
        overview: `RuvOra AI has analyzed "${prompt}". This film explores ambitious narrative storytelling, captivating audio-visual direction, and powerful character dynamics.`,
        whyWatch: [
          'Masterclass in visual direction and atmospheric tension.',
          'Profound themes that resonate deeply beyond the screen.',
          'Exceptional lead performances and immersive sound design.',
        ],
        bestFor: [
          'Cinematic storytelling enthusiasts',
          'Viewers seeking high-concept drama',
          'RuvOra AI recommendation seekers',
        ],
        aiVerdict: `"${prompt}" stands out as an engaging cinematic experience that delivers emotional depth and technical mastery. Highly recommended for your watchlist.`,
        slug: fallbackMovie.slug,
      },
    });
  } catch (error: any) {
    console.error('API /api/movie handler error:', error);
    return NextResponse.json(
      { success: false, error: 'RuvOra AI is temporarily unavailable. Please try again later.' },
      { status: 500 }
    );
  }
}
