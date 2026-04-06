import PDFDocument from 'pdfkit';

/**
 * Genera un PDF profesional de 3 páginas basado en el diagnóstico de la IA.
 * @param {Object} qaData El JSON de respuesta de Anthropic
 * @param {Object} userData Datos del usuario (nombre, empresa)
 * @returns {Promise<Buffer>}
 */
export async function generateDiagnosticPDF(qaData: any, userData: any): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({
        size: 'A4',
        margins: { top: 60, bottom: 60, left: 60, right: 60 },
        bufferPages: true
      });

      const buffers: Buffer[] = [];
      doc.on('data', (chunk) => buffers.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(buffers)));

      // Colors
      const primaryColor = '#0071e3';
      const secondaryColor = '#1d1d1f';
      const mutedColor = '#86868b';
      
      const scoreColor = qaData.score <= 40 ? '#ff453a' : 
                         qaData.score <= 65 ? '#ff9f0a' : 
                         qaData.score <= 80 ? '#0071e3' : '#34c759';

      const today = new Date().toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' });

      // ================================= PAGE 1: PORTADA =================================
      // Header
      doc.fontSize(12).fillColor(mutedColor).text('Carlos Cervantes · QA & Performance Consulting', 60, 60);
      
      // Main Content
      doc.moveDown(6);
      doc.fontSize(42).fillColor(secondaryColor).text('Diagnóstico QA', { align: 'center', characterSpacing: -1 });
      doc.moveDown(0.2);
      doc.fontSize(20).fillColor(mutedColor).text(`${userData.nombre} · ${userData.empresa || 'Análisis de Proyecto'}`, { align: 'center' });
      
      doc.moveDown(3);
      
      // Score Circle
      const scoreX = 297;
      const scoreY = (doc as any).y + 70;
      doc.circle(scoreX, scoreY, 65).lineWidth(10).stroke(scoreColor);
      doc.fontSize(54).fillColor(secondaryColor).text(qaData.score.toString(), scoreX - 50, scoreY - 25, { width: 100, align: 'center' });
      
      doc.moveDown(7);
      doc.fontSize(24).fillColor(scoreColor).text(qaData.scoreLabel, { align: 'center' });
      doc.moveDown(1);
      doc.fontSize(13).fillColor(secondaryColor).text(qaData.resumen || qaData.resumenEjecutivo || '', { align: 'center', width: 400, lineGap: 4 });
      
      // Bottom Badge
      doc.moveDown(4);
      doc.rect(150, (doc as any).y, 290, 30).fill('#f2f2f7');
      doc.fontSize(10).fillColor(mutedColor).text('Confidencial · Generado por IA · Revisado por Carlos Cervantes', 150, (doc as any).y + 10, { align: 'center', width: 290 });

      // ================================= PAGE 2: ANÁLISIS =================================
      doc.addPage();
      
      doc.fontSize(28).fillColor(secondaryColor).text('Riesgos Identificados', 60, 60);
      doc.moveDown(1.5);
      
      (qaData.riesgos || []).forEach((riesgo: any) => {
          const startY = (doc as any).y;
          
          // Severity Badge
          const badgeColor = riesgo.severidad === 'CRÍTICO' || riesgo.severidad === 'Critica' ? '#ff453a' : 
                            riesgo.severidad === 'ALTO' || riesgo.severidad === 'Alta' ? '#ff9f0a' : '#0071e3';
          
          doc.rect(60, startY, 70, 20).fill(badgeColor);
          doc.fontSize(9).fillColor('#ffffff').text(riesgo.severidad, 60, startY + 6, { width: 70, align: 'center' });
          
          doc.fontSize(15).fillColor(secondaryColor).text(riesgo.titulo, 145, startY, { characterSpacing: -0.5 });
          doc.fontSize(10).fillColor(mutedColor).text(`Módulo: ${riesgo.modulo}`, 145, startY + 18);
          doc.fontSize(11).fillColor(secondaryColor).text(riesgo.descripcion, 145, startY + 32, { width: 390, lineGap: 2 });
          
          doc.moveDown(2);
      });

      doc.moveDown(2);
      doc.fontSize(28).fillColor(secondaryColor).text('Recomendaciones Pro');
      doc.moveDown(1);
      
      (qaData.recomendaciones || []).forEach((rec: any, idx: number) => {
          doc.fontSize(16).fillColor(primaryColor).text(`${idx + 1}. ${rec.titulo}`);
          doc.fontSize(10).fillColor(mutedColor).text(`Impacto: ${rec.impacto} | Tiempo: ${rec.tiempo}`);
          doc.moveDown(0.2);
          doc.fontSize(11).fillColor(secondaryColor).text(rec.descripcion, { width: 475, lineGap: 1.5 });
          doc.moveDown(1);
      });

      // ================================= PAGE 3: PLAN & CIERRE =================================
      doc.addPage();
      
      doc.fontSize(28).fillColor(secondaryColor).text('Plan de Acción Sugerido', 60, 60);
      doc.moveDown(2);

      (qaData.planDeAccion || []).forEach((plan: any, idx: number) => {
          const posY = (doc as any).y;
          // Timeline dot and line
          doc.circle(80, posY + 10, 5).fill(primaryColor);
          if (idx < (qaData.planDeAccion.length - 1)) {
              doc.moveTo(80, posY + 15).lineTo(80, posY + 80).lineWidth(1).stroke(primaryColor);
          }
          
          doc.fontSize(14).fillColor(primaryColor).text(plan.periodo, 110, posY);
          doc.fontSize(15).fillColor(secondaryColor).text(plan.hito, 210, posY);
          doc.fontSize(11).fillColor(secondaryColor).text(plan.descripcion, 210, (doc as any).y + 4, { width: 320, lineGap: 2 });
          
          doc.moveDown(3);
      });

      doc.moveDown(2);
      doc.rect(60, (doc as any).y, 475, 120).fill('#f2f2f7');
      
      let nextStepY = (doc as any).y + 20;
      doc.fontSize(18).fillColor(secondaryColor).text('Siguiente paso recomendado', 80, nextStepY);
      doc.moveDown(0.5);
      doc.fontSize(14).fillColor(primaryColor).text(`Paquete: ${qaData.paqueteRecomendado.toUpperCase()}`, 80);
      doc.moveDown(0.5);
      doc.fontSize(11).fillColor(secondaryColor).text('Podemos iniciar con este análisis detallado la próxima semana.', 80, (doc as any).y, { width: 430 });
      doc.moveDown(0.5);
      doc.fontSize(11).fillColor(primaryColor).text('Escríbeme: carlos.cervart@icloud.com', { link: 'mailto:carlos.cervart@icloud.com' });

      // Footer numbering and branding
      const range = doc.bufferedPageRange();
      for (let i = 0; i < range.count; i++) {
        doc.switchToPage(i);
        doc.fontSize(8).fillColor(mutedColor).text(
          '© 2026 Carlos Cervantes · Servicios de Calidad y Performance Engineering · Reporte confidencial para uso interno.',
          60, 
          doc.page.height - 40, 
          { align: 'center' }
        );
        doc.text(`Página ${i + 1} de ${range.count}`, 60, doc.page.height - 50, { align: 'right', width: 475 });
      }

      doc.end();
    } catch (error) {
      reject(error);
    }
  });
}
