<?php
include('conexion.php');

$sql = "SELECT * FROM reservas";
$resultado = $conexion->query($sql);

if ($resultado->num_rows > 0) {
    echo "<table border='1'><tr><th>Cliente</th><th>DNI</th><th>Cancha</th><th>Fecha</th><th>Horario</th><th>Metodo de Pago</th><th>Precio Total</th></tr>";
    while($fila = $resultado->fetch_assoc()) {
        echo "<tr><td>".$fila["cliente"]."</td><td>".$fila["dni"]."</td><td>".$fila["cancha"]."</td><td>".$fila["fecha"]."</td><td>".$fila["horario"]."</td><td>".$fila["metodo_pago"]."</td><td>".$fila["precio_total"]."</td></tr>";
    }
    echo "</table>";
} else {
    echo "No hay reservas registradas.";
}

$conexion->close();
?>
