import React from "react";
import { cn } from "../utils/cn";

const NavLink = ({
  curPage,
  link,
  children,
}: {
  curPage: string;
  link: string;
  children: React.ReactNode;
}) => {
  console.log("cirpage", curPage, "link", link);
  return (
    <a
      href={link}
      className={cn(
        { ["rounded-full bg-slate-600"]: curPage === link },
        "rounded px-2 py-1 shadow-lg hover:bg-gray-700",
      )}
    >
      {children}
    </a>
  );
};

export default NavLink;
