import Image from 'next/image';

interface LatestInvoicesProps {
  latestInvoices: {
    id: number;
    amount: string;
    name: string;
    email: string;
    image_url: string;
  }[];
}

export function LatestInvoices({ latestInvoices }: LatestInvoicesProps) {
  return (
    <div className="flex w-full flex-col md:col-span-4">
      <h2 className="mb-4 text-xl md:text-2xl">Latest Invoices</h2>
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
        {latestInvoices.map((invoice) => (
          <div key={invoice.id} className="bg-white px-6">
            <div className="flex flex-row items-center justify-between py-4">
              <div className="flex items-center">
                <Image
                  src={invoice.image_url}
                  alt={`${invoice.name}'s profile picture`}
                  className="mr-4 rounded-full"
                  width={32}
                  height={32}
                />
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold md:text-base">
                    Invoice #{invoice.id}
                  </p>
                  <p className="hidden text-sm text-gray-500 sm:block">
                    {invoice.name}
                  </p>
                </div>
              </div>
              <p className="truncate text-sm font-medium md:text-base">
                {invoice.amount}
              </p>
            </div>
          </div>
        ))}
        <div className="flex items-center pb-2 pt-6">
          <p className="text-sm text-gray-500">Last {latestInvoices.length} invoices</p>
        </div>
      </div>
    </div>
  );
}