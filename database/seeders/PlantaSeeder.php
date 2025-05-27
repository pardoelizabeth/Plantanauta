<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Planta;

class PlantaSeeder extends Seeder
{
    public function run(): void
    {
        $plantas = [
            [
                'nombre' => 'Rosa (Rosa spp.)',
                'imagen' => 'https://bioky.es/wp-content/uploads/2024/06/HONGOS-EN-rosales.jpg',
                'descripcion' => 'Arbusto perenne de la familia Rosaceae con tallos espinosos y hojas compuestas imparipinnadas. Las flores son actinomorfas, con numerosos estambres y pétalos de colores variados.',
                'florea' => 'Sí, flores llamativas en una amplia gama de colores.',
                'epoca' => 'Primavera y verano.',
                'origen' => 'Zonas templadas del hemisferio norte.',
                'agua' => 'Riego regular, evitando encharcamientos.',
                'sol' => 'Pleno sol.',
                'temperatura' => '15-26°C.',
                'tipo' => 'Flor',
            ],
            [
                'nombre' => 'Lavanda (Lavandula angustifolia)',
                'imagen' => 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ40Ykh5L7eYVCybmSoDqsbPqPgUCzXen3zKw&s',
                'descripcion' => 'Subarbusto perenne de la familia Lamiaceae. Hojas opuestas, simples y lineares, con inflorescencias en espigas terminales y flores bilabiadas.',
                'florea' => 'Sí, flores violetas muy aromáticas.',
                'epoca' => 'Finales de primavera a verano.',
                'origen' => 'Región mediterránea.',
                'agua' => 'Escaso, tolerante a la sequía.',
                'sol' => 'Pleno sol.',
                'temperatura' => '15-30°C.',
                'tipo' => 'Flor',
            ],
            [
                'nombre' => 'Girasol (Helianthus annuus)',
                'imagen' => 'https://img.freepik.com/fotos-premium/girasol-helianthus-annuus_621486-4163.jpg',
                'descripcion' => 'Herbácea anual con tallo erecto, hojas alternas ovado-cordadas. Inflorescencia en capítulo con flores liguladas estériles y tubulosas fértiles.',
                'florea' => 'Sí, capítulos grandes amarillos que siguen al sol.',
                'epoca' => 'Verano.',
                'origen' => 'América del Norte.',
                'agua' => 'Moderado, riego frecuente en crecimiento.',
                'sol' => 'Pleno sol.',
                'temperatura' => '18-30°C.',
                'tipo' => 'Flor',
            ],
            [
                'nombre' => 'Orquídea (Phalaenopsis spp.)',
                'imagen' => 'https://www.hogarmania.com/archivos/201105/orquidea-mariposa-xl-668x400x80xX.jpg',
                'descripcion' => 'Epífita con hojas carnosas, raíces aéreas con velamen y flores zigomorfas con labelo prominente.',
                'florea' => 'Sí, flores de formas exóticas y larga duración.',
                'epoca' => 'Principalmente primavera y otoño.',
                'origen' => 'Regiones tropicales y subtropicales de Asia.',
                'agua' => 'Moderado, mantener humedad sin encharcar.',
                'sol' => 'Luz indirecta brillante.',
                'temperatura' => '18-27°C.',
                'tipo' => 'Flor',
            ],
            [
                'nombre' => 'Tulipán (Tulipa spp.)',
                'imagen' => 'https://logrono.es/documents/d/guest/tulipan1',
                'descripcion' => 'Planta bulbosa perenne con tallo simple, hojas basales lanceoladas y flores con 6 tépalos libres.',
                'florea' => 'Sí, flores solitarias de colores vivos.',
                'epoca' => 'Primavera.',
                'origen' => 'Asia central y Medio Oriente.',
                'agua' => 'Riego moderado, más durante floración.',
                'sol' => 'Pleno sol a sombra parcial.',
                'temperatura' => '13-20°C.',
                'tipo' => 'Flor',
            ],
            [
                'nombre' => 'Dalia (Dahlia spp.)',
                'imagen' => 'https://upload.wikimedia.org/wikipedia/commons/9/91/DahliaDahlstarSunsetPink.jpg',
                'descripcion' => 'Herbácea tuberosa perenne con hojas pinnadas, inflorescencias en capítulo y flores tubulosas internas.',
                'florea' => 'Sí, gran diversidad de formas y colores.',
                'epoca' => 'Verano a inicios de otoño.',
                'origen' => 'México y América Central.',
                'agua' => 'Riego abundante en floración.',
                'sol' => 'Pleno sol.',
                'temperatura' => '16-28°C.',
                'tipo' => 'Flor',
            ],
            [
                'nombre' => 'Hortensia (Hydrangea macrophylla)',
                'imagen' => 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMY7o9lXLRbM2m5Pi26DJUjApyTqKHoo8MHJP6SN6_8udQSd-ZqztWRzGqGn9jrXOYJIY&usqp=CAU',
                'descripcion' => 'Arbusto caducifolio con hojas opuestas y flores agrupadas en corimbos, con variación de color según el pH.',
                'florea' => 'Sí, flores estériles vistosas alrededor de las fértiles.',
                'epoca' => 'Primavera y verano.',
                'origen' => 'Japón y Corea.',
                'agua' => 'Requiere mucha humedad.',
                'sol' => 'Sombra parcial.',
                'temperatura' => '15-25°C.',
                'tipo' => 'Flor',
            ],
            [
                'nombre' => 'Jazmín (Jasminum officinale)',
                'imagen' => 'https://plantas.info/wp-content/uploads/2021/01/image-106.jpeg',
                'descripcion' => 'Liana o arbusto con hojas imparipinnadas y flores blancas muy fragantes.',
                'florea' => 'Sí, flores aromáticas muy valoradas.',
                'epoca' => 'Verano.',
                'origen' => 'Asia y regiones templadas.',
                'agua' => 'Moderado, evitar exceso.',
                'sol' => 'Pleno sol a sombra parcial.',
                'temperatura' => '16-30°C.',
                'tipo' => 'Flor',
            ],
            [
                'nombre' => 'Aloe vera',
                'imagen' => 'https://acdn-us.mitiendanube.com/stores/001/427/948/products/vera1-ba194c2a3ddfc7c6d216059200337671-1024-1024.jpg',
                'descripcion' => 'Suculenta perenne con hojas lanceoladas carnosas y flores tubulares en racimos.',
                'florea' => 'Sí, aunque rara en cultivo doméstico.',
                'epoca' => 'Primavera a verano.',
                'origen' => 'África del norte.',
                'agua' => 'Escaso, dejar secar entre riegos.',
                'sol' => 'Pleno sol.',
                'temperatura' => '20-30°C.',
                'tipo' => 'Flor',
            ],
            [
                'nombre' => 'Cactus Peyote (Lophophora williamsii)',
                'imagen' => 'https://www.researchgate.net/publication/353195094/figure/fig3/AS:1056047171121153@1628792674424/Flowering-Peyote-cactus-Lophophora-williamsii.png',
                'descripcion' => 'Cactus globoso sin espinas, con costillas poco marcadas, areolas lanosas y flores rosadas.',
                'florea' => 'Sí, flores pequeñas y discretas.',
                'epoca' => 'Verano.',
                'origen' => 'Desierto de Chihuahua.',
                'agua' => 'Muy escaso.',
                'sol' => 'Sol directo.',
                'temperatura' => '20-35°C.',
                'tipo' => 'Flor',
            ],
        ];

        foreach ($plantas as $planta) {
            Planta::create($planta);
        }
    }
}
