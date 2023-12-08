import { redirect } from "next/navigation";
import { getAuthSession } from "../api/auth/[...nextauth]/route";

export default async function AuthLayout({ children }) {
  const session = await getAuthSession();
  if (session && session.user) redirect("/");

  return <div>{children}</div>;
}
