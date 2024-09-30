<?php
require('fpdf/fpdf.php');

// Recibir los datos de la reserva
$cliente = $_GET['cliente'];
$dni = $_GET['dni'];
$cancha = $_GET['cancha'];
$fecha = $_GET['fecha'];
$horario = $_GET['horario'];
$metodo_pago = $_GET['metodo_pago'];
$precio_total = $_GET['precio_total'];

// Crear PDF
$pdf = new FPDF();
$pdf->AddPage();
$pdf->SetFont('Arial', 'B', 16);

// Escribir contenido
$pdf->Cell(40, 10, "Factura de Reserva");
$pdf->Ln(10);
$pdf->Cell(40, 10, "Cliente: $cliente");
$pdf->Ln(10);
$pdf->Cell(40, 10, "DNI: $dni");
$pdf->Ln(10);
$pdf->Cell(40, 10, "Cancha: $cancha");
$pdf->Ln(10);
$pdf->Cell(40, 10, "Fecha: $fecha");
$pdf->Ln(10);
$pdf->Cell(40, 10, "Horario: $horario");
$pdf->Ln(10);
$pdf->Cell(40, 10, "Metodo de Pago: $metodo_pago");
$pdf->Ln(10);
$pdf->Cell(40, 10, "Precio Total: $$precio_total");

// Guardar PDF en la carpeta 'pdfs'
$pdf_output_path = "../pdfs/factura_$dni.pdf";
$pdf->Output('F', $pdf_output_path);

// Redirigir al usuario a la página de confirmación
header("Location: ../index.html");
?>
