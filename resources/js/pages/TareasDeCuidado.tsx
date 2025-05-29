import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Info, Repeat, Hammer, ClipboardList, Edit, Trash2, X, Check } from 'lucide-react';
import { router } from '@inertiajs/react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Tareas de Cuidado', href: '/tareascuidado' },
];

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
  tareas: TareaCuidado[];
}

export default function TareasCuidado({ tareas }: Props) {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [tareaAEliminar, setTareaAEliminar] = useState<number | null>(null);

  const confirmarEliminacion = () => {
    if (tareaAEliminar !== null) {
      router.delete(`/tareascuidado/${tareaAEliminar}`);
      setMostrarModal(false);
      setTareaAEliminar(null);
    }
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Tareas de Cuidado" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
        {tareas.map((tarea) => (
          <div key={tarea.id} className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col">
            {tarea.imagen && (
              <img src={tarea.imagen} alt={tarea.nombre} className="h-48 w-full object-cover" />
            )}
            <div className="p-4 space-y-2 flex flex-col flex-1">
              <h2 className="text-lg font-semibold">{tarea.nombre}</h2>
              <p className="text-gray-700 text-base font-medium flex items-start gap-2">
                <Info className="w-6 h-6 shrink-0 mt-[2px]" style={{ color: '#809671' }} />
                {tarea.descripcion}
              </p>
              {tarea.frecuencia && (
                <p className="text-gray-600 text-sm flex items-start gap-2">
                  <Repeat className="w-6 h-6 shrink-0 mt-[2px] text-blue-400" />
                  <strong>Frecuencia:</strong> {tarea.frecuencia}
                </p>
              )}
              {tarea.materiales && (
                <p className="text-gray-600 text-sm flex items-start gap-2">
                  <Hammer className="w-6 h-6 shrink-0 mt-[2px] text-orange-400" />
                  <strong>Materiales:</strong> {tarea.materiales}
                </p>
              )}
              {tarea.instrucciones && (
                <p className="text-gray-600 text-sm flex items-start gap-2">
                  <ClipboardList className="w-6 h-6 shrink-0 mt-[2px] text-indigo-500" />
                  <strong>Instrucciones:</strong> {tarea.instrucciones}
                </p>
              )}
              <div className="flex justify-end gap-2 pt-4 mt-auto">
                <button
                  className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 font-medium"
                  onClick={() => router.get(`/tareascuidado/${tarea.id}/editar`)}
                >
                  <Edit className="w-4 h-4" />
                  Editar
                </button>
                <button
                  className="flex items-center gap-1 text-sm text-red-600 hover:text-red-800 font-medium"
                  onClick={() => {
                    setTareaAEliminar(tarea.id);
                    setMostrarModal(true);
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

      {/* Modal de confirmación */}
      {mostrarModal && (
        <div className="fixed inset-0 backdrop-blur-sm bg-white/10 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-semibold mb-4">¿Eliminar tarea?</h2>
            <p className="text-gray-700 mb-6">¿Estás seguro(a) de que deseas eliminar esta tarea de cuidado?</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setMostrarModal(false)}
                className="flex items-center gap-1 px-3 py-1.5 rounded-md bg-gray-200 hover:bg-gray-300 text-sm"
              >
                <X className="w-4 h-4" /> Cancelar
              </button>
              <button
                onClick={confirmarEliminacion}
                className="flex items-center gap-1 px-3 py-1.5 rounded-md bg-red-600 hover:bg-red-700 text-white text-sm"
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
