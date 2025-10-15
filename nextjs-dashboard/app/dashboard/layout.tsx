import { Suspense } from 'react';
import { NavLinks } from '../ui/dashboard/nav-links';
import AcmeLogo from '../ui/acme-logo';
import { PowerIcon } from '@heroicons/react/24/outline';
import '../ui/global.css';
import { inter } from '../ui/fonts';

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <div className="flex h-full flex-col px-3 py-4 md:px-2">
          <div className="flex h-20 items-end rounded-lg bg-blue-600 p-4 md:h-40">
            <AcmeLogo />
          </div>
          <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
            <NavLinks />
            <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
            <form>
              <button className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
                <PowerIcon className="w-6" />
                <div className="hidden md:block">Sign Out</div>
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
        <Suspense fallback={<div>Loading...</div>}>
          {children}
        </Suspense>
      </div>
    </div>
  );
}
