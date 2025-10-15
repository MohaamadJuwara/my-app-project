import { Suspense } from 'react';
import { CardSkeleton } from '../../ui/skeletons';
import { Card } from '../../ui/dashboard/cards';
import { 
  DocumentTextIcon, 
  PlusIcon, 
  MagnifyingGlassIcon,
  FunnelIcon 
} from '@heroicons/react/24/outline';

export default function InvoicesPage() {
  return (
    <main>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl md:text-2xl font-bold">
          Invoices Management
        </h1>
        <button className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500">
          <PlusIcon className="h-4 w-4" />
          Create Invoice
        </button>
      </div>
      
      {/* Invoice Stats Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <Suspense fallback={<CardSkeleton />}>
          <Card 
            title="Total Invoices" 
            value="1,456" 
            type="invoices" 
          />
        </Suspense>
        <Suspense fallback={<CardSkeleton />}>
          <Card 
            title="Paid Invoices" 
            value="1,234" 
            type="collected" 
          />
        </Suspense>
        <Suspense fallback={<CardSkeleton />}>
          <Card 
            title="Pending Invoices" 
            value="222" 
            type="pending" 
          />
        </Suspense>
        <Suspense fallback={<CardSkeleton />}>
          <Card 
            title="Total Revenue" 
            value="$89,456" 
            type="customers" 
          />
        </Suspense>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search invoices..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
          <FunnelIcon className="h-4 w-4" />
          Filter
        </button>
      </div>

      {/* Recent Invoices Table */}
      <div className="rounded-xl bg-gray-50 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Recent Invoices</h2>
          <span className="text-sm text-gray-600">Showing 10 of 1,456 invoices</span>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left p-3">Invoice #</th>
                <th className="text-left p-3">Customer</th>
                <th className="text-left p-3">Amount</th>
                <th className="text-left p-3">Status</th>
                <th className="text-left p-3">Date</th>
                <th className="text-left p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b hover:bg-gray-50">
                <td className="p-3 font-medium">INV-001</td>
                <td className="p-3">John Doe</td>
                <td className="p-3">$1,234.56</td>
                <td className="p-3">
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                    Paid
                  </span>
                </td>
                <td className="p-3">2024-01-15</td>
                <td className="p-3">
                  <button className="text-blue-600 hover:text-blue-800 text-xs">View</button>
                </td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="p-3 font-medium">INV-002</td>
                <td className="p-3">Jane Smith</td>
                <td className="p-3">$2,345.67</td>
                <td className="p-3">
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">
                    Pending
                  </span>
                </td>
                <td className="p-3">2024-01-14</td>
                <td className="p-3">
                  <button className="text-blue-600 hover:text-blue-800 text-xs">View</button>
                </td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="p-3 font-medium">INV-003</td>
                <td className="p-3">Bob Johnson</td>
                <td className="p-3">$567.89</td>
                <td className="p-3">
                  <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">
                    Overdue
                  </span>
                </td>
                <td className="p-3">2024-01-10</td>
                <td className="p-3">
                  <button className="text-blue-600 hover:text-blue-800 text-xs">View</button>
                </td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="p-3 font-medium">INV-004</td>
                <td className="p-3">Alice Brown</td>
                <td className="p-3">$3,456.78</td>
                <td className="p-3">
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                    Paid
                  </span>
                </td>
                <td className="p-3">2024-01-12</td>
                <td className="p-3">
                  <button className="text-blue-600 hover:text-blue-800 text-xs">View</button>
                </td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="p-3 font-medium">INV-005</td>
                <td className="p-3">Charlie Wilson</td>
                <td className="p-3">$1,789.23</td>
                <td className="p-3">
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">
                    Pending
                  </span>
                </td>
                <td className="p-3">2024-01-13</td>
                <td className="p-3">
                  <button className="text-blue-600 hover:text-blue-800 text-xs">View</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="flex items-center justify-between mt-6">
          <div className="text-sm text-gray-600">
            Showing 1 to 5 of 1,456 results
          </div>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">
              Previous
            </button>
            <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm">
              1
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">
              2
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">
              3
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">
              Next
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
