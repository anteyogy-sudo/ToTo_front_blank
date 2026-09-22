import {QueryClientWrapper} from "@/wrappers/QueryClientWrapper";
import {ReactNode} from "react";

export default function MaintenanceLayout({children,}: {
    children: ReactNode;
}) {
    return (
        <QueryClientWrapper>{children}</QueryClientWrapper>
    );
}