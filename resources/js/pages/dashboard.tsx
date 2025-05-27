import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <div className="flex items-center justify-center h-[calc(100vh-4rem)]"> {/* Ajusta la altura restando el header si aplica */}
                <div className="text-center px-4">
                    <h1 className="text-3xl font-bold text-green-800 mb-4">
                        ¡Bienvenido a Plantanauta! 🌱
                    </h1>
                    <p className="text-gray-700 text-lg max-w-2xl mx-auto">
                        Explora, cuida y organiza tus plantas de forma sencilla. Aquí podrás registrar tus plantas personales, recibir recordatorios de riego, consultar cuidados específicos y mantener un seguimiento visual de tu jardín. ¡Comienza tu aventura botánica ahora!
                    </p>
                </div>
            </div>
        </AppLayout>
    );
}
