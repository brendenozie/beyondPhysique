import React, { PropsWithChildren, useState } from "react";
import Navbar from "./AdminNavbar";
import Sidebar from "./sidebar";
import UserNavbar1 from "./UserNavbar1";
import UserSidebar1 from "./UserSidebar1";

const UserLayout1 = (props: PropsWithChildren) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="grid min-h-screen grid-rows-header bg-zinc-100">
      <div>
        <UserNavbar1 onMenuButtonClick={() => setSidebarOpen((prev) => !prev)} />
      </div>

      <div className="grid md:grid-cols-sidebar">
        <UserSidebar1 open={sidebarOpen} setOpen={setSidebarOpen} />
        {props.children}
      </div>
    </div>
  );
};

export default UserLayout1;
