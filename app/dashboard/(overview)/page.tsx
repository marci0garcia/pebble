import { Card } from '@/app/ui/dashboard/cards';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import { audiowide, lusitana } from '@/app/ui/fonts';
import { fetchCardData} from '@/app/lib/data';
import { Suspense } from 'react';
import { LatestInvoicesSkeleton, CardsSkeleton} from '@/app/ui/skeletons';
import CardWrapper from '@/app/ui/dashboard/cards';
import { Audiowide } from 'next/font/google';


export default async function Page() {
  
  const {
    numberOfTasks,
    numberOfMembers,
    todoTasks,
    inProgressTasks,
    completedTasks,
    cancelledTasks,
  } = await fetchCardData();
  return (
    <main>
      <h1 className={`${audiowide.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<CardsSkeleton />}>
          <CardWrapper />
        </Suspense>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense fallback={<LatestInvoicesSkeleton />}>
          <LatestInvoices />
        </Suspense>
      </div>
    </main>
  );
}