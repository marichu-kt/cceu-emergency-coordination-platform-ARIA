import React from 'react';

interface SkeletonProps {
  type: 'line' | 'card';
  width?: string;
  height?: string;
  count?: number;
}

export function Skeleton({ type, width = '100%', height, count = 1 }: SkeletonProps) {
  const lineHeight = height || '16px';
  const cardHeight = height || '120px';

  if (type === 'line') {
    return (
      <>
        {Array.from({ length: count }).map((_, index) => (
          <div
            key={index}
            className="bg-[var(--border)] animate-pulse rounded"
            style={{ width, height: lineHeight, marginBottom: index < count - 1 ? '12px' : '0' }}
          />
        ))}
      </>
    );
  }

  if (type === 'card') {
    return (
      <>
        {Array.from({ length: count }).map((_, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-[12px]"
            style={{ boxShadow: 'var(--shadow-card)', marginBottom: index < count - 1 ? '16px' : '0' }}
          >
            <div className="flex gap-3 mb-4">
              <div className="w-12 h-12 bg-[var(--border)] animate-pulse rounded-[8px]" />
              <div className="flex-1 space-y-2">
                <div className="h-5 bg-[var(--border)] animate-pulse rounded w-3/4" />
                <div className="h-4 bg-[var(--border)] animate-pulse rounded w-1/2" />
              </div>
            </div>
            <div className="flex gap-2">
              <div className="h-8 bg-[var(--border)] animate-pulse rounded-[8px] w-24" />
              <div className="h-8 bg-[var(--border)] animate-pulse rounded-[8px] w-20" />
            </div>
          </div>
        ))}
      </>
    );
  }

  return null;
}
