<?php
include 'conexiones.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $cliente = $_POST['cliente'];
    $dni = $_POST['dni'];
    $cancha = $_POST['cancha'];
    $fecha = $_POST['fecha'];
    $horario = $_POST['horario'];
    $metodo_pago = $_POST['metodo_pago'];
    $precio_total = $_POST['precio_total'];

    $sql = "INSERT INTO reservas (cliente, dni, cancha, fecha, horario, metodo_pago, precio_total) VALUES ('$cliente', '$dni', '$cancha', '$fecha', '$horario', '$metodo_pago', '$precio_total')";
    if ($conexion->query($sql) === TRUE) {
        echo "Reserva guardada correctamente";
    } else {
        echo "Error: " . $sql . "<br>" . $conexion->error;
    }

    $conexion->close();
}
?>
