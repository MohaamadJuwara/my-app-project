import { Suspense } from 'react';
import { RevenueChart } from '../ui/dashboard/revenue-chart';
import { LatestInvoices } from '../ui/dashboard/latest-invoices';
import { CardSkeleton, LatestInvoicesSkeleton, RevenueChartSkeleton } from '../ui/skeletons';
import { Card } from '../ui/dashboard/cards';
import AcmeLogo from '../ui/acme-logo';


export default async function Page() {
  return (
    <main>
        <h1 className="mb-4 text-xl md:text-2xl text-center font-bold text-gray-900 leading-tight">
        Juwara Solutions Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<CardSkeleton />}>
          <Card title="Collected" value="Total collected" type="collected" />
        </Suspense>
        <Suspense fallback={<CardSkeleton />}>
          <Card title="Pending" value="Total pending" type="pending" />
        </Suspense>
        <Suspense fallback={<CardSkeleton />}>
          <Card title="Total Invoices" value="Total invoices" type="invoices" />
        </Suspense>
        <Suspense fallback={<CardSkeleton />}>
          <Card title="Total Customers" value="Total customers" type="customers" />
        </Suspense>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense fallback={<RevenueChartSkeleton />}>
          <RevenueChart />
        </Suspense>
        <Suspense fallback={<LatestInvoicesSkeleton />}>
          <LatestInvoices />
        </Suspense>
      </div>
    </main>
  );
}
