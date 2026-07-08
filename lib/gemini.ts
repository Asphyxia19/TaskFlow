import * as ImageManipulator from "expo-image-manipulator";

const GEMINI_KEY = process.env.EXPO_PUBLIC_GEMINI_KEY;

const MODELS = ["gemini-2.5-flash", "gemini-2.5-flash-lite"];

function buildUrl(model: string) {
  return `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_KEY}`;
}

export async function imageToBase64(uri: string) {
  const manipulated = await ImageManipulator.manipulateAsync(
    uri,
    [{ resize: { width: 1024 } }],
    { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG, base64: true },
  );
  return manipulated.base64!;
}

async function callGemini(model: string, base64Image: string, prompt: string) {
  const response = await fetch(buildUrl(model), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [
        {
          parts: [
            { text: prompt },
            {
              inline_data: {
                mime_type: "image/jpeg",
                data: base64Image,
              },
            },
          ],
        },
      ],
    }),
  });

  const json = await response.json();
  return { status: response.status, json };
}

export async function analyzeImage(base64Image: string, prompt: string) {
  let lastResult: any = null;

  for (const model of MODELS) {
    const result = await callGemini(model, base64Image, prompt);
    lastResult = result;

    const isQuotaError =
      result.status === 429 ||
      result.json?.error?.status === "RESOURCE_EXHAUSTED";

    if (!isQuotaError) {
      return result.json;
    }
  }

  return lastResult.json;
}

export const ANALYSIS_PROMPT = `
Analyze this image. Identify:
1. Objects - list the distinct physical objects you see
2. Context - briefly describe the setting or scene
3. Activities - what activity appears to be happening, if any
4. Recommendations - one practical suggestion based on the scene

Respond ONLY with valid JSON in this exact shape, no extra text:
{
  "objects": ["...", "..."],
  "context": "...",
  "activities": "...",
  "recommendations": "..."
}
`;
