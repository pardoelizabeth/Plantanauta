import { useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { type BreadcrumbItem } from '@/types';

interface TareaCuidado {
  id: number;
  nombre: string;
  descripcion: string;
  frecuencia?: string;
  materiales?: string;
  instrucciones?: string;
  imagen?: string;
}

interface Props {
  tarea: TareaCuidado;
}

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Tareas de Cuidado', href: '/tareascuidado' },
  { title: 'Editar tarea', href: '#' },
];

export default function TareasDeCuidadoEdit({ tarea }: Props) {
  const { data, setData, put, processing, errors } = useForm({
    nombre: tarea.nombre || '',
    descripcion: tarea.descripcion || '',
    imagen: tarea.imagen || '',
    frecuencia: tarea.frecuencia || '',
    materiales: tarea.materiales || '',
    instrucciones: tarea.instrucciones || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    put(`/tareascuidado/${tarea.id}`);
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Editar tarea de cuidado" />
      <div className="w-full min-h-screen py-10 px-4 sm:px-6 lg:px-8 bg-white rounded-2xl shadow flex justify-center">
        <div className="w-full max-w-3xl bg-white rounded-2xl shadow p-8">
          <h1 className="text-2xl font-semibold mb-6">Editar tarea de cuidado</h1>
          <form className="space-y-6 w-full" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="nombre">Nombre de la tarea</Label>
              <Input
                id="nombre"
                value={data.nombre}
                onChange={(e) => setData('nombre', e.target.value)}
              />
              {errors.nombre && <p className="text-red-500 text-sm">{errors.nombre}</p>}
            </div>

            <div>
              <Label htmlFor="descripcion">Descripción general</Label>
              <Textarea
                id="descripcion"
                value={data.descripcion}
                onChange={(e) => setData('descripcion', e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="imagen">URL de imagen descriptiva</Label>
              <Input
                id="imagen"
                value={data.imagen}
                onChange={(e) => setData('imagen', e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="frecuencia">Frecuencia sugerida (opcional)</Label>
              <Input
                id="frecuencia"
                value={data.frecuencia}
                onChange={(e) => setData('frecuencia', e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="materiales">Materiales necesarios (opcional)</Label>
              <Textarea
                id="materiales"
                value={data.materiales}
                onChange={(e) => setData('materiales', e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="instrucciones">Instrucciones paso a paso (opcional)</Label>
              <Textarea
                id="instrucciones"
                value={data.instrucciones}
                onChange={(e) => setData('instrucciones', e.target.value)}
              />
            </div>

            <Button type="submit" className="bg-[#8ac03f] hover:bg-[#7eb138] text-white" disabled={processing}>
              Guardar cambios
            </Button>
          </form>
        </div>
      </div>
    </AppLayout>
  );
}
