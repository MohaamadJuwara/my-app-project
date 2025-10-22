import { Suspense } from 'react';
import InvoicesTable from '../../ui/invoices/table';

export default function InvoicesTableWrapper({ 
  query, 
  currentPage 
}: { 
  query: string; 
  currentPage: number; 
}) {
  return (
    <Suspense fallback={<div>Loading table...</div>}>
      <InvoicesTable
        query={query} 
        currentPage={currentPage} 
        key={query + currentPage} />
    </Suspense>
  );
}   