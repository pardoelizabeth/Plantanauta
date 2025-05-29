import { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { router } from '@inertiajs/react';


const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Agregar planta',
    href: '/agregarplantas',
  },
];

export default function AgregarPlanta() {
  // Estado para cada campo
  const [nombre, setNombre] = useState('');
  const [imagen, setImagen] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [tipo, setTipo] = useState(''); // planta o flor
  const [florea, setFlorea] = useState(''); // sí o no
  const [epoca, setEpoca] = useState('');
  const [origen, setOrigen] = useState('');
  const [agua, setAgua] = useState('');
  const [sol, setSol] = useState('');
  const [temperatura, setTemperatura] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  router.post('/plantas', {
    nombre,
    imagen,
    descripcion,
    tipo,
    florea,
    epoca,
    origen,
    agua,
    sol,
    temperatura,
  });
};

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Agregar planta" />
      <div className="w-full min-h-screen py-10 px-4 sm:px-6 lg:px-8 bg-white rounded-2xl shadow flex justify-center">
        <div className="w-full max-w-3xl bg-white rounded-2xl shadow p-8">
          <h1 className="text-2xl font-semibold mb-6">Agregar nueva planta</h1>
          <form className="space-y-6 w-full" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="nombre">Nombre científico y común</Label>
              <Input
                id="nombre"
                placeholder="Ejemplo: Rosa (Rosa spp.)"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="imagen">URL de imagen</Label>
              <Input
                id="imagen"
                placeholder="Ejemplo: https://url-de-imagen.com"
                value={imagen}
                onChange={(e) => setImagen(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="descripcion">Descripción botánica</Label>
              <Textarea
                id="descripcion"
                placeholder="Descripción de la planta"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="tipo">¿Es una planta o una flor?</Label>
              <Select
                value={tipo}
                onValueChange={(value) => setTipo(value)}
              >
                <SelectTrigger id="tipo">
                  <SelectValue placeholder="Selecciona una opción" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="planta">Planta</SelectItem>
                  <SelectItem value="flor">Flor</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="florea">¿Da flores?</Label>
              <Select
                value={florea}
                onValueChange={(value) => setFlorea(value)}
              >
                <SelectTrigger id="florea">
                  <SelectValue placeholder="Selecciona una opción" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Sí">Sí</SelectItem>
                  <SelectItem value="No">No</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="epoca">Época de floración</Label>
              <Input
                id="epoca"
                placeholder="Ejemplo: Primavera y verano"
                value={epoca}
                onChange={(e) => setEpoca(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="origen">Origen</Label>
              <Input
                id="origen"
                placeholder="Ejemplo: Asia, Europa, América"
                value={origen}
                onChange={(e) => setOrigen(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="agua">Requerimientos hídricos</Label>
              <Select
                value={agua}
                onValueChange={(value) => setAgua(value)}
              >
                <SelectTrigger id="agua">
                  <SelectValue placeholder="Selecciona un nivel" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Escaso">Escaso</SelectItem>
                  <SelectItem value="Moderado">Moderado</SelectItem>
                  <SelectItem value="Abundante">Abundante</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="sol">Exposición solar</Label>
              <Select
                value={sol}
                onValueChange={(value) => setSol(value)}
              >
                <SelectTrigger id="sol">
                  <SelectValue placeholder="Selecciona una opción" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pleno sol">Pleno sol</SelectItem>
                  <SelectItem value="Sombra parcial">Sombra parcial</SelectItem>
                  <SelectItem value="Luz indirecta">Luz indirecta</SelectItem>
                  <SelectItem value="Sol directo">Sol directo</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="temperatura">Rango de temperatura ideal</Label>
              <Input
                id="temperatura"
                placeholder="Ejemplo: 15-25°C"
                value={temperatura}
                onChange={(e) => setTemperatura(e.target.value)}
              />
            </div>

            <Button type="submit" className="bg-[#8ac03f] hover:bg-[#7eb138] text-white">
              Guardar planta
            </Button>
          </form>
        </div>
      </div>
    </AppLayout>
  );
}
