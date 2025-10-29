import { fetchInvoiceById, fetchCustomers } from '../../../../lib/data';
import Breadcrumbs from '../../../../ui/invoices/breadcrumbs';
import EditInvoiceForm from '../../../../ui/invoices/edit-form';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [invoice, customers] = await Promise.all([
    fetchInvoiceById(id),
    fetchCustomers(),
  ]);

  if (!invoice) {
    notFound();
  }

  return (
    <main className="p-6">
      <Breadcrumbs breadcrumbs={[
        { label: 'Invoices', href: '/dashboard/invoices' },
        { label: `Invoice ${id}`, href: `/dashboard/invoices/${id}` },
        { label: 'Edit Invoice', href: `/dashboard/invoices/${id}/edit`, active: true },
      ]} />
      <EditInvoiceForm invoice={invoice as any} customers={customers as any} />
    </main>
  );
}
