
// MÓDULO 1: Registro de Reservas y Almacenamiento de Datos (LocalStorage)

document.addEventListener('DOMContentLoaded', () => {
  const formReserva = document.querySelector('.reservation-form');

  if (formReserva) {
    formReserva.addEventListener('submit', (e) => {
      e.preventDefault();

      // Captura de valores del formulario
      const nuevaReserva = {
        id: Date.now(),
        nombre: document.getElementById('nombre').value.trim(),
        email: document.getElementById('email').value.trim(),
        telefono: document.getElementById('telefono').value.trim(),
        fecha: document.getElementById('fecha').value,
        tipoEvento: document.getElementById('tipo-evento').value,
        plan: document.getElementById('plan').value,
        mensaje: document.getElementById('mensaje').value.trim(),
        estado: 'Pendiente',
        fechaRegistro: new Date().toLocaleDateString('es-EC')
      };

      // Guardar en Base de Datos Local (localStorage)
      const reservasGuardadas = JSON.parse(localStorage.getItem('reservas_booth360')) || [];
      reservasGuardadas.push(nuevaReserva);
      localStorage.setItem('reservas_booth360', JSON.stringify(reservasGuardadas));

      // Confirmación al usuario y limpieza del formulario
      alert(`¡Gracias, ${nuevaReserva.nombre}! Su solicitud para el ${nuevaReserva.fecha} ha sido registrada correctamente.`);
      formReserva.reset();
    });
  }
});

// ==========================================================================
// MÓDULO 2: Motor de IA (Recomendador de Planes + Asistente Creativo)
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  const btnIA = document.getElementById('btn-consultar-ia');
  const divResultado = document.getElementById('ia-resultado');

  if (btnIA) {
    btnIA.addEventListener('click', () => {
      const invitados = parseInt(document.getElementById('ia-invitados').value);
      const tematica = document.getElementById('ia-tematica').value;

      if (!invitados || invitados < 1) {
        alert('Por favor, ingrese una cantidad válida de invitados.');
        return;
      }

      // 1. Lógica de Recomendación según afluencia
      let planSugerido = '';
      let valorSelect = '';
      let justificacion = '';

      if (invitados <= 60) {
        planSugerido = 'Plan Básico (2 Horas - $180)';
        valorSelect = 'basico';
        justificacion = 'Para un grupo íntimo de hasta 60 asistentes, 2 horas permiten que todos graben múltiples tomas sin filas de espera.';
      } else if (invitados <= 130) {
        planSugerido = 'Plan Estándar (3 Horas - $250)';
        valorSelect = 'estandar';
        justificacion = 'Con una afluencia media, 3 horas y 2 operadores técnicos garantizan un flujo ágil y tomas grupales dinámicas.';
      } else {
        planSugerido = 'Plan Corporativo / Extendido (4 Horas - $340)';
        valorSelect = 'corporativo';
        justificacion = 'Dado el alto volumen de invitados, se requieren 4 horas de cobertura continua para cubrir toda la demanda.';
      }

      // 2. Asistente Creativo: Propuestas de texto (Overlay) y ambientación musical
      const propuestasCreativas = {
        boda: {
          frase: '"Nuestro Amor en 360° - Edición Especial"',
          musica: 'Pop instrumental elegante / Nu-Disco (120 BPM) para transiciones Slow Motion.'
        },
        quince: {
          frase: '"XV Night Glow - Brilla en cada ángulo"',
          musica: 'Urban Pop / Electrónica comercial con cortes dinámicos de velocidad.'
        },
        corporativo: {
          frase: '"Innovación en Movimiento - Experiencia de Marca 360°"',
          musica: 'Tech-House corporativo dinámico con inserción de logotipo institucional en esquina.'
        },
        cumpleanos: {
          frase: '"Celebration VIP - Momentos Inolvidables"',
          musica: 'Tendencias virales de redes sociales para descarga inmediata en Reels/TikTok.'
        }
      };

      const idea = propuestasCreativas[tematica];

      // Mostrar resultado en pantalla
      divResultado.style.display = 'block';
      divResultado.innerHTML = `
        <h4>✨ Diagnóstico del Asistente IA:</h4>
        <p><strong>Paquete Recomendado:</strong> ${planSugerido}</p>
        <p><strong>Análisis Técnico:</strong> ${justificacion}</p>
        <hr style="border-color: #334155; margin: 12px 0;">
        <h4>🎨 Sugerencia Creativa para tu Video:</h4>
        <p><strong>Texto sugerido para el marco digital:</strong> <em>${idea.frase}</em></p>
        <p><strong>Dirección musical recomendada:</strong> ${idea.musica}</p>
      `;

      // Preseleccionar automáticamente el plan sugerido en el formulario de reserva
      const selectPlan = document.getElementById('plan');
      if (selectPlan) {
        selectPlan.value = valorSelect;
      }
    });
  }
});