const API_URL = 'http://localhost:3000';

// Auto-seleccionar el plan según el parámetro enviado en la URL
document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const planParam = urlParams.get('plan');
  const selectPlan = document.getElementById('plan');

  if (planParam && selectPlan) {
    selectPlan.value = planParam;
  }
});

// MÓDULO 1: Registro de Reservas (Envío al Backend API)
document.addEventListener('DOMContentLoaded', () => {
  const formReserva = document.querySelector('.reservation-form');

  if (formReserva) {
    formReserva.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Captura de valores del formulario
      const nuevaReserva = {
        nombre: document.getElementById('nombre').value.trim(),
        email: document.getElementById('email').value.trim(),
        telefono: document.getElementById('telefono').value.trim(),
        fecha: document.getElementById('fecha').value,
        tipoEvento: document.getElementById('tipo-evento').value,
        plan: document.getElementById('plan').value,
        mensaje: document.getElementById('mensaje').value.trim()
      };

      // Envío de datos al Backend
      const exito = await enviarReserva(nuevaReserva);
      if (exito) {
        formReserva.reset();
      }
    });
  }
});

// MÓDULO 2: Motor de IA Local (Recomendador de Planes y Asistente Creativo)
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

      // Lógica de recomendación según afluencia
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

      // Propuestas de texto y ambientación musical
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

      // Renderizar resultado en pantalla
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

      // Preseleccionar plan en el formulario
      const selectPlan = document.getElementById('plan');
      if (selectPlan) {
        selectPlan.value = valorSelect;
      }
    });
  }
});

// MÓDULO 3: Petición HTTP Fetch al Backend con captura de errores
async function enviarReserva(datosReserva) {
  try {
    const response = await fetch(`${API_URL}/api/reservas`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(datosReserva)
    });

    // 1. Manejo de respuestas con código de error HTTP (404, 500, etc.)
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const mensajeError = errorData.mensaje || response.statusText;
      throw new Error(`Código ${response.status}: ${mensajeError}`);
    }

    const respuesta = await response.json();
    alert('✅ Reserva registrada con éxito.');
    return true;

  } catch (error) {
    // 2. Manejo cuando el Backend está fuera de línea
    if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
      alert('⚠️ Error de Conexión: El servidor Backend no está activo en http://localhost:3000.');
    } else {
      // 3. Muestra el código de error HTTP devuelto por el servidor
      alert(`⚠️ Error del Servidor: ${error.message}`);
    }
    console.error('Detalle técnico del error:', error);
    return false;
  }
}

// MÓDULO 4: Panel de Administración (Modal y Login)
document.addEventListener('DOMContentLoaded', () => {
  const btnAbrirAdmin = document.getElementById('btn-abrir-admin');
  const modalAdmin = document.getElementById('modal-admin');
  const btnCerrarModal = document.getElementById('btn-cerrar-modal');
  const formLogin = document.getElementById('form-login');
  const vistaLogin = document.getElementById('vista-login');
  const vistaPanel = document.getElementById('vista-panel');
  const btnLogout = document.getElementById('btn-logout');
  const tablaBody = document.getElementById('tabla-reservas-body');

  // 1. Abrir modal al hacer clic en 🔒 Admin
  if (btnAbrirAdmin) {
    btnAbrirAdmin.addEventListener('click', (e) => {
      e.preventDefault();
      modalAdmin.style.display = 'flex';
      vistaLogin.style.display = 'block';
      vistaPanel.style.display = 'none';
    });
  }

  // 2. Cerrar modal
  if (btnCerrarModal) {
    btnCerrarModal.addEventListener('click', () => {
      modalAdmin.style.display = 'none';
    });
  }

  // 3. Procesar autenticación y consulta a MongoDB
  if (formLogin) {
    formLogin.addEventListener('submit', async (e) => {
      e.preventDefault();
      const user = document.getElementById('admin-user').value.trim();
      const pass = document.getElementById('admin-pass').value.trim();

      // Validación de credenciales
      if (user === 'JEPR' && pass === '020625') { 
        try {
          const response = await fetch(`${API_URL}/api/reservas`);
          if (!response.ok) throw new Error('Error en la petición.');

          const reservas = await response.json();

          // Renderizado dinámico de filas en la tabla
          tablaBody.innerHTML = '';
          if (reservas.length === 0) {
            tablaBody.innerHTML = '<tr><td colspan="5">No hay reservas registradas.</td></tr>';
          } else {
            reservas.forEach(r => {
              tablaBody.innerHTML += `
                <tr>
                  <td>${r.nombre}</td>
                  <td>${r.email}<br><small>${r.telefono}</small></td>
                  <td>${r.fecha}</td>
                  <td>${r.plan} / ${r.tipoEvento}</td>
                  <td><span style="color: #4ade80;">Registrado</span></td>
                </tr>
              `;
            });
          }

          // Alternar vistas dentro del modal
          vistaLogin.style.display = 'none';
          vistaPanel.style.display = 'block';

        } catch (error) {
          alert('⚠️ Error al conectar con el servidor Backend.');
        }
      } else {
        alert('❌ Usuario o contraseña incorrectos.');
      }
    });
  }

  // 4. Cerrar sesión dentro del panel
  if (btnLogout) {
    btnLogout.addEventListener('click', () => {
      vistaPanel.style.display = 'none';
      vistaLogin.style.display = 'block';
      formLogin.reset();
    });
  }
});