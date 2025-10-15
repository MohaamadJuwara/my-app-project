import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/outline';

interface CardProps {
  title: string;
  value: string | number;
  type: 'invoices' | 'customers' | 'pending' | 'collected';
}

const iconMap = {
  collected: ArrowUpIcon,
  pending: ArrowUpIcon,
  invoices: ArrowUpIcon,
  customers: ArrowUpIcon,
};

export function Card({ title, value, type }: CardProps) {
  const Icon = iconMap[type];

  return (
    <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
      <div className="flex p-4">
        {Icon ? <Icon className="h-5 w-5 text-gray-600" /> : null}
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>
      <p className="truncate rounded-xl bg-white px-4 py-8 text-center text-2xl">
        {value}
      </p>
    </div>
  );
}