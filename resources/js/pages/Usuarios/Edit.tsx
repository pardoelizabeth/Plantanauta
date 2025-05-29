import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { FormEventHandler } from 'react';

interface Props {
  usuario: {
    id: number;
    name: string;
    email: string;
    role: 'admin' | 'usuario';
  };
}

export default function EditUsuario({ usuario }: Props) {
  const { data, setData, put, processing, errors } = useForm({
    name: usuario.name,
    email: usuario.email,
    role: usuario.role,
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    put(`/usuarios/${usuario.id}`);
  };

  return (
    <AppLayout>
      <Head title="Editar Usuario" />
      <div className="p-6 max-w-xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Editar Usuario</h1>
        <form onSubmit={submit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Nombre
            </label>
            <input
              id="name"
              type="text"
              value={data.name}
              onChange={(e) => setData('name', e.target.value)}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring focus:ring-blue-200"
            />
            {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Correo electrónico
            </label>
            <input
              id="email"
              type="email"
              value={data.email}
              onChange={(e) => setData('email', e.target.value)}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring focus:ring-blue-200"
            />
            {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700">
              Rol
            </label>
            <select
              id="role"
              value={data.role}
              onChange={(e) => setData('role', e.target.value as 'admin' | 'usuario')}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring focus:ring-blue-200"
            >
              <option value="usuario">Usuario</option>
              <option value="admin">Administrador</option>
            </select>
            {errors.role && <p className="text-sm text-red-600 mt-1">{errors.role}</p>}
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={processing}
              className="px-4 py-2 bg-[#8ac03f] text-white rounded-lg hover:bg-[#7eb138] disabled:opacity-50"
            >
              Guardar cambios
            </button>
          </div>
        </form>
      </div>
    </AppLayout>
  );
}
