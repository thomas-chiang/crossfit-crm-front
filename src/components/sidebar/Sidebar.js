import React from "react";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarContent,
  SidebarFooter
} from "react-pro-sidebar";

export default function Aside({setSection}) {
 /*  const headerStyle = {
    padding: "24px",
    textTransform: "uppercase",
    fontWeight: "bold",
    letterSpacing: "1px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "noWrap"
  }; */

  return (
    <ProSidebar>
      {/* <SidebarHeader style={headerStyle}>Sidebar Example</SidebarHeader> */}
      <SidebarContent>
        <Menu iconShape="circle">
          <MenuItem onClick={() =>setSection('personal info') }>Personal Info</MenuItem>
          <MenuItem onClick={() =>setSection('movement') }>Movement</MenuItem>
          <MenuItem onClick={() =>setSection('workout') }>Workout</MenuItem>
          {/* <MenuItem onClick={() =>setSection('gym') }>Gym</MenuItem> */}
          <MenuItem onClick={() =>setSection('coach') }>Manage Coach</MenuItem>
          <MenuItem onClick={() =>setSection('member') }>Manage Member</MenuItem>
          <MenuItem onClick={() =>setSection('create course') }>Create Course</MenuItem>
          <MenuItem onClick={() =>setSection('calendar') }>Update Course</MenuItem>
          <MenuItem onClick={() =>setSection('performance') }>Record Performance</MenuItem>
          <MenuItem onClick={() =>setSection('checkout') }>Checkout Course</MenuItem>          
        </Menu>
        {/* <Menu iconShape="circle">
          <SubMenu
            suffix={<span className="badge yellow">3</span>}
            title="With Suffix"
          >
            <MenuItem> 1 </MenuItem>
            <MenuItem> 2 </MenuItem>
            <MenuItem> 3 </MenuItem>
          </SubMenu>
        </Menu> */}
      </SidebarContent>
      {/* <SidebarFooter style={{ textAlign: "center" }}>
        <div className="sidebar-btn-wrapper">
          <a
            href="https://www.github.com"
            target="_blank"
            className="sidebar-btn"
            rel="noopener noreferrer"
          >
            <span>Github</span>
          </a>
        </div>
      </SidebarFooter> */}
    </ProSidebar>
  );
}
