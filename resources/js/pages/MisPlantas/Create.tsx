import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

interface PlantaBase {
  id: number;
  nombre: string;
  agua: string; // campo que indica frecuencia de riego
}

interface Props {
  plantas: PlantaBase[];
}

export default function MisPlantasCreate({ plantas }: Props) {
  const { data, setData, post, processing, errors } = useForm<{
    nombre: string;
    imagen: File | null;
    planta_id: string;
    frecuencia_riego: string;
  }>({
    nombre: '',
    imagen: null,
    planta_id: '',
    frecuencia_riego: '',
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/mis-plantas');
  };

  const handlePlantaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    setData('planta_id', selectedId);

    const plantaSeleccionada = plantas.find(p => p.id.toString() === selectedId);
    if (plantaSeleccionada) {
      setData('frecuencia_riego', plantaSeleccionada.agua);
    } else {
      setData('frecuencia_riego', '');
    }
  };

  return (
    <AppLayout>
      <Head title="Agregar planta" />
      <div className="p-6 max-w-2xl mx-auto">
        <h1 className="text-xl font-bold mb-4">Registrar una nueva planta</h1>
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block font-medium">Nombre</label>
            <input
              type="text"
              className="w-full border p-2 rounded"
              value={data.nombre}
              onChange={(e) => setData('nombre', e.target.value)}
            />
            {errors.nombre && <div className="text-red-500 text-sm">{errors.nombre}</div>}
          </div>

          <div>
            <label className="block font-medium">Imagen</label>
            <input
              type="file"
              className="w-full border p-2 rounded"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setData('imagen', e.target.files ? e.target.files[0] : null)
              }
            />
            {errors.imagen && <div className="text-red-500 text-sm">{errors.imagen}</div>}
          </div>

          <div>
            <label className="block font-medium">Planta base (opcional)</label>
            <select
              className="w-full border p-2 rounded"
              value={data.planta_id}
              onChange={handlePlantaChange}
            >
              <option value="">Seleccionar planta</option>
              {plantas.length > 0 ? (
                plantas.map((planta) => (
                  <option key={planta.id} value={planta.id}>
                    {planta.nombre}
                  </option>
                ))
              ) : (
                <option disabled>No hay plantas disponibles</option>
              )}
            </select>
            {errors.planta_id && <div className="text-red-500 text-sm">{errors.planta_id}</div>}
          </div>

          <div>
            <label className="block font-medium">
              Frecuencia de riego (Campo modificable si tu planta no se encuentra en la lista o deseas una frecuencia distinta)
            </label>
            <input
              type="text"
              className="w-full border p-2 rounded"
              value={data.frecuencia_riego}
              onChange={(e) => setData('frecuencia_riego', e.target.value)}
            />
            <label className="block font-medium">Días a la semana</label>
            {errors.frecuencia_riego && <div className="text-red-500 text-sm">{errors.frecuencia_riego}</div>}
          </div>

          <button
            type="submit"
            disabled={processing}
            className="px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700"
          >
            Guardar planta
          </button>
        </form>
      </div>
    </AppLayout>
  );
}
