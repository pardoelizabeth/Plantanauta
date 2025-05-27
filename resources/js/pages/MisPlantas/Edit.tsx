import { useForm } from '@inertiajs/react'
import React from 'react'
import AppLayout from '@/layouts/app-layout'

interface EditProps {
  userPlanta: {
    id: number
    nombre: string
    imagen: string | null
    frecuencia_riego: string | null
    planta_id: number | null
  }
  plantas: { id: number; nombre: string }[]
}

export default function Edit({ userPlanta, plantas }: EditProps) {
  const { data, setData, post, progress, errors } = useForm({
    _method: 'put',
    nombre: userPlanta.nombre,
    imagen: null as File | null,
    frecuencia_riego: userPlanta.frecuencia_riego ?? '',
    planta_id: userPlanta.planta_id ?? null,
  })

  function submit(e: React.FormEvent) {
    e.preventDefault()
    post(`/mis-plantas/${userPlanta.id}`)
  }

  return (
    <AppLayout>
      <div className="p-6 max-w-xl mx-auto bg-white rounded-xl shadow mt-6">
        <h1 className="text-2xl font-bold mb-6">Editar planta</h1>
        <form onSubmit={submit} encType="multipart/form-data" className="space-y-6">
          <div>
            <label className="block font-semibold mb-1">Nombre personalizado</label>
            <input
              type="text"
              value={data.nombre}
              onChange={e => setData('nombre', e.target.value)}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-green-300"
            />
            {errors.nombre && <p className="text-red-600 mt-1">{errors.nombre}</p>}
          </div>

          <div>
            <label className="block font-semibold mb-1">Imagen</label>
            <input
              type="file"
              onChange={e => setData('imagen', e.target.files?.[0] || null)}
              className="block"
            />
            {errors.imagen && <p className="text-red-600 mt-1">{errors.imagen}</p>}
            {userPlanta.imagen && (
              <img
                src={userPlanta.imagen ? `/storage/${userPlanta.imagen}` : '/images/default-plant.jpg'}
                alt="Vista previa"
                className="w-32 mt-3 rounded"
              />
            )}
          </div>

          <div>
            <label className="block font-semibold mb-1">Frecuencia de riego</label>
            <input
              type="text"
              value={data.frecuencia_riego}
              onChange={e => setData('frecuencia_riego', e.target.value)}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-green-300"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Planta base (opcional)</label>
            <select
              value={data.planta_id ?? ''}
              onChange={e => setData('planta_id', e.target.value ? parseInt(e.target.value) : null)}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-green-300"
            >
              <option value="">-- Seleccionar planta base --</option>
              {plantas.map(p => (
                <option key={p.id} value={p.id}>
                  {p.nombre}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Guardar cambios
            </button>
          </div>

          {progress && (
            <div className="mt-2 text-sm text-gray-600">
              Subiendo imagen: {progress.percentage}%
            </div>
          )}
        </form>
      </div>
    </AppLayout>
  )
}
