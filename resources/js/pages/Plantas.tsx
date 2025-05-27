import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import {
  Info, Flower, CalendarRange, MapPinned,
  Droplet, Sun, Thermometer, Edit, Trash2, X, Check
} from 'lucide-react';
import { router } from '@inertiajs/react';
import { useState } from 'react';

const breadcrumbs1: BreadcrumbItem[] = [
  { title: 'Flores y Plantas', href: '/plantas' },
];

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
  plantas: Planta[];
}

export default function Plantas({ plantas }: Props) {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [plantaAEliminar, setPlantaAEliminar] = useState<number | null>(null);

  const confirmarEliminacion = () => {
    if (plantaAEliminar !== null) {
      router.delete(`/plantas/${plantaAEliminar}`);
      setMostrarModal(false);
      setPlantaAEliminar(null);
    }
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs1}>
      <Head title="Flores y Plantas" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
        {plantas.map((planta) => (
          <div key={planta.id} className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col">
            <img
              src={planta.imagen}
              alt={planta.nombre}
              className="h-48 w-full object-cover"
            />
            <div className="p-4 flex flex-col flex-grow">
              <div className="space-y-2 flex-grow">
                <h2 className="text-lg font-semibold">{planta.nombre}</h2>
                <p className="text-gray-700 text-base font-medium flex items-start gap-2">
                  <Info className="w-6 h-6 shrink-0 mt-[2px]" style={{ color: '#809671' }} />
                  {planta.descripcion}
                </p>
                <p className="text-gray-600 text-sm flex items-start gap-2">
                  <Flower className="w-6 h-6 shrink-0 mt-[2px]" style={{ color: '#D38C9D' }} />
                  <strong>Floración:</strong> {planta.florea}
                </p>
                <p className="text-gray-600 text-sm flex items-start gap-2">
                  <CalendarRange className="w-6 h-6 shrink-0 mt-[2px]" style={{ color: '#A1B5D8' }} />
                  <strong>Época:</strong> {planta.epoca}
                </p>
                <p className="text-gray-600 text-sm flex items-start gap-2">
                  <MapPinned className="w-6 h-6 shrink-0 mt-[2px]" style={{ color: '#CC7952' }} />
                  <strong>Origen:</strong> {planta.origen}
                </p>
                <p className="text-gray-600 text-sm flex items-start gap-2">
                  <Droplet className="w-6 h-6 shrink-0 mt-[2px] text-cyan-500" />
                  <strong>Agua:</strong> {planta.agua}
                </p>
                <p className="text-gray-600 text-sm flex items-start gap-2">
                  <Sun className="w-6 h-6 shrink-0 mt-[2px] text-orange-400" />
                  <strong>Sol:</strong> {planta.sol}
                </p>
                <p className="text-gray-600 text-sm flex items-start gap-2">
                  <Thermometer className="w-6 h-6 shrink-0 mt-[2px] text-red-400" />
                  <strong>Temperatura:</strong> {planta.temperatura}
                </p>
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <button
                  className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 font-medium"
                  onClick={() => router.get(`/plantas/${planta.id}/editar`)}
                >
                  <Edit className="w-4 h-4" />
                  Editar
                </button>
                <button
                  className="flex items-center gap-1 text-sm text-red-600 hover:text-red-800 font-medium"
                  onClick={() => {
                    setMostrarModal(true);
                    setPlantaAEliminar(planta.id);
                  }}
                >
                  <Trash2 className="w-4 h-4" />
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {mostrarModal && (
        <div className="fixed inset-0 backdrop-blur-sm bg-white/10 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 shadow-lg max-w-sm w-full text-center">
            <h2 className="text-lg font-semibold mb-4">¿Eliminar planta?</h2>
            <p className="mb-6 text-gray-600">¿Estás seguro(a) de que deseas eliminar esta tarea de cuidado?</p>
            <div className="flex justify-center gap-4">
              <button
                className="flex items-center gap-1 px-3 py-1.5 rounded-md bg-gray-200 hover:bg-gray-300 text-sm"
                onClick={() => {
                  setMostrarModal(false);
                  setPlantaAEliminar(null);
                }}
              >
                <X className="w-4 h-4" /> Cancelar
              </button>
              <button
                className="flex items-center gap-1 px-3 py-1.5 rounded-md bg-red-600 hover:bg-red-700 text-white text-sm"
                onClick={confirmarEliminacion}
              >
                <Check className="w-4 h-4" /> Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </AppLayout>
  );
}
