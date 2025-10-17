import { CardSkeleton, RevenueChartSkeleton, LatestInvoicesSkeleton } from '../../ui/skeletons';

export default function Loading() {
  return (
    <main>
      <div className="mb-4 h-8 w-48 rounded-md bg-gray-200 animate-pulse" />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <RevenueChartSkeleton />
        <LatestInvoicesSkeleton />
      </div>
    </main>
  );
}
