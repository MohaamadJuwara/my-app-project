import Form from '../../../ui/invoices/create-form';
import { fetchCustomers } from '../../../lib/data';
import Breadcrumbs from '../../../ui/invoices/breadcrumbs';

export const dynamic = 'force-dynamic';
    
export default async function Page() {
  const customers = await fetchCustomers();
  
  return (
    <main className="p-6">
        <Breadcrumbs breadcrumbs={[
            { label: 'Invoices', href: '/dashboard/invoices' },
            { label: 'Create Invoice',
             href: '/dashboard/invoices/create',
              active: true, 
            },
          ]} 
          />
      <Form customers={customers as any} />
      
    </main>
  );
}