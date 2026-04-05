// lib/diagnostico-prompt.js
const { Anthropic } = require('@anthropic-ai/sdk');

// Validate env vars earlier
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || 'dummy_key_to_prevent_crash',
});

const SYSTEM_PROMPT = `Eres Carlos Cervantes, Senior QA Consultant con 6+ años, actualmente Performance Test Engineer en Wizeline.
Has trabajado con proyectos de 50M+ usuarios en real estate, e-commerce, salud y fintech.

Analiza el siguiente caso de software y genera un diagnóstico estructurado en formato JSON. Responde ÚNICAMENTE con JSON válido, sin texto previo ni markdown.

CRITERIOS PARA EL QA SCORE (0-100):
- Sin CI/CD: resta 25 puntos
- Sin pruebas automatizadas: resta 30 puntos
- Alta escala sin pruebas de carga: resta 20 puntos
- Bugs frecuentes en producción: resta 15 puntos
- Stack complejo sin cobertura: resta 10 puntos
- Stack maduro con CI/CD: suma 20 puntos
- Pruebas automatizadas existentes: suma 25 puntos
- Equipo con experiencia QA: suma 15 puntos
- (El score debe estar entre 0 y 100)

BENCHMARK POR INDUSTRIA (industryAvg):
- E-commerce: 68
- FinTech: 75
- HealthTech: 72
- SaaS/Web: 60
- Mobile: 63
- API/Backend: 65

Responde SOLO con este JSON exacto:
{
  "score": number,
  "scoreLabel": string,
  "industryAvg": number,
  "riesgos": [
    {
      "titulo": string,
      "descripcion": string,
      "severidad": "CRÍTICO" | "ALTO" | "MEDIO",
      "modulo": string
    }
  ],
  "recomendaciones": [
    {
      "titulo": string,
      "impacto": "ALTO" | "MEDIO" | "BAJO",
      "tiempo": string,
      "descripcion": string
    }
  ],
  "planDeAccion": [
    {
      "periodo": string,
      "hito": string,
      "descripcion": string
    }
  ],
  "paqueteRecomendado": "diagnostico" | "automatizacion" | "performance",
  "resumenEjecutivo": string
}`;

async function generateDiagnostic(data) {
  if (!process.env.ANTHROPIC_API_KEY) {
    throw new Error("ANTHROPIC_API_KEY is not set in environment variables.");
  }

  const userMessage = `Por favor, evalúa este perfil de proyecto:
- Tipo: ${data.tipo.join(', ')}
- Usuarios Actuales: ${data.usuariosActuales}
- Pico Esperado: ${data.picoEsperado}
- Stack Frontend/Mobile: ${data.stack.frontend.join(', ')}
- Stack Backend/API: ${data.stack.backend.join(', ')}
- Stack CI/CD & Testing: ${data.stack.cicd.join(', ')}
- Síntomas Actuales: ${data.sintomas.join(', ')}
- Contexto Adicional: ${data.contexto || 'Ninguno'}
- Empresa/Industria: ${data.empresa || 'General'}`;

  const response = await anthropic.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 1500,
    temperature: 0.2, // Low temp for structured JSON
    system: SYSTEM_PROMPT,
    messages: [
      { role: 'user', content: userMessage }
    ]
  });

  const responseText = response.content[0].text;
  
  try {
    // Attempt to parse the response as JSON. In case Claude wraps it in ```json, strip it
    let cleanedText = responseText.trim();
    if (cleanedText.startsWith('```json')) cleanedText = cleanedText.substring(7);
    if (cleanedText.startsWith('```')) cleanedText = cleanedText.substring(3);
    if (cleanedText.endsWith('```')) cleanedText = cleanedText.slice(0, -3);
    
    return JSON.parse(cleanedText.trim());
  } catch (error) {
    console.error("Failed to parse JSON from Claude:", responseText);
    throw new Error("Invalid response format from AI");
  }
}

module.exports = {
  generateDiagnostic
};
