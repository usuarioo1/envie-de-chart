import { redirect } from "next/navigation";
import { getCurrentAdmin } from "@/lib/serverAuth";

export const metadata = {
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default async function RegisterLayout({ children }) {
  const user = await getCurrentAdmin();
  if (!user) redirect("/login");

  return children;
}
