const apiUrl = 'http://localhost:4000/api/vehicles'; // URL de la API para los vehículos

// Obtener el token JWT desde el almacenamiento local
const token = localStorage.getItem('token');

// Función para obtener todos los vehículos desde el backend

// Función para obtener todos los vehículos desde el backend
function getVehicles() {
    if (!token) {
        alert("Debes iniciar sesión para ver los vehículos.");
        window.location.href = '../index.html'; // Redirigir al login si no hay token
        return;
    }

    fetch(apiUrl, {
        method: 'GET',
        headers: {
        'Authorization': `Bearer ${token}` // Incluir el token en el encabezado
        }
    })
    .then(response => response.json())
    .then(vehicles => {
        const vehiclesList = document.getElementById('vehicles-list');
        vehiclesList.innerHTML = '';

        vehicles.forEach(vehicle => {
            const div = document.createElement('div');
            div.className = `vehicle-card ${vehicle.claseVehicle === 'moto' ? 'moto' : 'car'}`; // Asegurar que `claseVehicle` coincida con las clases en CSS
            div.innerHTML = `
            <h2>${vehicle.placa}</h2>
            <p>${vehicle.marca} - ${vehicle.linea}</p>
            <p>Modelo: ${vehicle.modelo}</p>
            <p>Cilindraje: ${vehicle.cilindraje}</p>`;
            
            const editarBoton = document.createElement('button');
            editarBoton.textContent = 'Editar';
            editarBoton.style.backgroundColor = '#6db9b8';
            editarBoton.addEventListener('click', () => editarVehicle(vehicle));

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Eliminar';
            deleteButton.style.backgroundColor = '#f76c6c';
            deleteButton.addEventListener('click', () => deleteVehicle(vehicle._id));
            
            div.appendChild(editarBoton);
            div.appendChild(deleteButton);

            vehiclesList.appendChild(div);
        });
    })
    .catch(error => console.error('Error al obtener los vehículos:', error));
}

// Modificamos el event listener del formulario para manejar tanto POST como PUT
document.getElementById('vehicle-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const placa = document.getElementById('placa').value;
    const claseVehicle = document.getElementById('claseVehicle').value;
    const marca = document.getElementById('marca').value;
    const linea = document.getElementById('linea').value;
    const modelo = document.getElementById('modelo').value;
    const cilindraje = document.getElementById('cilindraje').value;
    const vehicleId = e.target.dataset.id;
    
    if (vehicleId) {
    // Si hay un ID, actualizamos el vehículo existente
    updateVehicle(vehicleId, placa, claseVehicle, marca, linea, modelo, cilindraje);
    } else {
    // Si no hay ID, creamos un nuevo vehículo
    createVehicle(placa, claseVehicle, marca, linea, modelo, cilindraje);
    }
});

// Función para crear un nuevo vehículo (POST)
function createVehicle(placa, claseVehicle, marca, linea, modelo, cilindraje) {
    if (!token) {
        alert("Debes iniciar sesión para crear un vehículo.");
        window.location.href = '../index.html'; // Redirigir al login si no hay token
        return;
    }

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // Incluir el token en el encabezado
        },
        body: JSON.stringify({ placa, claseVehicle, marca, linea, modelo, cilindraje })
    })
    .then(response => response.json())
    .then(() => {
        alert("Vehículo creado correctamente");
        getVehicles(); // Actualizar la lista de vehículos
        document.getElementById('vehicle-form').reset(); // Limpiar el formulario
    })
    .catch(error => console.error('Error al crear el vehículo:', error));
}

// Función para actualizar un vehículo (PUT)
function updateVehicle(id, placa, claseVehicle, marca, linea, modelo, cilindraje) {
    if (!token) {
        alert("Debes iniciar sesión para actualizar un vehículo.");
        window.location.href = '../index.html'; // Redirigir al login si no hay token
    return;
    }

    fetch(`${apiUrl}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // Incluir el token en el encabezado
        },
        body: JSON.stringify({ placa, claseVehicle, marca, linea, modelo, cilindraje })
    })
        .then(response => response.json())
        .then(() => {
            getVehicles(); // Actualizamos la lista de vehículos
            document.getElementById('vehicle-form').reset(); // Limpiamos el formulario
            document.getElementById('vehicle-form').dataset.id = ''; // Limpiamos el ID guardado
        })
    .catch(error => console.error('Error al actualizar el vehículo:', error));
}

// Función para eliminar un vehículo (DELETE)
function deleteVehicle(id) {
    if (!token) {
    alert("Debes iniciar sesión para eliminar un vehículo.");
    window.location.href = '../index.html'; // Redirigir al login si no hay token
    return;
    }

    if (confirm('¿Estás seguro de que quieres eliminar este vehículo?')) {
        fetch(`${apiUrl}/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}` // Incluir el token en el encabezado
            }   
        })
        .then(() => getVehicles()) // Actualizamos la lista de vehículos después de eliminar
        .catch(error => console.error('Error al eliminar el vehículo:', error));
    }
}

// Modificamos la función editarVehicle para trabajar con updateVehicle
function editarVehicle(vehicle) {
    document.getElementById('placa').value = vehicle.placa;
    document.getElementById('claseVehicle').value = vehicle.claseVehicle;
    document.getElementById('marca').value = vehicle.marca;
    document.getElementById('linea').value = vehicle.linea;
    document.getElementById('modelo').value = vehicle.modelo;
    document.getElementById('cilindraje').value = vehicle.cilindraje;
    document.getElementById('vehicle-form').dataset.id = vehicle._id;
}

// Inicializar la lista de vehículos al cargar la página
getVehicles();
