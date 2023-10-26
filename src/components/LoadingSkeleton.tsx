import { Empty, Skeleton } from "antd";
import React, { PropsWithChildren } from "react";

const LoadingSkeleton: React.FC<
  PropsWithChildren<{ loading?: boolean; isEmpty?: boolean }>
> = ({ children, loading = false, isEmpty }) => {
  if (!loading && !isEmpty) return <>{children}</>;
  return (
    <div className="grid grid-cols-1 w-full px-4">
      {isEmpty && <Empty />}
      {!isEmpty &&
        Array(4)
          .fill("")
          .map((_, index) => (
            <Skeleton active className="w-full h-40" key={index} />
          ))}
    </div>
  );
};

export default LoadingSkeleton;
