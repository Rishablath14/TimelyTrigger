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
import { UserButton, useAuth } from "@clerk/nextjs";
import { ModeToggle } from "../sub/modeToggler";

export default function SideNavbar() {
  const {userId} = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mobileWidth, setMobileWidth] = useState(false);
  const [vis, setVis] = useState(false);
  const onlyWidth = useWindowWidth();
  useEffect(()=>{
    if(userId){
      const getData= async()=>{
        const res = await fetch('/api/users');
        const data = await res.json();
        if(data.publicMetadata.univerId!=="none" && data.publicMetadata.timing) setVis(true);
        else setVis(false);
        }
        getData();
        
      }
      if(onlyWidth < 768) setMobileWidth(true);
  },[userId])

  function toggleSidebar() {
    setIsCollapsed(!isCollapsed);
  }

  if(!vis){
    return <></>;
  }

  return (
    <div className="z-[2] relative min-w-[10vw] max-w-[13vw] md:min-w-[20vw] md:max-w-[20vw] border-r px-3  pb-10 pt-24 dark:bg-gray-900">
      {!mobileWidth ? (
        <div className="absolute right-[-20px] top-7">
          <Button
            onClick={toggleSidebar}
            variant="secondary"
            className=" rounded-full p-2"
            >
            <ChevronRight />
          </Button>
        </div>
      ) :
      (
        <div className="flex flex-col justify-center items-center gap-4 mb-4">
        <UserButton/>
        <ModeToggle/>
        </div>
      )
    }
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
            title: "Academics",
            href: "/academics",
            icon: BookCopy,
            variant: "ghost"
          },
          {
            title: "Teachers",
            href: "/teachers",
            icon: Contact,
            variant: "ghost"
          },
          {
            title: "Classrooms",
            href: "/classrooms",
            icon: CassetteTape,
            variant: "ghost"
          },
          {
            title: "Timetables",
            href: "/timetables",
            icon: AlarmClock,
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