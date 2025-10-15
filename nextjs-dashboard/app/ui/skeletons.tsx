export function CardSkeleton() {
  return (
    <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
      <div className="flex p-4">
        <div className="h-5 w-5 text-gray-200" />
        <div className="ml-2 h-6 w-16 rounded-md bg-gray-200" />
      </div>
      <div className="flex items-center justify-center truncate rounded-xl bg-white px-4 py-8">
        <div className="h-7 w-20 rounded-md bg-gray-200" />
      </div>
    </div>
  );
}

export function LatestInvoicesSkeleton() {
  return (
    <div className="flex w-full flex-col md:col-span-4">
      <div className="mb-4 h-8 w-32 rounded-md bg-gray-200" />
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
        <div className="bg-white px-6">
          <div className="flex flex-row items-center justify-between py-4">
            <div className="flex items-center">
              <div className="h-4 w-32 rounded-md bg-gray-200" />
            </div>
            <div className="h-4 w-16 rounded-md bg-gray-200" />
          </div>
        </div>
        <div className="flex items-center pb-2 pt-6">
          <div className="h-4 w-24 rounded-md bg-gray-200" />
        </div>
      </div>
    </div>
  );
}

export function RevenueChartSkeleton() {
  return (
    <div className="w-full md:col-span-4">
      <div className="mb-4 h-8 w-32 rounded-md bg-gray-200" />
      <div className="rounded-xl bg-gray-50 p-4">
        <div className="mt-0 grid h-80 grid-cols-12 items-end gap-2 rounded-md bg-white p-4 md:gap-4">
          <div className="h-32 rounded-md bg-gray-200" />
          <div className="h-40 rounded-md bg-gray-200" />
          <div className="h-24 rounded-md bg-gray-200" />
          <div className="h-48 rounded-md bg-gray-200" />
          <div className="h-36 rounded-md bg-gray-200" />
          <div className="h-28 rounded-md bg-gray-200" />
          <div className="h-44 rounded-md bg-gray-200" />
          <div className="h-32 rounded-md bg-gray-200" />
          <div className="h-20 rounded-md bg-gray-200" />
          <div className="h-36 rounded-md bg-gray-200" />
          <div className="h-24 rounded-md bg-gray-200" />
          <div className="h-40 rounded-md bg-gray-200" />
        </div>
      </div>
    </div>
  );
}