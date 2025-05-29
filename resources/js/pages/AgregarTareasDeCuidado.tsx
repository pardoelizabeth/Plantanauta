import { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head, router } from '@inertiajs/react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Agregar tarea de cuidado',
    href: '/agregartareasdecuidado',
  },
];

export default function AgregarTareaCuidado() {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [imagen, setImagen] = useState('');
  const [frecuencia, setFrecuencia] = useState('');
  const [materiales, setMateriales] = useState('');
  const [instrucciones, setInstrucciones] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    router.post('/tareascuidado/store', {

      nombre,
      descripcion,
      frecuencia,
      materiales,
      instrucciones,
      imagen,
    });
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Agregar tarea de cuidado" />
      <div className="w-full min-h-screen py-10 px-4 sm:px-6 lg:px-8 bg-white rounded-2xl shadow flex justify-center">
        <div className="w-full max-w-3xl bg-white rounded-2xl shadow p-8">
          <h1 className="text-2xl font-semibold mb-6">Agregar tarea de cuidado</h1>
          <form className="space-y-6 w-full" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="nombre">Nombre de la tarea</Label>
              <Input
                id="nombre"
                placeholder="Ej. Riego, Abono, Trasplante"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="descripcion">Descripción general</Label>
              <Textarea
                id="descripcion"
                placeholder="Explicación general sobre esta tarea"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
              />
            </div>

            <div>
            <Label htmlFor="imagen">URL de imagen descriptiva</Label>
            <Input
                id="imagen"
                placeholder="Ej. https://ejemplo.com/riego.jpg"
                value={imagen}
                onChange={(e) => setImagen(e.target.value)}
            />
            </div>

            <div>
              <Label htmlFor="frecuencia">Frecuencia sugerida (opcional)</Label>
              <Input
                id="frecuencia"
                placeholder="Ej. Cada semana, una vez al mes..."
                value={frecuencia}
                onChange={(e) => setFrecuencia(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="materiales">Materiales necesarios (opcional)</Label>
              <Textarea
                id="materiales"
                placeholder="Ej. Regadera, tierra abonada, pala..."
                value={materiales}
                onChange={(e) => setMateriales(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="instrucciones">Instrucciones paso a paso (opcional)</Label>
              <Textarea
                id="instrucciones"
                placeholder="Describe cómo realizar esta tarea correctamente"
                value={instrucciones}
                onChange={(e) => setInstrucciones(e.target.value)}
              />
            </div>

            <Button type="submit" className="bg-[#8ac03f] hover:bg-[#7eb138] text-white">
              Guardar tarea de cuidado
            </Button>
          </form>
        </div>
      </div>
    </AppLayout>
  );
}
