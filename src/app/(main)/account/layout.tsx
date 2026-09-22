import { Container } from "src/components/Container";
import { AccountSidebar } from "src/features/account/components/AccountSidebar";
import { ReactNode } from "react";

export default function AccountLayout({ children }: { children: ReactNode }) {
  return (
    <Container className=" 1144:py-6 pr-6">
      <div className=" w-full flex lg:flex-row flex-col gap-6">
        <AccountSidebar />
        {children}
      </div>
    </Container>
  );
}
