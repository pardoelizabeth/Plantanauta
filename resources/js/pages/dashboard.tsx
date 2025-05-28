import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Inicio',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] px-4">
                <div className="text-center">
                    <img
                    src="https://i.imgur.com/JxtXSzz.png"
                    alt="Logo Plantanauta"
                    className="mx-auto h-50 mb-6" // mx-auto lo centra horizontalmente, mb-6 para separar del título
                    />
                    <h1 className="text-3xl font-bold text-green-800 mb-4">
                    ¡Bienvenido a Plantanauta!
                    </h1>
                    <p className="text-gray-700 text-lg max-w-2xl mx-auto">
                    Explora, cuida y organiza tus plantas de forma sencilla. Aquí podrás registrar tus plantas personales, recibir recordatorios de riego, consultar cuidados específicos y mantener un seguimiento visual de tu jardín. ¡Comienza tu aventura botánica ahora!
                    </p>
                </div>
            </div>

        </AppLayout>
    );
}
