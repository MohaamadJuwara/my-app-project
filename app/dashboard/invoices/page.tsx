'use client';
import { Suspense } from 'react';
import { CardSkeleton } from '../../ui/skeletons';
import { Card } from '../../ui/dashboard/cards';
import pagination from '../../ui/invoices/pagination';
import {lusitana} from '../../ui/fonts';
import Search from '../../ui/search';
import Table from '../../ui/invoices/table';
import { CreateInvoice } from '../../ui/invoices/buttons';
import InvoicesTableWrapper from './invoices-table';
import { 
  DocumentTextIcon, 
  PlusIcon, 
  MagnifyingGlassIcon,
  FunnelIcon 
} from '@heroicons/react/24/outline';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function InvoicesPage() {
  const pathname = usePathname();
  const { replace } = useRouter();  
  const searchParams = useSearchParams();
  const query = searchParams.get('query') || '';
  const currentPage = parseInt(searchParams.get('page') || '1');
  function handleSearch(term: string) {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }
  return (
    <main>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl md:text-2xl font-bold">
          Invoices Management
        </h1>
        <button className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500">
          <PlusIcon className="h-4 w-4" />
          Create Invoice
        </button>
      </div>
      
      {/* Invoice Stats Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <Suspense key={query + currentPage} fallback={<CardSkeleton />}>
       
          <Card 
            title="Total Invoices" 
            value="1,456" 
            type="invoices" 
          />
        </Suspense>
        <Suspense  fallback={<CardSkeleton />}>
     
          <Card 
            title="Paid Invoices" 
            value="1,234" 
            type="collected" 
          />
        </Suspense>
        <Suspense  fallback={<CardSkeleton />}>
     
          <Card 
            title="Pending Invoices" 
            value="222" 
            type="pending" 
          />
        </Suspense>
        <Suspense  fallback={<CardSkeleton />}>
    
          <Card 
            title="Total Revenue" 
            value="$89,456" 
            type="customers" 
          />
        </Suspense>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search invoices..."
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
          <FunnelIcon className="h-4 w-4" />
          Filter
        </button>
      </div>

     {/* Recent Invoices Table */}
<Suspense key={query + currentPage} fallback={<div>Loading table...</div>}>
  <InvoicesTableWrapper 
    query={query}
    currentPage={currentPage}
  />
</Suspense>
    </main>
  );
}
