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
<main className="min-w-[87vw] max-w-[90vw] md:min-w-[80vw] md:max-w-[80vw]  w-screen min-h-screen flex flex-col dark:text-white text-black mt-0 md:mt-8">
        {children}
</main>
    </div>
  );
}
