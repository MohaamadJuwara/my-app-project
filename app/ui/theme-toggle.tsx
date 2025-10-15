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
      <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100">
        <SunIcon className="h-5 w-5" />
        <span className="hidden sm:inline text-sm font-medium">Loading...</span>
      </div>
    );
  }

  const getIcon = () => {
    switch (theme) {
      case 'light':
        return <SunIcon className="h-5 w-5" />;
      case 'dark':
        return <MoonIcon className="h-5 w-5" />;
      case 'transparent':
        return <EyeIcon className="h-5 w-5" />;
      default:
        return <SunIcon className="h-5 w-5" />;
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
      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
      title={`Switch to ${getLabel()}`}
    >
      {getIcon()}
      <span className="hidden sm:inline text-sm font-medium">
        {getLabel()}
      </span>
    </button>
  );
}
