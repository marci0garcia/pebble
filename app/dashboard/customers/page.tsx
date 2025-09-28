import { fetchFilteredMembers } from '@/app/lib/data';
import Search from '@/app/ui/search';
import { audiowide } from '@/app/ui/fonts';
import { Suspense } from 'react';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import MembersTable from '@/app/ui/customers/table';

export default async function Page(
  props: {
    searchParams?: Promise<{
      query?: string;
    }>;
  }
) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
 
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${audiowide.className} text-2xl`}>Team Members</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search members..." />
      </div>
      <Suspense key={query} fallback={<InvoicesTableSkeleton />}>
        <MembersTable query={query} />
      </Suspense>
    </div>
  );
}