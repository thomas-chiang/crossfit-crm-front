import * as React from 'react'
import FullCalendar from '@fullcalendar/react' 
import dayGridPlugin from '@fullcalendar/daygrid' 
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from "@fullcalendar/interaction"
import { useState, useEffect } from "react"
import { CalendarContext } from '../../utils/reactContexts'
import CourseCreation from '../course_creation/CourseCreation'
import Course from '../course/Course'
import Functions from './calendar_creation_functions'
import {Box} from '@mui/material'


function Component () {

  const [update, setUpdate] = useState(true)
  const [calendarEvents, setCalendarEvents] = useState(null)
  const [newCalendarEvent, setNewCalendarEvent] = useState(null)
  const [arr, setArr] = useState([])
  const [obj, setObj] = useState({})

  useEffect(()=>{
    Functions.getCourses(setCalendarEvents)
  },[update])

  function handleSelect (arg) {
    let obj = {
      id: arg.startStr+arg.endStr,
      start: arg.startStr,
      end: arg.endStr
    }
    let index = arr.findIndex(item => item.id == arg.startStr+arg.endStr)
    if(index !== -1) {
      arr[index] = obj
      setArr([...arr]) //must deep copy
    }
    else setArr([...arr, obj])
  }

  function renderEventContent(arg) { 
    return (
      <div >
        <div>{arg.event.extendedProps.size_enrolled}/{arg.event.extendedProps.size}: {arg.event.title}</div>   
      </div>
    )
  }

  let contextValue = {
    newCalendarEvent, 
    setNewCalendarEvent,
    update, 
    setUpdate,
    arr,
    setArr,
    obj,
    setObj
  }

  return (
    <Box sx={{m: 3}} >   
      <CalendarContext.Provider value={contextValue}>
          {arr.length > 0 ? arr.map((courseFromCalendar, index)=> <CourseCreation key={index} obj={obj} id={courseFromCalendar.id} courseFromCalendar={courseFromCalendar} />) : <></>}
          {/* {newCalendarEvent ? <CourseCreation setUpdateCalendar={setUpdateCalendar}/> : <></>} */} 
        <FullCalendar
          dayMaxEventRows= {5}
          eventMaxStack= {5}
          slotDuration= '01:00'
          navLinks= {true}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: 'prev next today',
            center: 'customButton',
            right: 'timeGridDay timeGridWeek dayGridMonth'
          }}
          customButtons={{ 
            customButton: {
              text: 'Create Course',
              click: function() {
                alert('Click any white box below and start creating a course');
              }
            } 
          }}
          initialView="timeGridWeek"
          editable={true}
          selectable={true}
          events={calendarEvents}
          select={handleSelect}
          eventContent={renderEventContent}
          allDaySlot={false}
          eventDisplay={'block'}
          height= {'auto'}
        />     
      </CalendarContext.Provider>
    </Box> 
  )
}

export default Component