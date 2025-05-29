import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="flex min-h-screen flex-col items-center justify-center bg-[#FDFDFC] px-6 text-[#1b1b18] dark:bg-[#0a0a0a] dark:text-[#EDEDEC]">
                <header className="absolute right-6 top-6 flex gap-4">
                    {auth.user ? (
                        <Link
                            href={route('dashboard')}
                            className="rounded-sm border border-[#19140035] px-5 py-1.5 text-sm hover:border-[#1915014a] dark:border-[#3E3E3A] dark:hover:border-[#62605b]"
                        >
                            Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link
                                href={route('login')}
                                className="rounded-sm px-5 py-1.5 text-sm hover:underline"
                            >
                                Log in
                            </Link>
                            <Link
                                href={route('register')}
                                className="rounded-sm border border-[#19140035] px-5 py-1.5 text-sm hover:border-[#1915014a] dark:border-[#3E3E3A] dark:hover:border-[#62605b]"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </header>

                <main className="flex flex-col items-center justify-center gap-8 text-center md:flex-row md:text-left">
    <img
        src="https://i.imgur.com/JxtXSzz.png"
        alt="Logo Plantanauta"
        className="h-60 w-60 dark:invert"
    />
    <div>
    <h1 className="text-5xl font-bold">Plantanauta</h1>
    <p className="mt-4 text-xl font-medium text-foreground">
        Tu guía interactiva para cuidar y conocer mejor tus plantas.
    </p>
    <p className="mt-2 max-w-md text-lg text-muted-foreground">
        Recibe recordatorios, consejos personalizados y mantén tu jardín feliz y saludable.
    </p>
    <p className="mt-2 max-w-md text-lg text-muted-foreground">
        Registrate o inicia sesión para comenzar.
    </p>
</div>

</main>

            </div>
        </>
    );
}
