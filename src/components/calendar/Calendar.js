import * as React from 'react'
import FullCalendar from '@fullcalendar/react' 
import dayGridPlugin from '@fullcalendar/daygrid' 
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from "@fullcalendar/interaction"
import styles from './calendar.module.css'
import { useState, useEffect } from "react"
import { CalendarContext } from '../../utils/reactContexts'
import CourseCreation from '../course_creation/CourseCreation'
import Course from '../course/Course'
import Functions from './calendar_functions'



function Component () {

  const [update, setUpdate] = useState(true)
  const [calendarEvents, setCalendarEvents] = useState(null)
  const [newCalendarEvent, setNewCalendarEvent] = useState(null)
  const [arr, setArr] = useState([])

  useEffect(()=>{
    Functions.getCourses(setCalendarEvents)
  },[update])

  //console.log(calendarEvents)

  function handleSelect (arg) {
    setNewCalendarEvent({
      start: arg.startStr,
      end: arg.endStr
    })
  }

  function eventSetter(arg) {
    if(arr.length > 3) return alert ('open too many courses')
    let obj = {
      id: arg.event.id,
      title: arg.event.title,
      start: arg.event.startStr,
      end: arg.event.endStr,
      size: arg.event.extendedProps.size,
      note: arg.event.extendedProps.note,
      coaches: arg.event.extendedProps.coaches,
      members: arg.event.extendedProps.members,
      workouts: arg.event.extendedProps.workouts,
      gym_id: arg.event.extendedProps.gym_id,
      gym_name: arg.event.extendedProps.gym_name,
      gym: arg.event.extendedProps.gym,
      size_enrolled: arg.event.extendedProps.size_enrolled,
      point: arg.event.extendedProps.point
    }
    let index = arr.findIndex(item => item.id === arg.event.id)
    if(index !== -1) {
      arr[index] = obj
      setArr([...arr]) //must deep copy
    }
    else setArr([...arr, obj])
  }

  function renderEventContent(arg) { 
    return (
      <div >
        <div>{arg.event.extendedProps.gym_name} {arg.event.extendedProps.size_enrolled}/{arg.event.extendedProps.size}</div>   
      </div>
    )
  }

  const contextValue = {
    newCalendarEvent, 
    setNewCalendarEvent,
    update, 
    setUpdate,
    arr,
    setArr
  }

  return (
    <div className={styles.margin} >   
      <CalendarContext.Provider value={contextValue}>
        <div className={styles.flex}>
          {newCalendarEvent ? <CourseCreation /> : <></>}
          {arr.length > 0 ? arr.map(item => <Course key={item.id} id={item.id}/>) : <></>} 
        </div>
        <FullCalendar
          dayMaxEventRows= {5}
          eventMaxStack= {5}
          slotDuration= '01:00'
          navLinks= {true}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: 'prev next today',
            center: 'title',
            right: 'timeGridDay timeGridWeek dayGridMonth'
          }}
          initialView="timeGridWeek"
          editable={true}
          selectable={true}
          events={calendarEvents}
          select={handleSelect}
          eventClick={eventSetter}
          eventContent={renderEventContent}
          eventDrop={eventSetter}
          eventResize={eventSetter}
          allDaySlot={false}
          eventDisplay={'block'}
          height= {'auto'}
        />     
      </CalendarContext.Provider>
    </div> 
  )
}

export default Component