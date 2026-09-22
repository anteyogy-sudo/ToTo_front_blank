"use client";

import { useUserStore } from "@/stores/useUserStore";
import { AccountProfileForm } from "./AccountProfileForm";
import { ProfileLoadingSkeleton } from "./ProfileLoadingSkeleton";

export const AccountProfile = () => {
  const { user, status } = useUserStore();

  if (status === "pending") return <ProfileLoadingSkeleton />;
  if (status === "error") return <p>Error</p>;

  if (!user) {
    return <ProfileLoadingSkeleton />;
  }

  return <AccountProfileForm user={user} />;
};
