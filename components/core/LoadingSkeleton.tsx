import clsxm from 'lib/clsxm';

export const LoadingSkeleton = ({ className }: { className?: string }) => {
  return (
    <div
      className={clsxm('skeleton my-[0.5em] h-[1em] w-full rounded', className)}
    />
  );
};
