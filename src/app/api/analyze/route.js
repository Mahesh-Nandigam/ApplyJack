import { OpenAI } from 'openai';

// Vercel Hobby tier allows up to 60 seconds if explicitly set
export const maxDuration = 60;

const openai = new OpenAI({
  baseURL: 'https://integrate.api.nvidia.com/v1',
  apiKey: process.env.NVIDIA_API_KEY
});

const RESUME_DATA = `
Name: Mahesh
Current Skills: Python (20%), JavaScript (Expert), React (Advanced), HTML, CSS.
Experience: 2 years building modern web applications and UIs.
`;

export async function POST(req) {
  try {
    const { url } = await req.json();

    const systemPrompt = `You are Apply Jack, an incredibly smart, friendly, and highly personalized AI Career Coach. 
Your goal is to help your friend Mahesh decide if he should apply to a job and what he needs to learn.

Here is Mahesh's current profile:
${RESUME_DATA}

The user has provided a job application link: ${url}. 
(Since you cannot browse the web, infer the role from the URL. If it's generic, assume it's for a Full Stack or Frontend Engineering role that requires React, Node.js, and C++).

Your tone MUST be conversational, encouraging, and friendly. Address Mahesh directly. 
For example: "Hey Mahesh! I took a look at this job. It looks like a great fit because you know React, but I noticed they want C++. That's okay! You can apply now, and if you spend this month learning C++, you'll be golden..."

Do NOT hallucinate skills Mahesh doesn't have. Give accurate, constructive feedback based on his 20% Python knowledge. Give actionable advice on how to improve. Keep it concise, punchy, and highly readable (use bullet points or short paragraphs).`;

    const completion = await openai.chat.completions.create({
      model: "meta/llama-3.1-70b-instruct",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: `Please analyze this job link for me: ${url}` }
      ],
      temperature: 0.2,
      top_p: 0.7,
      max_tokens: 1024,
      stream: false
    });

    return new Response(JSON.stringify({ 
      success: true, 
      response: completion.choices[0].message.content 
    }), {
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
