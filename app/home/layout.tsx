import Header from "@/components/ui/Header";
import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
    return ( 
        <>
            <Header />
            {children}
        </>
     );
}
 
export default layout;
