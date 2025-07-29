import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export async function generateSummary(text: string) {
  const res = await openai.createChatCompletion({
    model: 'gpt-4',
    messages: [
      { role: 'system', content: 'You are an expert at summarizing academic content for students.' },
      { role: 'user', content: `Summarize the following text into clear, concise study notes:\n${text}` },
    ],
    max_tokens: 1024,
  });
  return res.data.choices[0].message?.content || '';
}

export async function generateFlashcards(text: string) {
  const res = await openai.createChatCompletion({
    model: 'gpt-4',
    messages: [
      { role: 'system', content: 'You are an expert at creating flashcards for students.' },
      { role: 'user', content: `Create a set of 10 Q&A flashcards from the following text:\n${text}` },
    ],
    max_tokens: 1024,
  });
  return res.data.choices[0].message?.content || '';
}

export async function generateMindMap(text: string) {
  const res = await openai.createChatCompletion({
    model: 'gpt-4',
    messages: [
      { role: 'system', content: 'You are an expert at creating mind maps for students.' },
      { role: 'user', content: `Generate a hierarchical mind map (as JSON) for the following text:\n${text}` },
    ],
    max_tokens: 1024,
  });
  return res.data.choices[0].message?.content || '';
} 