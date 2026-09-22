import { ToasterSonner } from "@/components/ui/sonner";
import Footer from "@/components/Footer";
import { Navbar } from "@/features/navbar/components/Navbar";
import { UserInitializer } from "@/layouts/UserInitializer";
import "./../globals.css";
import AllowCookies from "@/components/AllowCookies";
import {Toaster} from "react-hot-toast";
import {ReactNode} from "react";

export default function RootLayout({ children, }: Readonly<{ children: ReactNode; }>) {
    return (
        <UserInitializer>
            <Navbar />
            <AllowCookies/>
            {children}
            <Footer />
            <ToasterSonner position="bottom-right" richColors theme="light" />
            <Toaster
                position="top-center"
                containerStyle={{
                    top: "25%",
                    left: 0,
                    right: 0,
                    bottom: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            />
        </UserInitializer>
    );
}
