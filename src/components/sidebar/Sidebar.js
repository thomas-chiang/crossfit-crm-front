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
          {role >= 2 
          ? <>
            <MenuItem onClick={() =>setSection('movement') }>Movement</MenuItem>
            <MenuItem onClick={() =>setSection('workout') }>Workout</MenuItem>
          </> : <></>}
          

          {/* <MenuItem onClick={() =>setSection('gym') }>Gym</MenuItem> */}
          {role >= 3 
          ? <>
            <MenuItem onClick={() =>setSection('coach') }>Manage Coach</MenuItem>
            <MenuItem onClick={() =>setSection('member') }>Manage Member</MenuItem>
            <MenuItem onClick={() =>setSection('create course') }>Create Course</MenuItem>
          </> : <></>}
          
          {role >= 2 
          ? <>
            <MenuItem onClick={() =>setSection('calendar') }>Update Course</MenuItem>
            <MenuItem onClick={() =>setSection('enroll and checkout') }>Enroll & Checkout Member</MenuItem>
            <MenuItem onClick={() =>setSection('performance') }>Record Performance</MenuItem> 
          </> : <></>}
                 
        </Menu>
      </SidebarContent>
    </ProSidebar>
  );
}
