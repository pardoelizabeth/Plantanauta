// resources/js/components/AppSidebar.tsx

import { usePage } from '@inertiajs/react';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import type { NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import {
  BookOpen,
  Folder,
  LayoutGrid,
  Leaf,
  Calendar,
  ClipboardList,
  FileText,
  Users,
  Sprout,
  House,
} from 'lucide-react';
import AppLogo from './app-logo';

interface PageProps {
  auth: {
    user: {
      role: 'admin' | 'usuario';
    }
  }
}

const mainNavItems: (NavItem & { allowedRoles?: ('admin' | 'usuario')[] })[] = [
  {
    title: 'Inicio',
    href: '/dashboard',
    icon: House,
  },
  {
    title: 'Agregar Flores y Plantas',
    href: '/agregarplantas',
    icon: Sprout,
    allowedRoles: ['admin'],      // solo admin
  },
  {
    title: 'Agregar Tareas de Cuidado',
    href: '/agregartareasdecuidado',
    icon: ClipboardList,
    allowedRoles: ['admin'],      // solo admin
  },
  {
    title: 'Administrar Usuarios',
    href: '/usuarios',
    icon: Users,
    allowedRoles: ['admin'],      // solo admin
  },
  {
    title: 'Flores y Plantas',
    href: '/plantas',
    icon: Sprout,
  },
  {
    title: 'Tareas de Cuidado',
    href: '/tareascuidado',
    icon: ClipboardList,
  },
  {
    title: 'Mis Plantas',
    href: '/mis-plantas',
    icon: Leaf,
  },
];

const footerNavItems: NavItem[] = [
  {
    title: 'Repository',
    href: 'https://github.com/laravel/react-starter-kit',
    icon: Folder,
  },
  {
    title: 'Documentation',
    href: 'https://laravel.com/docs/starter-kits#react',
    icon: BookOpen,
  },
];

export function AppSidebar() {
  const { auth } = usePage().props as any;
const role = auth.user.role;


  // Filtrar: si el item no tiene allowedRoles, se muestra a todos; 
  // si tiene, solo si role está incluido.
  const items = mainNavItems.filter(item =>
    !item.allowedRoles || item.allowedRoles.includes(role)
  );

  return (
    <Sidebar collapsible="icon" variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/dashboard" prefetch>
                <AppLogo />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={items} />
      </SidebarContent>

      <SidebarFooter>
{/*         <NavFooter items={footerNavItems} className="mt-auto" /> */}
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
