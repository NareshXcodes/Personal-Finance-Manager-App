interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = '' }: SkeletonProps) {
  return <div className={`skeleton-pulse rounded-lg bg-dark-panel/10 ${className}`} />;
}

export function TableRowSkeleton() {
  return (
    <tr>
      <td className="px-5 py-4"><Skeleton className="h-4 w-32" /></td>
      <td className="px-5 py-4"><Skeleton className="h-4 w-20" /></td>
      <td className="px-5 py-4"><Skeleton className="h-6 w-20 rounded-full" /></td>
      <td className="px-5 py-4"><Skeleton className="h-4 w-16" /></td>
      <td className="px-5 py-4"><Skeleton className="h-8 w-20" /></td>
    </tr>
  );
}

export function CardSkeleton() {
  return (
    <div className="rounded-2xl border border-warm-border bg-white p-5">
      <Skeleton className="h-4 w-24 mb-3" />
      <Skeleton className="h-8 w-32 mb-4" />
      <Skeleton className="h-2 w-full rounded-full mb-2" />
      <Skeleton className="h-3 w-16" />
    </div>
  );
}
