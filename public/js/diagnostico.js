document.addEventListener('DOMContentLoaded', () => {
  let currentStep = 0;
  const steps = document.querySelectorAll('.dw-step');
  const progressBarFill = document.getElementById('dwProgressFill');
  const stepLabel = document.getElementById('dwStepLabel');
  const dots = document.querySelectorAll('.dw-dot');
  
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
    rol: 'CTO'
  };

  const stepLabels = [
    "Tu aplicación",
    "Escala y usuarios",
    "Stack técnico",
    "Tu mayor problema",
    "Recibir diagnóstico"
  ];

  function updateHeader() {
    // Update progress bar
    const totalSteps = steps.length;
    const progressPct = ((currentStep + 1) / totalSteps) * 100;
    progressBarFill.style.width = `${progressPct}%`;
    stepLabel.innerHTML = `Paso ${currentStep + 1} de 5 &middot; ${stepLabels[currentStep]}`;
    
    // Update dots
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
    
    // Animate out current
    steps[currentStep].classList.remove('active');
    steps[currentStep].style.opacity = '0';
    steps[currentStep].style.transform = n > currentStep ? 'translateX(-30px)' : 'translateX(30px)';
    
    setTimeout(() => {
      steps[currentStep].hidden = true;
      currentStep = n;
      
      // Animate in next
      steps[currentStep].hidden = false;
      // force reflow
      void steps[currentStep].offsetWidth;
      steps[currentStep].classList.add('active');
      steps[currentStep].style.opacity = '1';
      steps[currentStep].style.transform = 'translateY(0)';
      
      updateHeader();
    }, 250);
  }

  function validateStep(n) {
    if (n === 0) return formData.tipo.length > 0;
    if (n === 1) return formData.usuariosActuales !== '';
    if (n === 2) return (formData.stack.frontend.length > 0 || formData.stack.backend.length > 0 || formData.stack.cicd.length > 0);
    if (n === 3) return formData.sintomas.length > 0;
    if (n === 4) {
      return document.getElementById('dwNombre').value.trim() !== '' && 
             document.getElementById('dwEmail').value.trim() !== '' &&
             document.getElementById('dwAccept').checked;
    }
    return true;
  }

  function refreshNextButton(stepIndex, btnId) {
    const btn = document.getElementById(btnId);
    if(btn) btn.disabled = !validateStep(stepIndex);
  }

  // Navigation Event Listeners
  document.getElementById('step0Next').addEventListener('click', () => goToStep(1));
  document.getElementById('step1Next').addEventListener('click', () => goToStep(2));
  document.getElementById('step2Next').addEventListener('click', () => goToStep(3));
  document.getElementById('step3Next').addEventListener('click', () => {
    formData.contexto = document.getElementById('dwContexto').value;
    goToStep(4);
  });
  
  document.getElementById('step1Back').addEventListener('click', () => goToStep(0));
  document.getElementById('step2Back').addEventListener('click', () => goToStep(1));
  document.getElementById('step3Back').addEventListener('click', () => goToStep(2));
  document.getElementById('step4Back').addEventListener('click', () => goToStep(3));

  // --- Step 0: Tipo de app (Multi-select)
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

  // --- Step 1: Escala Actual (Single-select)
  const picoSection = document.getElementById('dwPicoSection');
  const alertSection = document.getElementById('dwPicoAlert');
  document.querySelectorAll('#dwScaleGrid .dw-pill').forEach(pill => {
    pill.addEventListener('click', function() {
      document.querySelectorAll('#dwScaleGrid .dw-pill').forEach(p => p.classList.remove('selected'));
      this.classList.add('selected');
      formData.usuariosActuales = this.dataset.value;
      
      // Show pico section
      picoSection.hidden = false;
      setTimeout(() => picoSection.style.opacity = '1', 50);
      refreshNextButton(1, 'step1Next');
    });
  });

  // Step 1b: Pico Esperado (Single-select)
  document.querySelectorAll('#dwPicoGrid .dw-pill').forEach(pill => {
    pill.addEventListener('click', function() {
      document.querySelectorAll('#dwPicoGrid .dw-pill').forEach(p => p.classList.remove('selected'));
      this.classList.add('selected');
      formData.picoEsperado = this.dataset.value;
      
      if (this.dataset.value === 'Evento masivo (+100K)') {
        alertSection.hidden = false;
      } else {
        alertSection.hidden = true;
      }
    });
  });

  // --- Step 2: Stack (Multi-select)
  document.querySelectorAll('.dw-chip-grid .dw-chip').forEach(chip => {
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

  // --- Step 3: Sintomas (Multi-select, Max 3)
  document.querySelectorAll('#dwSintomasGrid .dw-sintoma-card border').forEach(card => {
    // Actually the selector didn't match perfectly, use closest
  });
  document.querySelectorAll('.dw-sintoma-card').forEach(card => {
    card.addEventListener('click', function() {
      const val = this.dataset.value;
      if (formData.sintomas.includes(val)) {
        formData.sintomas = formData.sintomas.filter(v => v !== val);
        this.classList.remove('selected');
      } else {
        if (formData.sintomas.length >= 3) {
           // Maybe blink existing or just ignore
           return;
        }
        formData.sintomas.push(val);
        this.classList.add('selected');
      }
      refreshNextButton(3, 'step3Next');
    });
  });
  
  // Context textarea counter
  const ctxTexarea = document.getElementById('dwContexto');
  const ctxCounter = document.getElementById('dwContextoCounter');
  if(ctxTexarea) {
    ctxTexarea.addEventListener('input', () => {
       ctxCounter.textContent = ctxTexarea.value.length;
    });
  }

  // --- Step 4: Final Validation
  const inputs = ['dwNombre', 'dwEmail', 'dwAccept'];
  inputs.forEach(id => {
    const el = document.getElementById(id);
    if(el) {
      el.addEventListener('input', () => refreshNextButton(4, 'dwSubmitBtn'));
      el.addEventListener('change', () => refreshNextButton(4, 'dwSubmitBtn'));
    }
  });

  // ========== SUBMIT & PROCESSING LOGIC ==========
  
  const form = document.getElementById('dwForm');
  const processingDiv = document.getElementById('dwProcessing');
  const resultsDiv = document.getElementById('dwResults');
  
  if(form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      formData.nombre = document.getElementById('dwNombre').value;
      formData.email = document.getElementById('dwEmail').value;
      formData.empresa = document.getElementById('dwEmpresa').value;
      formData.rol = document.getElementById('dwRol').value;

      // 1. Hide Form & Header
      form.hidden = true;
      document.getElementById('dwWizardHeader').hidden = true;

      // 2. Show "Sent Success" Animation
      const sentSuccessDiv = document.getElementById('dwSentSuccess');
      sentSuccessDiv.hidden = false;
      
      let fetchDone = false;
      let resultData = null;

      // 3. Start API call in background
      const apiCall = (async () => {
        try {
          const resp = await fetch('/api/diagnostico', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
          });
          if(!resp.ok) throw new Error('API Error');
          resultData = await resp.json();
          fetchDone = true;
        } catch (err) {
          console.error(err);
          alert('Ocurrió un error al generar el diagnóstico. Por favor intenta de nuevo.');
          sentSuccessDiv.hidden = true;
          processingDiv.hidden = true;
          form.hidden = false;
          document.getElementById('dwWizardHeader').hidden = false;
        }
      })();

      // 4. Wait for the "Sent" animation to feel sufficient (2.5 seconds)
      setTimeout(() => {
        // Fade out success message
        sentSuccessDiv.style.opacity = '0';
        sentSuccessDiv.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
          sentSuccessDiv.hidden = true;
          
          if (fetchDone && resultData) {
            // If already done, go straight to results
            renderResults(resultData);
            resultsDiv.hidden = false;
          } else {
            // Otherwise show processing timeline
            processingDiv.hidden = false;
            startProcessingAnimation();
            
            // Poll for completion
            const checkDone = setInterval(() => {
              if (fetchDone && resultData) {
                clearInterval(checkDone);
                renderResults(resultData);
                processingDiv.hidden = true;
                resultsDiv.hidden = false;
              }
            }, 500);
          }
        }, 500);
      }, 2500);
    });
  }

  function startProcessingAnimation() {
    const items = document.querySelectorAll('.dw-timeline-item');
    const texts = document.querySelectorAll('.dw-rotator-text');
    let currentText = 0;
    
    // Timeline sequence
    setTimeout(() => activateTimelineItem(items[0]), 500);
    setTimeout(() => activateTimelineItem(items[1]), 1500);
    setTimeout(() => activateTimelineItem(items[2]), 2500);
    setTimeout(() => activateTimelineItem(items[3]), 3500);
    setTimeout(() => items[4].classList.add('loading'), 4500);
    
    // Rotating texts
    texts[0].classList.add('active');
    setInterval(() => {
      texts[currentText].classList.remove('active');
      currentText = (currentText + 1) % texts.length;
      texts[currentText].classList.add('active');
    }, 2000);
  }
  
  function activateTimelineItem(el) {
    if(!el) return;
    el.classList.add('completed');
    el.querySelector('.dw-ti-icon').innerHTML = '✓';
  }

  function renderResults(data) {
    // set Score
    animateValue('dwScoreNum', 0, data.score, 1500);
    
    const scoreCircle = document.querySelector('.dw-score-circle');
    const scoreLabel = document.getElementById('dwScoreLabel');
    scoreLabel.textContent = data.scoreLabel;
    
    scoreCircle.classList.remove('color-red', 'color-amber', 'color-blue', 'color-green');
    if(data.score <= 40) scoreCircle.classList.add('color-red');
    else if(data.score <= 65) scoreCircle.classList.add('color-amber');
    else if(data.score <= 80) scoreCircle.classList.add('color-blue');
    else scoreCircle.classList.add('color-green');
    
    document.getElementById('dwIndustryAvg').textContent = data.industryAvg;
    document.getElementById('dwResNombre').textContent = formData.nombre;
    
    // Date
    const today = new Date();
    document.getElementById('dwResDate').textContent = today.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
    
    // Riesgos
    const riesgosList = document.getElementById('dwRiesgosList');
    riesgosList.innerHTML = '';
    data.riesgos.forEach(r => {
      riesgosList.innerHTML += `
        <div class="dw-riesgo-item">
          <span class="dw-severity dw-sev-${r.severidad.toLowerCase()}">${r.severidad}</span>
          <div class="dw-riesgo-content">
            <strong>${r.titulo}</strong>
            <p>${r.descripcion}</p>
            <span class="dw-modulo">Módulo: ${r.modulo}</span>
          </div>
        </div>
      `;
    });
    
    // Recomendaciones
    const recsList = document.getElementById('dwRecsList');
    recsList.innerHTML = '';
    data.recomendaciones.forEach((r, idx) => {
      recsList.innerHTML += `
        <div class="dw-rec-item">
          <div class="dw-rec-num">${idx + 1}</div>
          <div class="dw-rec-content">
            <div class="dw-rec-header">
              <strong>${r.titulo}</strong>
              <span class="dw-impact">Impacto: ${r.impacto}</span>
            </div>
            <p>${r.descripcion}</p>
            <span class="dw-time">⏱ Tiempo estimado: ${r.tiempo}</span>
          </div>
        </div>
      `;
    });

    // Plan
    const planList = document.getElementById('dwPlanList');
    planList.innerHTML = '';
    data.planDeAccion.forEach(p => {
      planList.innerHTML += `
        <div class="dw-plan-item">
          <span class="dw-plan-period">${p.periodo}</span>
          <div class="dw-plan-content">
            <strong>${p.hito}</strong>
            <p>${p.descripcion}</p>
          </div>
        </div>
      `;
    });
    
    // Setup Download PDF button
    const downloadBtn = document.getElementById('dwDownloadPdfBtn');
    if (downloadBtn && data.pdfId) {
      downloadBtn.href = `/api/diagnostico/pdf/${data.pdfId}`;
      downloadBtn.target = "_blank";
    }
  }

  function animateValue(id, start, end, duration) {
    const obj = document.getElementById(id);
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      obj.innerHTML = Math.floor(progress * (end - start) + start);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        obj.innerHTML = end;
      }
    };
    window.requestAnimationFrame(step);
  }

  // Init header
  updateHeader();
});
