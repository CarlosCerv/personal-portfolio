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

    DATOS DEL CLIENTE PARA EL DIAGNÓSTICO:
    - Nombre: ${data.nombre}
    - Empresa: ${data.empresa || 'N/A'}
    - Rol: ${data.rol || 'N/A'}
    - Tipo de App: ${data.tipo.join(', ')}
    - Escala Actual: ${data.usuariosActuales}
    - Pico Esperado: ${data.picoEsperado}
    - Tech Stack: ${JSON.stringify(data.stack)}
    - Síntomas Críticos: ${data.sintomas.join(', ')}
    - Contexto Adicional: "${data.contexto || 'Sin comentarios adicionales'}"

    Responde ÚNICAMENTE con el objeto JSON estructurado.
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
