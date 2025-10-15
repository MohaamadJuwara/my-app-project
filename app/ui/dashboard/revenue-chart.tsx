export function RevenueChart() {
  return (
    <div className="w-full md:col-span-4">
      <h2 className="mb-4 text-xl md:text-2xl">Recent Revenue</h2>
      <div className="rounded-xl bg-gray-50 p-4">
        <div className="sm:grid-cols-13 mt-0 grid grid-cols-12 items-end gap-2 rounded-md bg-white p-4 md:gap-4">
          {/* Chart placeholder */}
          <div className="flex h-80 w-full items-center justify-center text-gray-500">
            Revenue Chart Placeholder
          </div>
        </div>
      </div>
    </div>
  );
}