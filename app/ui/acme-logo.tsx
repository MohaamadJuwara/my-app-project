import { GlobeAltIcon } from '@heroicons/react/24/outline';
import { lusitana } from './fonts';
import Image from 'next/image';

export default function AcmeLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
    >
      <Image 
        src="/juwaralogo.png" 
        alt="Juwara Solutions Logo" 
        width={100} 
        height={100}
        className="rounded-full"
        style={{ width: 'auto', height: 'auto' }}
        loading="eager"
        priority
      />
  
    </div>
  );
}
