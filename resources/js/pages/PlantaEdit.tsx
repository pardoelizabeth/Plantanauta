import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { FormEventHandler } from 'react';

interface Planta {
  id: number;
  nombre: string;
  imagen: string;
  descripcion: string;
  florea: string;
  epoca: string;
  origen: string;
  agua: string;
  sol: string;
  temperatura: string;
}

interface Props {
  planta: Planta;
}

export default function PlantaEdit({ planta }: Props) {
  const { data, setData, put, processing, errors } = useForm({
    nombre: planta.nombre || '',
    imagen: planta.imagen || '',
    descripcion: planta.descripcion || '',
    florea: planta.florea || '',
    epoca: planta.epoca || '',
    origen: planta.origen || '',
    agua: planta.agua || '',
    sol: planta.sol || '',
    temperatura: planta.temperatura || '',
  });

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    put(route('plantas.update', planta.id));
  };

  return (
    <AppLayout>
      <Head title={`Editar ${planta.nombre}`} />
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-md">
        <h1 className="text-2xl font-semibold mb-4">Editar planta: {planta.nombre}</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="nombre">Nombre</Label>
            <Input id="nombre" value={data.nombre} onChange={(e) => setData('nombre', e.target.value)} />
            {errors.nombre && <p className="text-red-500 text-sm">{errors.nombre}</p>}
          </div>

          <div>
            <Label htmlFor="imagen">URL de Imagen</Label>
            <Input id="imagen" value={data.imagen} onChange={(e) => setData('imagen', e.target.value)} />
          </div>

          <div>
            <Label htmlFor="descripcion">Descripción</Label>
            <Textarea id="descripcion" value={data.descripcion} onChange={(e) => setData('descripcion', e.target.value)} />
          </div>

          <div>
            <Label htmlFor="florea">¿Florea?</Label>
            <Input id="florea" value={data.florea} onChange={(e) => setData('florea', e.target.value)} />
          </div>

          <div>
            <Label htmlFor="epoca">Época de floración</Label>
            <Input id="epoca" value={data.epoca} onChange={(e) => setData('epoca', e.target.value)} />
          </div>

          <div>
            <Label htmlFor="origen">Origen</Label>
            <Input id="origen" value={data.origen} onChange={(e) => setData('origen', e.target.value)} />
          </div>

          <div>
            <Label htmlFor="agua">Requerimientos de agua</Label>
            <Input id="agua" value={data.agua} onChange={(e) => setData('agua', e.target.value)} />
          </div>

          <div>
            <Label htmlFor="sol">Exposición solar</Label>
            <Input id="sol" value={data.sol} onChange={(e) => setData('sol', e.target.value)} />
          </div>

          <div>
            <Label htmlFor="temperatura">Temperatura ideal</Label>
            <Input id="temperatura" value={data.temperatura} onChange={(e) => setData('temperatura', e.target.value)} />
          </div>

          <div className="pt-4 flex justify-end">
            <Button type="submit" disabled={processing}>
              Guardar cambios
            </Button>
          </div>
        </form>
      </div>
    </AppLayout>
  );
}
