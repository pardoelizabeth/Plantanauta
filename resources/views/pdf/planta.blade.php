<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Ficha de planta</title>
    <style>
        body {
            font-family: sans-serif;
            text-align: center;
        }

        h1 {
            color: #5D4037;
            margin-bottom: 10px;
        }

        .planta-img {
            width: 200px;
            height: 200px;
            object-fit: cover;
            border-radius: 10px;
            margin: 0 auto 20px auto;
        }

        .info {
            text-align: left;
            margin: 0 auto;
            width: 80%;
            max-width: 600px;
        }

        p {
            margin-bottom: 6px;
        }

        hr {
            margin: 30px 0;
        }
    </style>
</head>
<body>

    <h1>{{ $userPlanta->nombre }}</h1>

    @if($userPlanta->imagen)
        <img src="{{ public_path('storage/' . $userPlanta->imagen) }}" alt="Imagen de la planta" class="planta-img">
    @endif

    <div class="info">
        <p><strong>Frecuencia de riego:</strong> {{ $userPlanta->frecuencia_riego ?? 'No especificada' }}</p>

        @if($planta)
            <hr>
            <h2>Información de referencia</h2>
            <p><strong>Nombre científico:</strong> {{ $planta->nombre }}</p>
            <p><strong>Tipo:</strong> {{ ucfirst($planta->tipo) }}</p>
            <p><strong>Descripción:</strong> {{ $planta->descripcion }}</p>
            <p><strong>¿Florea?</strong> {{ $planta->florea }}</p>
            <p><strong>Época de floración:</strong> {{ $planta->epoca }}</p>
            <p><strong>Origen:</strong> {{ $planta->origen }}</p>
            <p><strong>Requerimientos hídricos:</strong> {{ $planta->agua }}</p>
            <p><strong>Exposición solar:</strong> {{ $planta->sol }}</p>
            <p><strong>Temperatura ideal:</strong> {{ $planta->temperatura }}</p>
        @endif
    </div>

</body>
</html>
