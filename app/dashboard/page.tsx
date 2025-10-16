import { Suspense } from 'react';
import { RevenueChart } from '../ui/dashboard/revenue-chart';
import { LatestInvoices } from '../ui/dashboard/latest-invoices';
import { CardSkeleton, LatestInvoicesSkeleton, RevenueChartSkeleton } from '../ui/skeletons';
import { Card } from '../ui/dashboard/cards';
import { fetchRevenue, fetchCardData, fetchLatestInvoices } from '../lib/data';

export default async function Page() {
  const revenue = await fetchRevenue();
  const cardData = await fetchCardData();
  const latestInvoices = await fetchLatestInvoices();

  return (
    <main>
      <h1 className="mb-4 text-xl md:text-2xl text-center font-bold text-gray-900 leading-tight">
        Juwara Solutions Dashboard
      </h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<CardSkeleton />}>
          <Card title="Collected" value={cardData.totalPaidInvoices} type="collected" />
        </Suspense>
        <Suspense fallback={<CardSkeleton />}>
          <Card title="Pending" value={cardData.totalPendingInvoices} type="pending" />
        </Suspense>
        <Suspense fallback={<CardSkeleton />}>
          <Card title="Total Invoices" value={cardData.numberOfInvoices} type="invoices" />
        </Suspense>
        <Suspense fallback={<CardSkeleton />}>
          <Card title="Total Customers" value={cardData.numberOfCustomers} type="customers" />
        </Suspense>
      </div>
      
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense fallback={<RevenueChartSkeleton />}>
          <RevenueChart revenue={revenue} />
        </Suspense>
        <Suspense fallback={<LatestInvoicesSkeleton />}>
          <LatestInvoices latestInvoices={latestInvoices} />
        </Suspense>
      </div>

    
    </main>

    
  );
}