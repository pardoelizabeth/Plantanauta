import AppLogoIcon from './app-logo-icon';
import { Leaf } from 'lucide-react';

export default function AppLogo() {
  return (
    <div className="flex h-20 w-full items-center justify-center gap-3"> {/* altura mayor, centrado total */}
      <img
        src="https://i.imgur.com/JxtXSzz.png"
        alt="Logo Plantanauta"
        className="h-12"
      />
      <span className="text-lg font-semibold text-green-900">Plantanauta</span>
    </div>
  );
}
