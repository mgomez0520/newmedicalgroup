// Manejo del formulario de contacto y actualización del año en el footer.
// Añade validación básica (email o teléfono), bloquea el formulario durante el "envío"
// y muestra mensajes con roles/accessibilidad adecuados.
document.addEventListener('DOMContentLoaded', function(){
  const year = document.getElementById('year');
  if(year) year.textContent = new Date().getFullYear();

  const form = document.getElementById('contactForm');
  const result = document.getElementById('formResult');
  const submitBtn = form ? form.querySelector('button[type="submit"]') : null;

  function isEmail(value){
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }
  function isPhone(value){
    // Acepta dígitos, espacios, paréntesis, guiones y +
    return /^[+()0-9\s-]{6,}$/.test(value);
  }

  if(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      // Leer datos
      const name = (document.getElementById('name') || {}).value || '';
      const contact = (document.getElementById('contactInput') || {}).value || '';
      const message = (document.getElementById('message') || {}).value || '';

      const nameTrim = name.trim();
      const contactTrim = contact.trim();

      // Validaciones básicas
      if(!nameTrim || !contactTrim){
        showResult('Por favor completa nombre y contacto.', 'error');
        return;
      }

      if(!(isEmail(contactTrim) || isPhone(contactTrim))){
        showResult('Introduce un email o teléfono válido.', 'error');
        return;
      }

      // Si el formulario define un endpoint, enviar por POST
      const endpoint = form.getAttribute('data-endpoint');
      setLoading(true);
      showResult('Enviando solicitud...', 'info');

      const payload = { name: nameTrim, contact: contactTrim, message: message };

      if(endpoint){
        fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        }).then(function(resp){
          return resp.json();
        }).then(function(data){
          setLoading(false);
          if(data && data.ok){
            showResult(data.message || 'Solicitud enviada. Nos pondremos en contacto pronto.', 'success');
            form.reset();
          } else {
            showResult('Ocurrió un error al enviar. Intenta de nuevo.', 'error');
          }
        }).catch(function(err){
          console.error('Error enviando formulario:', err);
          setLoading(false);
          showResult('Ocurrió un error al enviar. Intenta de nuevo.', 'error');
        });
      } else {
        // Simula llamada a servidor
        setTimeout(function(){
          setLoading(false);
          showResult('Solicitud enviada. Nos pondremos en contacto pronto.', 'success');
          form.reset();
        }, 900);
      }
    });
  }

  function setLoading(isLoading){
    if(submitBtn){
      submitBtn.disabled = !!isLoading;
      submitBtn.setAttribute('aria-busy', isLoading ? 'true' : 'false');
    }
    if(form){
      if(isLoading) form.classList.add('is-sending'); else form.classList.remove('is-sending');
    }
  }

  function showResult(message, type){
    if(!result) return;
    result.textContent = message;
    result.classList.remove('success','error','info');
    if(type) result.classList.add(type);
    // Colocar color por CSS; mantener aria-live
    result.setAttribute('role','status');
  }
});
