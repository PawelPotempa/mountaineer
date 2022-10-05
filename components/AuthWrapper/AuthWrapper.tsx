import { useSession } from "next-auth/react";
import { ChildrenProps } from "@/types/types";

const AuthWrapper = ({ children }: ChildrenProps) => {
  const session = useSession();

  if (session.status === "loading") return null;

  return <>{children}</>;
};

export default AuthWrapper;
