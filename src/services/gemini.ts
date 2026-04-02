const GEMINI_API_KEY = 'AIzaSyBnXcKbmmboHaDnKj4b-m5wSQ0sAXxv-QI';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';

export async function generateResponse(message: string): Promise<string> {
  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: message }] }],
        generationConfig: {
          maxOutputTokens: 8192,
          temperature: 0.7,
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      const errorMsg = errorData?.error?.message || `HTTP error ${response.status}`;
      console.error('API Error:', errorMsg);

      if (response.status === 429) {
        throw new Error('API quota exceeded. Please wait a moment and try again.');
      }
      if (errorMsg.includes('leaked')) {
        throw new Error('API key was flagged as leaked. Please generate a new Gemini API key from Google AI Studio.');
      }
      throw new Error(errorMsg);
    }

    const data = await response.json();

    if (data.candidates?.[0]?.content?.parts?.[0]?.text) {
      return data.candidates[0].content.parts[0].text;
    }

    throw new Error('No response generated. Please try again.');
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    throw error;
  }
}
