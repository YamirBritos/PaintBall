<?php
$host = "localhost";
$usuario = "root"; 
$password = ""; 
$base_datos = "reservas_paintball"; 

$conexion = new mysqli($host, $usuario, $password, $base_datos);

if ($conexion->connect_error) {
    die("Error de conexión: " . $conexion->connect_error);
}
?>
