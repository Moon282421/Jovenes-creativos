
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