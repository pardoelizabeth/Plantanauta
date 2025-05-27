import { Head, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { useState } from 'react';
import { Edit, Trash2 } from 'lucide-react';

interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'usuario';
}

interface Props {
  usuarios: User[];
  authUserId: number;
}

export default function UsuariosIndex({ usuarios, authUserId }: Props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [usuarioId, setUsuarioId] = useState<number | null>(null);

  const confirmarEliminacion = () => {
    if (usuarioId !== null) {
      router.delete(`/usuarios/${usuarioId}`);
      setModalVisible(false);
    }
  };

  return (
    <AppLayout>
      <Head title="Administrar Usuarios" />
      <div className="p-6">
        <h1 className="text-xl font-bold mb-4">Usuarios registrados</h1>
        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2 border">Nombre</th>
              <th className="p-2 border">Correo</th>
              <th className="p-2 border">Rol</th>
              <th className="p-2 border text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario.id} className="border-t">
                <td className="p-2">{usuario.name}</td>
                <td className="p-2">{usuario.email}</td>
                <td className="p-2 capitalize">{usuario.role}</td>
                <td className="p-2 text-right space-x-2">
                  <button
                    onClick={() => router.get(`/usuarios/${usuario.id}/editar`)}
                    className="text-blue-600 hover:text-blue-800 text-sm"
                  >
                    <Edit className="inline-block w-4 h-4" /> Editar
                  </button>

                  {usuario.id !== authUserId && (
                    <button
                      onClick={() => {
                        setModalVisible(true);
                        setUsuarioId(usuario.id);
                      }}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      <Trash2 className="inline-block w-4 h-4" /> Eliminar
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalVisible && (
        <div className="fixed inset-0 backdrop-blur-sm bg-white/10 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 shadow-lg max-w-sm w-full text-center">
            <h2 className="text-lg font-semibold mb-4">¿Eliminar usuario?</h2>
            <p className="mb-6 text-gray-600">Esta acción no se puede deshacer.</p>
            <div className="flex justify-center gap-4">
              <button
                className="px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700"
                onClick={confirmarEliminacion}
              >
                Sí, eliminar
              </button>
              <button
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-xl hover:bg-gray-300"
                onClick={() => setModalVisible(false)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </AppLayout>
  );
}
