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
      <div className="flex items-center gap-3 px-6 py-3 rounded-xl bg-gradient-to-r from-gray-100 to-gray-200 shadow-md border border-gray-300">
        <SunIcon className="h-6 w-6 text-gray-600" />
        <span className="text-sm font-semibold text-gray-700">Loading...</span>
      </div>
    );
  }

  const getIcon = () => {
    switch (theme) {
      case 'light':
        return <SunIcon className="h-6 w-6 text-yellow-500" />;
      case 'dark':
        return <MoonIcon className="h-6 w-6 text-blue-400" />;
      case 'transparent':
        return <EyeIcon className="h-6 w-6 text-purple-500" />;
      default:
        return <SunIcon className="h-6 w-6 text-yellow-500" />;
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
      className="flex items-center gap-3 px-6 py-3 rounded-xl bg-gradient-to-r from-white to-gray-50 hover:from-gray-50 hover:to-gray-100 dark:from-gray-800 dark:to-gray-700 dark:hover:from-gray-700 dark:hover:to-gray-600 shadow-lg border border-gray-200 dark:border-gray-600 transition-all duration-300 hover:shadow-xl hover:scale-105 active:scale-95"
      title={`Switch to ${getLabel()}`}
    >
      {getIcon()}
      <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
        {getLabel()}
      </span>
    </button>
  );
}
