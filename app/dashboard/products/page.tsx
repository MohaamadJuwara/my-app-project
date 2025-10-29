'use client';
import { Suspense } from 'react';
import { CardSkeleton } from '../../ui/skeletons';
import { Card } from '../../ui/dashboard/cards';
import { 
  CubeIcon, 
  PlusIcon, 
  MagnifyingGlassIcon,
  FunnelIcon 
} from '@heroicons/react/24/outline';

export default function ProductsPage() {
  return (
    <main>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl md:text-2xl font-bold">
          Products Management
        </h1>
        <button className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500">
          <PlusIcon className="h-4 w-4" />
          Add Product
        </button>
      </div>
      
      {/* Product Stats Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <Suspense fallback={<CardSkeleton />}>
          <Card 
            title="Total Products" 
            value="156" 
            type="invoices" 
          />
        </Suspense>
        <Suspense fallback={<CardSkeleton />}>
          <Card 
            title="Active Products" 
            value="142" 
            type="collected" 
          />
        </Suspense>
        <Suspense fallback={<CardSkeleton />}>
          <Card 
            title="Out of Stock" 
            value="14" 
            type="pending" 
          />
        </Suspense>
        <Suspense fallback={<CardSkeleton />}>
          <Card 
            title="Categories" 
            value="8" 
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
            placeholder="Search products..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
          <FunnelIcon className="h-4 w-4" />
          Filter
        </button>
      </div>

      {/* Products Table Placeholder */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <div className="flex items-center justify-center h-64 text-gray-500">
            <div className="text-center">
              <CubeIcon className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-medium mb-2">Products Coming Soon</h3>
              <p className="text-sm">Product management features are being developed.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
