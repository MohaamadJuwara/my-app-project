import { generateYAxis } from '../../lib/utils';
import { CalendarIcon } from '@heroicons/react/24/outline';
import { lusitana } from '../../ui/fonts';
import { fetchRevenue } from '../../lib/data';

export async function RevenueChart() {
  const revenue = await fetchRevenue();
  return (
    <div className="w-full md:col-span-4">
      <h2 className="mb-4 text-xl md:text-2xl">Recent Revenue</h2>
      <div className="rounded-xl bg-gray-50 p-4">
        <div className="sm:grid-cols-13 mt-0 grid grid-cols-12 items-end gap-2 rounded-md bg-white p-4 md:gap-4">
          {revenue.length > 0 ? (
            revenue.map((month) => (
              <div key={month.month} className="flex flex-col items-center gap-2">
                <div 
                  className="w-full bg-blue-500 rounded-t"
                  style={{ height: `${Math.max((month.revenue / 5000) * 100, 10)}px` }}
                />
                <p className="text-xs text-gray-500">{month.month}</p>
                <p className="text-xs font-medium">${month.revenue}</p>
              </div>
            ))
          ) : (
            <div className="flex h-80 w-full items-center justify-center text-gray-500">
              No revenue data available
            </div>
          )}
        </div>
      </div>
    </div>
  );
}