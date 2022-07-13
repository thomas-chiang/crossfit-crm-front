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
          <div>&nbsp;</div>
          <div>&nbsp;</div>
          <MenuItem onClick={() =>setSection('personal info') }>Personal Info</MenuItem>
          <MenuItem onClick={() =>setSection('points') }>View Points History</MenuItem>

          {role >= 3 
          ? <>
            <MenuItem onClick={() =>setSection('member') }>Manage Personnel</MenuItem>
          </> : <></>}

          {role >= 2 
          ? <>
            <MenuItem onClick={() =>setSection('movement') }>Manage Movements</MenuItem>
            <MenuItem onClick={() =>setSection('workout') }>Manage Workouts</MenuItem>
          </> : <></>}

          {role >= 3 
          ? <>
            <MenuItem onClick={() =>setSection('create course') }>Create Course</MenuItem>
            <MenuItem onClick={() =>setSection('calendar') }>Update Course</MenuItem>
          </> : <></>}

          
          {role >= 2 
          ? <>
            <MenuItem onClick={() =>setSection('performance') }>Record Performances</MenuItem> 
            <MenuItem onClick={() =>setSection('enroll and checkout') }>{role == 2 ? 'Enroll Members' : "Enroll & Checkout Members"}</MenuItem>
          </> : <></>}
                 
        </Menu>
      </SidebarContent>
    </ProSidebar>
  );
}
