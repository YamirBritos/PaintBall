<?php
// Incluir la conexión a la base de datos
include('conexion.php');

// Obtener los datos del formulario
$cliente = $_POST['cliente'];
$dni = $_POST['dni'];
$cancha = $_POST['cancha'];
$fecha = $_POST['fecha'];
$horario = $_POST['horario'];
$metodo_pago = $_POST['metodo_pago'];
$precio_total = $_POST['precio_total'];

// Insertar los datos en la base de datos
$sql = "INSERT INTO reservas (cliente, dni, cancha, fecha, horario, metodo_pago, precio_total) 
        VALUES ('$cliente', '$dni', '$cancha', '$fecha', '$horario', '$metodo_pago', '$precio_total')";

if ($conexion->query($sql) === TRUE) {
    // Llamar a la función para generar el PDF
    header("Location: generar_pdf.php?cliente=$cliente&dni=$dni&cancha=$cancha&fecha=$fecha&horario=$horario&metodo_pago=$metodo_pago&precio_total=$precio_total");
} else {
    echo "Error: " . $sql . "<br>" . $conexion->error;
}

$conexion->close();
?>
