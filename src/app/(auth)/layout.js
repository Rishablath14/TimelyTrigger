import SideNavbar from "@/components/main/SideNavbar";
import UpperNav from "@/components/main/UpperNav";
export const metadata = {
  title: "Dashboard - Timely Trigger",
  description: "Timely Trigger",
};

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen w-full bg-white dark:bg-gray-900 dark:text-white text-black flex">
      <SideNavbar/>
      <UpperNav/>
<main className="w-screen min-h-screen flex flex-col dark:text-white text-black">
        {children}
</main>
    </div>
  );
}
