"use client";

import { useEffect, useState } from "react";
import { Nav } from "@/components/ui/nav";
import {
  ChevronRight,
  LayoutDashboard,
  AlarmClock,
  Settings,
  Contact,
  BookCopy,
  LocateFixed,
  CassetteTape

} from "lucide-react";
import { Button } from "@/components/ui/button";

import { useWindowWidth } from "@react-hook/window-size";

export default function SideNavbar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mobileWidth, setMobileWidth] = useState(false);
  const onlyWidth = useWindowWidth();
  useEffect(()=>{
    if(onlyWidth < 768) setMobileWidth(true);
  },[])

  function toggleSidebar() {
    setIsCollapsed(!isCollapsed);
  }

  return (
    <div className="z-[2] relative min-w-[80px] border-r px-3  pb-10 pt-24 dark:bg-gray-900">
      {!mobileWidth && (
        <div className="absolute right-[-20px] top-7">
          <Button
            onClick={toggleSidebar}
            variant="secondary"
            className=" rounded-full p-2"
          >
            <ChevronRight />
          </Button>
        </div>
      )}
      <Nav
        isCollapsed={mobileWidth ? true : isCollapsed}
        links={[
          {
            title: "Dashboard",
            href: "/dashboard",
            icon: LayoutDashboard,
            variant: "ghost"
          },
          {
            title: "Timetables",
            href: "/timetables",
            icon: AlarmClock,
            variant: "ghost"
          },
          {
            title: "Teachers",
            href: "/teachers",
            icon: Contact,
            variant: "ghost"
          },
          {
            title: "Academics",
            href: "/academics",
            icon: BookCopy,
            variant: "ghost"
          },
          {
            title: "Classrooms",
            href: "/classrooms",
            icon: CassetteTape,
            variant: "ghost"
          },
          {
            title: "Livetracking",
            href: "/livetracking",
            icon: LocateFixed,
            variant: "ghost"
          },
          {
            title: "Settings",
            href: "/settings",
            icon: Settings,
            variant: "ghost"
          }
        ]}
      />
    </div>
  );
}