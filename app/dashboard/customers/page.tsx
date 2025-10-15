import { Suspense } from 'react';
import { CardSkeleton } from '../../ui/skeletons';
import { Card } from '../../ui/dashboard/cards';
import { UserGroupIcon, UserPlusIcon, UserMinusIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';

export default function CustomersPage() {
  return (
    <main>
      <h1 className="mb-4 text-xl md:text-2xl text-center font-bold">
        Customers Management
      </h1>
      
      {/* Customer Stats Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <Suspense fallback={<CardSkeleton />}>
          <Card 
            title="Total Customers" 
            value="1,234" 
            type="customers" 
          />
        </Suspense>
        <Suspense fallback={<CardSkeleton />}>
          <Card 
            title="New This Month" 
            value="89" 
            type="collected" 
          />
        </Suspense>
        <Suspense fallback={<CardSkeleton />}>
          <Card 
            title="Active Customers" 
            value="1,156" 
            type="pending" 
          />
        </Suspense>
        <Suspense fallback={<CardSkeleton />}>
          <Card 
            title="Customer Value" 
            value="$45,678" 
            type="invoices" 
          />
        </Suspense>
      </div>

      {/* Customer Actions */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-8">
        <div className="rounded-xl bg-gray-50 p-6 shadow-sm">
          <div className="flex items-center">
            <UserPlusIcon className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <h3 className="text-lg font-semibold">Add New Customer</h3>
              <p className="text-sm text-gray-600">Register a new customer</p>
            </div>
          </div>
        </div>
        
        <div className="rounded-xl bg-gray-50 p-6 shadow-sm">
          <div className="flex items-center">
            <UserGroupIcon className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <h3 className="text-lg font-semibold">View All Customers</h3>
              <p className="text-sm text-gray-600">Browse customer database</p>
            </div>
          </div>
        </div>
        
        <div className="rounded-xl bg-gray-50 p-6 shadow-sm">
          <div className="flex items-center">
            <CurrencyDollarIcon className="h-8 w-8 text-yellow-600" />
            <div className="ml-4">
              <h3 className="text-lg font-semibold">Customer Analytics</h3>
              <p className="text-sm text-gray-600">View customer insights</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Customers Table */}
      <div className="rounded-xl bg-gray-50 p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold">Recent Customers</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Name</th>
                <th className="text-left p-2">Email</th>
                <th className="text-left p-2">Status</th>
                <th className="text-left p-2">Total Spent</th>
                <th className="text-left p-2">Last Order</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-2">John Doe</td>
                <td className="p-2">john@example.com</td>
                <td className="p-2">
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                    Active
                  </span>
                </td>
                <td className="p-2">$1,234.56</td>
                <td className="p-2">2024-01-15</td>
              </tr>
              <tr className="border-b">
                <td className="p-2">Jane Smith</td>
                <td className="p-2">jane@example.com</td>
                <td className="p-2">
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                    Active
                  </span>
                </td>
                <td className="p-2">$2,345.67</td>
                <td className="p-2">2024-01-14</td>
              </tr>
              <tr className="border-b">
                <td className="p-2">Bob Johnson</td>
                <td className="p-2">bob@example.com</td>
                <td className="p-2">
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">
                    Inactive
                  </span>
                </td>
                <td className="p-2">$567.89</td>
                <td className="p-2">2023-12-20</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
