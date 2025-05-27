import { useEffect, useState } from 'react';
import axios from 'axios';
import { Head, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Download, Bell } from 'lucide-react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

interface Planta {
  id: number;
  nombre: string;
  imagen?: string;
  planta?: {
    nombre: string;
  };
}

interface Props {
  plantas?: Planta[];
}

export default function MisPlantasIndex({ plantas = [] }: Props) {
  const [clima, setClima] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPlantaId, setSelectedPlantaId] = useState<number | null>(null);
  const [correo, setCorreo] = useState('');

  // Nuevos estados para el modal de mensaje
  const [mensajeModalVisible, setMensajeModalVisible] = useState(false);
  const [mensajeModalTexto, setMensajeModalTexto] = useState('');

  // Estados para modal de eliminar planta
  const [modalEliminarVisible, setModalEliminarVisible] = useState(false);
  const [plantaEliminarId, setPlantaEliminarId] = useState<number | null>(null);

  const getRecomendacion = (main: string) => {
    switch (main) {
      case 'Rain':
      case 'Drizzle':
        return 'Está lloviendo, no riegues tus plantas hoy.';
      case 'Clear':
        return 'Hace sol, asegúrate de regar tus plantas si es necesario.';
      case 'Clouds':
        return 'Día nublado, riega solo si la tierra está seca.';
      case 'Snow':
        return 'Está nevando, mantén tus plantas protegidas del frío.';
      case 'Thunderstorm':
        return 'Hay tormenta, mantén tus plantas bajo techo si puedes.';
      case 'Mist':
      case 'Fog':
        return 'Hay niebla, riega si no ha llovido últimamente.';
      default:
        return 'Consulta el clima antes de regar tus plantas.';
    }
  };

  const abrirModal = (id: number) => {
    setSelectedPlantaId(id);
    setModalVisible(true);
  };

  const cerrarModal = () => {
    setModalVisible(false);
    setCorreo('');
  };

  const cerrarMensajeModal = () => {
    setMensajeModalVisible(false);
    setMensajeModalTexto('');
  };

  const activarRecordatorio = async () => {
    if (!correo || !selectedPlantaId) return;

    try {
      await axios.post('/mis-plantas/activar-recordatorio', {
        id: selectedPlantaId,
        correo,
      });

      setMensajeModalTexto('¡Recordatorio activado!');
      setMensajeModalVisible(true);
      cerrarModal();
    } catch (error) {
      console.error(error);
      setMensajeModalTexto('Hubo un error al activar el recordatorio.');
      setMensajeModalVisible(true);
    }
  };

  // Funciones para modal eliminar
  const abrirModalEliminar = (id: number) => {
    setPlantaEliminarId(id);
    setModalEliminarVisible(true);
  };

  const cerrarModalEliminar = () => {
    setModalEliminarVisible(false);
    setPlantaEliminarId(null);
  };

  const confirmarEliminar = () => {
    if (!plantaEliminarId) return;

    router.delete(`/mis-plantas/${plantaEliminarId}`);
    cerrarModalEliminar();
  };

  function CalendarioRiego({ fechaInicio }: { fechaInicio: string }) {
    const generarFechasCadaTresDias = (inicio: string, cantidad: number) => {
      const fechas: string[] = [];
      const fecha = new Date(inicio);
      for (let i = 0; i < cantidad; i++) {
        const nuevaFecha = new Date(fecha);
        nuevaFecha.setDate(fecha.getDate() + i * 3);
        fechas.push(nuevaFecha.toISOString().split('T')[0]);
      }
      return fechas;
    };

    const fechasRiego = generarFechasCadaTresDias(fechaInicio, 10); // genera 10 fechas

    return (
      <div className="text-center mt-4">
        <h3 className="text-base font-semibold mb-2 text-green-700">
          Días de riego recomendados
        </h3>
        <div className="flex justify-center">
          <Calendar
            className="border-none rounded-xl shadow-md p-2"
            tileClassName={({ date }) => {
              const dateStr = date.toISOString().split('T')[0];
              return fechasRiego.includes(dateStr) ? 'highlight-day' : '';
            }}
          />
        </div>
      </div>
    );
  }

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const lat = 22.1511; // San Luis Potosí
        const lon = -100.9761;
        const apiKey = '235ba4a9a9e27753b8e747cf5dbf940b'; // 🔑 Tu clave real
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=es&appid=${apiKey}`;
        const response = await axios.get(url);
        setClima(response.data);
      } catch (error) {
        console.error('Error al obtener el clima:', error);
      }
    };

    fetchWeather();
  }, []);

  return (
    <AppLayout>
      <Head title="Mis Plantas" />
      <div className="p-6">
        {/* Clima */}
        {clima && (
          <div className="mb-4 p-4 rounded-xl bg-blue-100 text-blue-800 space-y-2">
            <div className="flex items-center space-x-4">
              <img
                src={`https://openweathermap.org/img/wn/${clima.weather[0].icon}.png`}
                alt={clima.weather[0].description}
                className="w-10 h-10"
              />
              <div>
                <p className="font-semibold">Clima actual en tu ubicación:</p>
                <p>
                  {clima.weather[0].description} - {clima.main.temp}°C
                </p>
              </div>
            </div>
            <div className="mt-2">
              <p className="text-sm text-green-700">
                {getRecomendacion(clima.weather[0].main)}
              </p>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold">Mis Plantas</h1>
          <button
            onClick={() => router.get('/mis-plantas/crear')}
            className="px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700"
          >
            + Agregar planta
          </button>
        </div>

        {/* Lista de plantas */}
        {plantas.length === 0 ? (
          <p>No has registrado plantas aún.</p>
        ) : (
          <ul className="space-y-6">
            {plantas.map((planta) => (
              <li
                key={planta.id}
                className="p-4 border rounded-xl space-y-4"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={
                      planta.imagen
                        ? `/storage/${planta.imagen}`
                        : '/images/default-plant.jpg'
                    }
                    alt={planta.nombre}
                    className="w-40 h-40 object-cover rounded-lg"
                  />
                  <div>
                    <h2 className="text-lg font-semibold">{planta.nombre}</h2>
                    {planta.planta && (
                      <p className="text-sm text-gray-600">
                        Basada en: {planta.planta.nombre}
                      </p>
                    )}
                  </div>
                </div>

                <CalendarioRiego fechaInicio="2025-05-01" />

                {/* Botones */}
                <div className="flex flex-col items-end gap-2">
                  <button
                    onClick={() => abrirModal(planta.id)}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm w-[250px] justify-center"
                  >
                    <Bell size={16} />
                    Activar recordatorios
                  </button>

                  <a
                    href={`/mis-plantas/${planta.id}/descargar`}
                    target="_blank"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded text-sm font-medium text-white transition-colors w-[250px] justify-center"
                    style={{ backgroundColor: '#C19A6B' }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.backgroundColor =
                        '#A97A50';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.backgroundColor =
                        '#C19A6B';
                    }}
                  >
                    <Download size={16} />
                    Descargar información
                  </a>
                </div>
                <div className="flex justify-end w-full">
                  <div className="flex gap-2 w-[250px]">
                    <button
                      onClick={() =>
                        router.get(`/mis-plantas/${planta.id}/editar`)
                      }
                      className="flex-1 px-4 py-2 bg-green-600 text-white text-sm rounded hover:bg-green-700"
                    >
                      Editar
                    </button>

                    <button
                      onClick={() => abrirModalEliminar(planta.id)}
                      className="flex-1 px-4 py-2 bg-red-600 text-white text-sm rounded hover:bg-red-700"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}

        {/* Modal para activar recordatorio */}
        {modalVisible && (
          <div className="fixed inset-0 backdrop-blur-sm bg-white/10 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
              <h2 className="text-lg font-semibold mb-4">Activar recordatorios</h2>
              <p className="text-sm mb-2">
                Ingresa tu correo para recibir recordatorios de riego para esta
                planta.
              </p>
              <input
                type="email"
                placeholder="tu-correo@ejemplo.com"
                className="w-full p-2 border border-gray-300 rounded mb-4"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={cerrarModal}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancelar
                </button>
                <button
                  onClick={activarRecordatorio}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Activar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal para mostrar mensaje personalizado */}
        {mensajeModalVisible && (
          <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-sm text-center">
              <p className="mb-4 text-lg font-medium">{mensajeModalTexto}</p>
              <button
                onClick={cerrarMensajeModal}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Aceptar
              </button>
            </div>
          </div>
        )}

        {/* Modal Confirmar eliminación */}
        {modalEliminarVisible && (
          <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md text-center">
              <h2 className="text-lg font-semibold mb-4 text-red-600">
                Confirmar eliminación
              </h2>
              <p className="mb-6">
                ¿Estás seguro de que quieres eliminar esta planta? Esta acción no
                se puede deshacer.
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={cerrarModalEliminar}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancelar
                </button>
                <button
                  onClick={confirmarEliminar}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
