document.addEventListener('DOMContentLoaded', function () {
    const horarios = [
        '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'
    ];

    const tablaHorarios = document.getElementById('horarios-table').querySelector('tbody');
    const fechaInput = document.getElementById('fecha');
    const canchaSelect = document.getElementById('cancha');
    const turnosInput = document.getElementById('turnos');
    const reservarBtn = document.getElementById('reservar-btn');
    const modal = document.getElementById('modal');
    const modalText = document.getElementById('modal-text');
    const closeModal = document.getElementById('close-modal');

    function cargarHorarios() {
        const canchaSeleccionada = canchaSelect.value;
        tablaHorarios.innerHTML = '';
        horarios.forEach(hora => {
            const fila = document.createElement('tr');
            const celdaHora = document.createElement('td');
            celdaHora.textContent = hora;
            fila.appendChild(celdaHora);

            for (let i = 1; i <= 3; i++) {
                const celda = document.createElement('td');
                celda.textContent = 'Disponible';
                if (canchaSeleccionada === '' || `cancha${i}` !== canchaSeleccionada) {
                    celda.textContent = 'No Disponible';
                    celda.classList.remove('disponible');
                    celda.classList.remove('seleccionado');
                } else {
                    celda.classList.add('disponible');
                    celda.setAttribute('data-hora', hora);
                    celda.setAttribute('data-cancha', `cancha${i}`);
                    celda.addEventListener('click', () => seleccionarHorario(celda, hora, `cancha${i}`));
                }
                fila.appendChild(celda);
            }

            tablaHorarios.appendChild(fila);
        });
    }

    function seleccionarHorario(celda, hora, cancha) {
        const turnosSeleccionados = document.querySelectorAll('#horarios-table td.seleccionado');
        const turnosMaximos = parseInt(turnosInput.value, 10);

        if (turnosSeleccionados.length < turnosMaximos || celda.classList.contains('seleccionado')) {
            if (celda.classList.contains('seleccionado')) {
                celda.classList.remove('seleccionado');
                celda.style.backgroundColor = '#e7f0e9'; // Revertir color de fondo
                celda.textContent = 'Disponible'; // Restaurar texto
            } else {
                celda.classList.add('seleccionado');
                celda.style.backgroundColor = '#4CAF50'; // Color verde para selección
                celda.textContent = hora; // Mostrar la hora seleccionada
            }
        }
    }

    function mostrarFechaSeleccionada() {
        const fechaSeleccionada = fechaInput.value;
        document.getElementById('fecha-seleccionada').textContent = `Horario disponible para ${fechaSeleccionada}`;
    }

    function validarFormulario() {
        const cancha = canchaSelect.value;
        const fecha = fechaInput.value;
        const cliente = document.getElementById('cliente').value;
        const dni = document.getElementById('dni').value;
        const metodoPago = document.getElementById('metodo-pago').value;
        const turnos = parseInt(turnosInput.value, 10);
        const turnosSeleccionados = document.querySelectorAll('#horarios-table td.seleccionado');

        if (!cancha || !fecha || !cliente || !dni || !metodoPago || turnosSeleccionados.length !== turnos) {
            return false;
        }

        // Validar DNI
        if (dni.length !== 8 || isNaN(dni)) {
            return false;
        }

        // Validar nombre del cliente
        if (/[^a-zA-Z\s]/.test(cliente)) {
            return false;
        }

        // Validar fecha
        const fechaActual = new Date().toISOString().split('T')[0];
        if (fecha < fechaActual) {
            return false;
        }

        return true;
    }

    function mostrarModal() {
        const cancha = canchaSelect.options[canchaSelect.selectedIndex].text;
        const fecha = fechaInput.value;
        const cliente = document.getElementById('cliente').value;
        const dni = document.getElementById('dni').value;
        const metodoPago = document.getElementById('metodo-pago').value;
        const turnos = parseInt(turnosInput.value, 10);
        const turnosSeleccionados = Array.from(document.querySelectorAll('#horarios-table td.seleccionado')).map(celda => celda.getAttribute('data-hora'));

        const precioTotal = turnosSeleccionados.length * 500;

        modalText.innerHTML = `
            <p>Datos de la Reserva:</p>
            <p>Cancha: ${cancha}</p>
            <p>Fecha: ${fecha}</p>
            <p>Cliente: ${cliente}</p>
            <p>DNI: ${dni}</p>
            <p>Método de Pago: ${metodoPago}</p>
            <p>Turnos: ${turnosSeleccionados.join(', ')}</p>
            <p>Precio Total: $${precioTotal}</p>
        `;

        modal.style.display = 'block';
    }

    function ocultarModal() {
        modal.style.display = 'none';
    }

    // Controlar el cierre del modal
    window.addEventListener('click', function (event) {
        if (event.target === modal) {
            ocultarModal();
        }
    });

    fechaInput.addEventListener('change', mostrarFechaSeleccionada);
    canchaSelect.addEventListener('change', cargarHorarios);
    reservarBtn.addEventListener('click', function (event) {
        event.preventDefault();
        if (validarFormulario()) {
            mostrarModal();
        } else {
            alert('Por favor, completa todos los campos correctamente.');
        }
    });

    closeModal.addEventListener('click', ocultarModal);
});
