import React from "react";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarContent,
} from "react-pro-sidebar";

export default function Aside({setSection, role}) {
 

  return (
    <ProSidebar>
      <SidebarContent>
        <Menu iconShape="circle">
          <MenuItem onClick={() =>setSection('personal info') }>Personal Info</MenuItem>

          {role >= 3 
          ? <>
            <div>&nbsp;</div>
            {/* <MenuItem onClick={() =>setSection('coach') }>Manage Coaches</MenuItem> */}
            <MenuItem onClick={() =>setSection('member') }>Manage Personnel</MenuItem>
          </> : <></>}

          {role >= 2 
          ? <>
            <div>&nbsp;</div>
            <MenuItem onClick={() =>setSection('movement') }>Manage Movements</MenuItem>
            <MenuItem onClick={() =>setSection('workout') }>Manage Workouts</MenuItem>
          </> : <></>}

          {role >= 2 
          ? <>
            <div>&nbsp;</div>
            <MenuItem onClick={() =>setSection('create course') }>Create Course</MenuItem>
            <MenuItem onClick={() =>setSection('calendar') }>Update Course</MenuItem>
          </> : <></>}

          
          {role >= 2 
          ? <>
            <div>&nbsp;</div>
            <MenuItem onClick={() =>setSection('performance') }>Record Performances</MenuItem> 
            <div>&nbsp;</div>
            <MenuItem onClick={() =>setSection('enroll and checkout') }>Enroll & Checkout Members</MenuItem>
          </> : <></>}
                 
        </Menu>
      </SidebarContent>
    </ProSidebar>
  );
}
