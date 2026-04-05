// lib/pdf-generator.js
const PDFDocument = require('pdfkit');

/**
 * Genera un PDF estructurado con base en los datos de la IA
 * @param {Object} qaData El JSON de respuesta de Anthropic
 * @param {Object} userData Datos del usuario (nombre, empresa)
 * @returns {Promise<Buffer>}
 */
function generateDiagnosticPDF(qaData, userData) {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({
        size: 'A4',
        margins: { top: 50, bottom: 50, left: 50, right: 50 },
        bufferPages: true
      });

      const buffers = [];
      doc.on('data', buffers.push.bind(buffers));
      doc.on('end', () => resolve(Buffer.concat(buffers)));

      const primaryColor = '#0071e3';
      const textDark = '#1d1d1f';
      const textMuted = '#86868b';
      
      const scoreColor = qaData.score <= 40 ? '#ff453a' : 
                         qaData.score <= 65 ? '#ff9f0a' : 
                         qaData.score <= 80 ? '#0071e3' : '#34c759';

      const today = new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });

      // ---- PAGE 1: PORTADA ----
      doc.fontSize(14).fillColor(textMuted).text('Carlos Cervantes', 50, 50);
      
      doc.moveDown(4);
      doc.fontSize(36).fillColor(textDark).text('Diagnóstico QA', { align: 'center' });
      doc.fontSize(18).fillColor(textMuted).text(`${userData.nombre} · ${userData.empresa || 'Reporte de proyecto'}`, { align: 'center' });
      
      doc.moveDown(2);
      
      // Score Circle (Simulated with text/rects)
      const currentY = doc.y;
      doc.circle(297, currentY + 60, 60).lineWidth(8).stroke(scoreColor);
      doc.fontSize(48).fillColor(textDark).text(qaData.score.toString(), 250, currentY + 40, { width: 95, align: 'center' });
      
      doc.moveDown(6);
      doc.fontSize(20).fillColor(scoreColor).text(qaData.scoreLabel, { align: 'center' });
      
      doc.moveDown(1);
      doc.fontSize(12).fillColor(textDark).text(qaData.resumenEjecutivo, { align: 'center', width: 400, indent: 47 }); // Basic centering approximation
      // proper centering for block of text
      doc.text('', 0, doc.y);
      doc.text(qaData.resumenEjecutivo, 100, doc.y, { width: 395, align: 'center' });
      
      doc.moveDown(8);
      doc.fontSize(10).fillColor(textMuted).text(`Generado: ${today}`, { align: 'center' });
      doc.text('Confidencial · Generado por IA · Revisado por Carlos Cervantes', { align: 'center' });

      // ---- PAGE 2: ANÁLISIS ----
      doc.addPage();
      
      doc.fontSize(24).fillColor(textDark).text('Riesgos identificados', 50, 60);
      doc.moveDown(1);
      
      let yPos = doc.y;
      qaData.riesgos.forEach(riesgo => {
        // Warning badge
        doc.rect(50, yPos, 80, 20).fill(textMuted.replace('86868b', 'e8e8ed'));
        doc.fontSize(10).fillColor(textDark).text(riesgo.severidad, 55, yPos + 5);
        
        doc.fontSize(14).fillColor(textDark).text(riesgo.titulo, 140, yPos);
        doc.fontSize(11).fillColor(textMuted).text(`Módulo: ${riesgo.modulo}`, 140, yPos + 18);
        doc.fontSize(12).fillColor(textDark).text(riesgo.descripcion, 140, yPos + 35, { width: 400 });
        
        yPos = doc.y + 20;
      });

      doc.y = yPos + 20;
      doc.fontSize(24).fillColor(textDark).text('Top 3 Recomendaciones');
      doc.moveDown(1);
      
      qaData.recomendaciones.forEach((rec, idx) => {
        doc.fontSize(14).fillColor(primaryColor).text(`${idx + 1}. ${rec.titulo}`);
        doc.fontSize(10).fillColor(textMuted).text(`Impacto: ${rec.impacto} | Tiempo: ${rec.tiempo}`);
        doc.fontSize(12).fillColor(textDark).text(rec.descripcion, { width: 495 });
        doc.moveDown(1);
      });

      // ---- PAGE 3: PLAN Y NEXT STEPS ----
      doc.addPage();
      
      doc.fontSize(24).fillColor(textDark).text('Plan de Acción Sugerido', 50, 60);
      doc.moveDown(1);

      qaData.planDeAccion.forEach((plan) => {
        doc.fontSize(14).fillColor(primaryColor).text(plan.periodo);
        doc.fontSize(14).fillColor(textDark).text(plan.hito, 150, doc.y - 16);
        doc.fontSize(12).fillColor(textDark).text(plan.descripcion, 150, doc.y + 5, { width: 395 });
        doc.moveDown(1.5);
      });

      doc.moveDown(2);
      doc.rect(50, doc.y, 495, 2).fill(primaryColor);
      doc.moveDown(2);

      doc.fontSize(20).fillColor(textDark).text('Siguiente paso recomendado');
      doc.moveDown(0.5);
      doc.fontSize(14).fillColor(textDark).text(`Servicio ideal para ti: Paquete ${qaData.paqueteRecomendado.toUpperCase()}`);
      doc.moveDown(1);
      doc.fontSize(12).fillColor(textMuted).text('Contáctame para iniciar este plan o ajustar el alcance según tus necesidades:');
      doc.fontSize(12).fillColor(primaryColor).text('carlos.cervart@icloud.com', { link: 'mailto:carlos.cervart@icloud.com' });

      // Add Footer to all pages
      const pages = doc.bufferedPageRange();
      for (let i = 0; i < pages.count; i++) {
        doc.switchToPage(i);
        doc.page.margins.bottom = 0;
        doc.fontSize(9)
           .fillColor(textMuted)
           .text(
             '© 2026 Carlos Cervantes · QA & Performance Consultant · Este diagnóstico es orientativo.',
             50,
             doc.page.height - 40,
             { align: 'center', lineBreak: false }
           );
      }

      doc.end();
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = {
  generateDiagnosticPDF
};
