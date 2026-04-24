import Anthropic from '@anthropic-ai/sdk';
import { DIAGNOSTICO_PROMPT } from './prompts';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
});

export async function generateDiagnostic(data: any) {
  if (!process.env.ANTHROPIC_API_KEY) {
    throw new Error('ANTHROPIC_API_KEY is not defined');
  }

  const prompt = `
    ${DIAGNOSTICO_PROMPT}

    CLIENT DATA FOR DIAGNOSTIC:
    - Name: ${data.nombre}
    - Company: ${data.empresa || 'N/A'}
    - Role: ${data.rol || 'N/A'}
    - App Type: ${data.tipo.join(', ')}
    - Current Scale: ${data.usuariosActuales}
    - Expected Peak: ${data.picoEsperado}
    - Tech Stack: ${JSON.stringify(data.stack)}
    - Critical Symptoms: ${data.sintomas.join(', ')}
    - Additional Context: "${data.contexto || 'No additional comments'}"

    Respond ONLY with the structured JSON object.
  `;

  const message = await anthropic.messages.create({
    model: "claude-3-5-sonnet-20240620",
    max_tokens: 4000,
    messages: [
      { role: "user", content: prompt }
    ],
  });

  const content = message.content[0].type === 'text' ? message.content[0].text : '';
  
  try {
    // Extract JSON if Claude adds conversational text
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    throw new Error("No valid JSON found in AI response");
  } catch (e) {
    console.error("AI Parse Error:", e);
    console.log("Raw content:", content);
    throw e;
  }
}
