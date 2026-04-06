/* public/js/diagnostico.js */
document.addEventListener('DOMContentLoaded', () => {
    let currentStep = 0;
    const steps = document.querySelectorAll('.dw-step');
    const progressBarFill = document.getElementById('dwProgressFill');
    const stepLabel = document.getElementById('dwStepLabel');
    const dots = document.querySelectorAll('.dw-dot');
    
    // Core data structure
    const formData = {
      tipo: [],
      usuariosActuales: '',
      picoEsperado: '',
      stack: {
        frontend: [],
        backend: [],
        cicd: []
      },
      sintomas: [],
      contexto: '',
      nombre: '',
      email: '',
      empresa: '',
      rol: ''
    };

    const stepInfo = [
      "Paso 1 de 5 &middot; Tu aplicación",
      "Paso 2 de 5 &middot; Escala y usuarios",
      "Paso 3 de 5 &middot; Stack técnico",
      "Paso 4 de 5 &middot; Tu mayor problema",
      "Paso 5 de 5 &middot; Recibir diagnóstico"
    ];

    // --- NAVIGATION ENGINE ---

    function updateHeader() {
      const totalSteps = steps.length;
      const progressPct = ((currentStep + 1) / totalSteps) * 100;
      progressBarFill.style.width = `${progressPct}%`;
      stepLabel.innerHTML = stepInfo[currentStep];
      
      dots.forEach((dot, index) => {
        dot.classList.remove('completed', 'active');
        if (index < currentStep) {
          dot.classList.add('completed');
          dot.innerHTML = '✓';
        } else if (index === currentStep) {
          dot.classList.add('active');
          dot.innerHTML = '';
        } else {
          dot.innerHTML = '';
        }
      });
    }

    function goToStep(n) {
      if (n < 0 || n >= steps.length) return;
      
      steps[currentStep].classList.remove('active');
      steps[currentStep].hidden = true;
      
      currentStep = n;
      steps[currentStep].hidden = false;
      setTimeout(() => steps[currentStep].classList.add('active'), 50);
      
      updateHeader();
      window.scrollTo({ top: document.querySelector('.svc-diag-section').offsetTop - 100, behavior: 'smooth' });
    }

    function validateStep(n) {
      if (n === 0) return formData.tipo.length > 0;
      if (n === 1) return formData.usuariosActuales !== '' && formData.picoEsperado !== '';
      if (n === 2) return true; // Stack is optional but recommended
      if (n === 3) return formData.sintomas.length > 0;
      if (n === 4) {
        const name = document.getElementById('dwNombre').value.trim();
        const email = document.getElementById('dwEmail').value.trim();
        const accept = document.getElementById('dwAccept').checked;
        return name !== '' && email !== '' && accept;
      }
      return true;
    }

    function refreshNextButton(stepIndex, btnId) {
      const btn = document.getElementById(btnId);
      if(btn) btn.disabled = !validateStep(stepIndex);
    }

    // --- EVENT LISTENERS ---

    // Step 0: Type
    document.querySelectorAll('#dwAppGrid .dw-card').forEach(card => {
      card.addEventListener('click', function() {
        const val = this.dataset.value;
        if (formData.tipo.includes(val)) {
          formData.tipo = formData.tipo.filter(v => v !== val);
          this.classList.remove('selected');
        } else {
          formData.tipo.push(val);
          this.classList.add('selected');
        }
        refreshNextButton(0, 'step0Next');
      });
    });
    document.getElementById('step0Next').addEventListener('click', () => goToStep(1));

    // Step 1: Scale
    document.querySelectorAll('#dwScaleGrid .dw-pill').forEach(pill => {
      pill.addEventListener('click', function() {
        document.querySelectorAll('#dwScaleGrid .dw-pill').forEach(p => p.classList.remove('selected'));
        this.classList.add('selected');
        formData.usuariosActuales = this.dataset.value;
        document.getElementById('dwPicoSection').hidden = false;
        refreshNextButton(1, 'step1Next');
      });
    });
    document.querySelectorAll('#dwPicoGrid .dw-pill').forEach(pill => {
      pill.addEventListener('click', function() {
        document.querySelectorAll('#dwPicoGrid .dw-pill').forEach(p => p.classList.remove('selected'));
        this.classList.add('selected');
        formData.picoEsperado = this.dataset.value;
        document.getElementById('dwPicoAlert').hidden = (this.dataset.value !== 'Evento masivo (+100K)');
        refreshNextButton(1, 'step1Next');
      });
    });
    document.getElementById('step1Back').addEventListener('click', () => goToStep(0));
    document.getElementById('step1Next').addEventListener('click', () => goToStep(2));

    // Step 2: Stack
    document.querySelectorAll('.dw-chip').forEach(chip => {
      chip.addEventListener('click', function() {
        const cat = this.dataset.category;
        const val = this.dataset.value;
        if (formData.stack[cat].includes(val)) {
          formData.stack[cat] = formData.stack[cat].filter(v => v !== val);
          this.classList.remove('selected');
        } else {
          formData.stack[cat].push(val);
          this.classList.add('selected');
        }
        refreshNextButton(2, 'step2Next');
      });
    });
    document.getElementById('step2Back').addEventListener('click', () => goToStep(1));
    document.getElementById('step2Next').addEventListener('click', () => goToStep(3));

    // Step 3: Symptoms
    document.querySelectorAll('.dw-sintoma-card').forEach(card => {
      card.addEventListener('click', function() {
        const val = this.dataset.value;
        if (formData.sintomas.includes(val)) {
          formData.sintomas = formData.sintomas.filter(v => v !== val);
          this.classList.remove('selected');
        } else {
          if (formData.sintomas.length >= 3) return;
          formData.sintomas.push(val);
          this.classList.add('selected');
        }
        refreshNextButton(3, 'step3Next');
      });
    });
    document.getElementById('dwContexto').addEventListener('input', (e) => {
      document.getElementById('dwContextoCounter').textContent = e.target.value.length;
    });
    document.getElementById('step3Back').addEventListener('click', () => goToStep(2));
    document.getElementById('step3Next').addEventListener('click', () => goToStep(4));

    // Step 4: Final
    ['dwNombre', 'dwEmail', 'dwAccept'].forEach(id => {
      document.getElementById(id).addEventListener('input', () => refreshNextButton(4, 'dwSubmitBtn'));
      document.getElementById(id).addEventListener('change', () => refreshNextButton(4, 'dwSubmitBtn'));
    });
    document.getElementById('step4Back').addEventListener('click', () => goToStep(3));

    // --- FORM SUBMISSION ---

    const form = document.getElementById('dwForm');
    const processingDiv = document.getElementById('dwProcessing');
    const resultsDiv = document.getElementById('dwResults');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      formData.nombre = document.getElementById('dwNombre').value;
      formData.email = document.getElementById('dwEmail').value;
      formData.empresa = document.getElementById('dwEmpresa').value;
      formData.rol = document.getElementById('dwRol').value;
      formData.contexto = document.getElementById('dwContexto').value;

      // Enter processing state
      form.hidden = true;
      document.getElementById('dwWizardHeader').hidden = true;
      processingDiv.hidden = false;
      
      startProcessingTimeline();

      try {
        const resp = await fetch('/api/diagnostico', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        
        if (!resp.ok) throw new Error('API Error');
        const data = await resp.json();
        
        // Wait at least 3.5s for the animation to look real
        setTimeout(() => {
          processingDiv.hidden = true;
          resultsDiv.hidden = false;
          renderResults(data);
        }, 3500);

      } catch (err) {
        console.error(err);
        alert('Error al generar diagnóstico. Reintentando...');
        location.hash = '#diagnostico';
        location.reload();
      }
    });

    function startProcessingTimeline() {
      const items = document.querySelectorAll('.dw-ti-item');
      const rotatorTexts = document.querySelectorAll('.dw-rotator p');
      
      items.forEach((item, idx) => {
        setTimeout(() => {
            if (idx > 0) items[idx-1].classList.replace('active', 'done');
            item.classList.add('active');
        }, idx * 700);
      });

      let textIdx = 0;
      setInterval(() => {
          rotatorTexts[textIdx].classList.remove('active');
          textIdx = (textIdx + 1) % rotatorTexts.length;
          rotatorTexts[textIdx].classList.add('active');
      }, 1500);
    }

    function renderResults(data) {
      document.getElementById('dwResNombre').textContent = formData.nombre;
      document.getElementById('dwResDate').textContent = new Date().toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' });
      
      // Animate Score
      animateScore(data.score);
      document.getElementById('dwScoreLabel').textContent = data.scoreLabel;
      document.getElementById('dwIndustryAvg').textContent = data.industryAvg;

      // Risks
      const riesgosContainer = document.getElementById('dwRiesgosList');
      riesgosContainer.innerHTML = data.riesgos.map(r => `
        <div class="dw-riesgo-item">
          <span class="dw-severity dw-sev-${r.severidad.toLowerCase()}">${r.severidad}</span>
          <div class="dw-riesgo-body">
            <strong>${r.titulo}</strong>
            <p>${r.descripcion}</p>
            <small>Módulo: ${r.modulo}</small>
          </div>
        </div>
      `).join('');

      // Recs
      const recsContainer = document.getElementById('dwRecsList');
      recsContainer.innerHTML = data.recomendaciones.map((r, i) => `
        <div class="dw-rec-item" style="margin-bottom: 20px;">
          <strong>${i+1}. ${r.titulo}</strong>
          <div style="font-size: 11px; color:#86868b; margin: 4px 0;">Impacto: ${r.impacto} | Tiempo: ${r.tiempo}</div>
          <p style="font-size: 14px;">${r.descripcion}</p>
        </div>
      `).join('');

      // Plan
      const planContainer = document.getElementById('dwPlanList');
      planContainer.innerHTML = data.planDeAccion.map(p => `
        <div style="margin-bottom: 16px; border-left: 2px solid #0071e3; padding-left: 16px;">
          <div style="font-weight: 600; color: #0071e3; font-size: 12px; text-transform: uppercase;">${p.periodo}</div>
          <strong>${p.hito}</strong>
          <p style="font-size: 14px; margin-top: 4px;">${p.descripcion}</p>
        </div>
      `).join('');

      // Package Rec
      const pkgRec = document.getElementById('dwPackageRec');
      pkgRec.innerHTML = `
        <div style="background: #f2f7ff; padding: 24px; border-radius: 16px; margin-top: 40px;">
            <h4 style="margin-top: 0; color: #0071e3;">📦 Paquete Sugerido</h4>
            <p>Basado en tu perfil, el servicio de <strong>${data.paqueteRecomendado.toUpperCase()}</strong> es el que mayor retorno te dará.</p>
        </div>
      `;

      // Download Button
      const downloadBtn = document.getElementById('dwDownloadPdfBtn');
      downloadBtn.href = `/api/diagnostico/pdf/${data.pdfId}`;
      downloadBtn.target = '_blank';
    }

    function animateScore(target) {
      const ring = document.getElementById('dwScoreRing');
      const num = document.getElementById('dwScoreNum');
      const circumference = 339; // 2 * PI * 54
      
      const offset = circumference - (target / 100) * circumference;
      ring.style.strokeDashoffset = offset;
      
      let current = 0;
      const interval = setInterval(() => {
          if (current >= target) {
              current = target;
              clearInterval(interval);
          }
          num.textContent = current;
          current++;
      }, 15);
    }

    updateHeader();
});
