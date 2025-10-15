export function LatestInvoices() {
  return (
    <div className="flex w-full flex-col md:col-span-4">
      <h2 className="mb-4 text-xl md:text-2xl">Latest Invoices</h2>
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
        <div className="bg-white px-6">
          <div className="flex flex-row items-center justify-between py-4">
            <div className="flex items-center">
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold md:text-base">
                  Invoice #INV-001
                </p>
                <p className="hidden text-sm text-gray-500 sm:block">
                  Customer Name
                </p>
              </div>
            </div>
            <p className="truncate text-sm font-medium md:text-base">
              $199.00
            </p>
          </div>
        </div>
        <div className="flex items-center pb-2 pt-6">
          <p className="text-sm text-gray-500">Last 5 invoices</p>
        </div>
      </div>
    </div>
  );
}