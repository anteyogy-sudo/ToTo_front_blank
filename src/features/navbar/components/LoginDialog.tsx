"use client";

import logotype from "@/assets/icons/logotype.svg";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { X } from "lucide-react";
import Image from "next/image";
import { LoginForm } from "./LoginForm";

interface Props {
  open: boolean;
  onClose: () => void;
}

const LoginDialog = ({ open, onClose }: Props) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="md:min-w-[640px] min-w-full p-0" showX={false}>
        <DialogHeader className=" hidden">
          <DialogTitle>Title</DialogTitle>
          <DialogDescription>Description</DialogDescription>
        </DialogHeader>
        <div className=" w-full flex flex-col items-center gap-6 md:px-20 md:py-[80px] px-4 py-[50px] relative">
          <button
            tabIndex={-1}
            onClick={onClose}
            className=" absolute top-10 right-10 z-10 text-primary-gray"
          >
            <X size={24} />
          </button>
          <div className=" w-full flex flex-col items-center gap-[60px]">
            <Image
              src={logotype}
              alt="logo"
              className=" md:w-[246px] w-[144px] select-none"
            />
            <LoginForm onClose={onClose} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginDialog;
