'use client';

import { useTheme } from '../contexts/theme-context';
import { SunIcon, MoonIcon, EyeIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 shadow-lg border-2 border-gray-300 flex items-center justify-center">
        <SunIcon className="h-5 w-5 text-gray-600" />
      </div>
    );
  }

  const getIcon = () => {
    switch (theme) {
      case 'light':
        return <SunIcon className="h-5 w-5 text-yellow-500" />;
      case 'dark':
        return <MoonIcon className="h-5 w-5 text-blue-400" />;
      case 'transparent':
        return <EyeIcon className="h-5 w-5 text-purple-500" />;
      default:
        return <SunIcon className="h-5 w-5 text-yellow-500" />;
    }
  };

  const getLabel = () => {
    switch (theme) {
      case 'light':
        return 'Light Mode';
      case 'dark':
        return 'Dark Mode';
      case 'transparent':
        return 'Transparent Mode';
      default:
        return 'Light Mode';
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="w-12 h-12 rounded-full bg-gradient-to-br from-white to-gray-50 hover:from-gray-50 hover:to-gray-100 dark:from-gray-800 dark:to-gray-700 dark:hover:from-gray-700 dark:hover:to-gray-600 shadow-lg border-2 border-gray-200 dark:border-gray-600 flex items-center justify-center transition-all duration-300 hover:shadow-xl hover:scale-110 active:scale-95 group"
      title={`Switch to ${getLabel()}`}
    >
      {getIcon()}
    </button>
  );
}
