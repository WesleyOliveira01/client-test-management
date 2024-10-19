import Loading from "@/app/loading";
import { Suspense } from "react";
import { twMerge } from "tailwind-merge";

const Container = ({children,className}:{children: React.ReactNode,className?: string}) => {
    return (
      <Suspense fallback={<Loading />}>
        <main className={twMerge("container p-2",className)}>{children}</main>
      </Suspense>
    );
}
 
export default Container;
