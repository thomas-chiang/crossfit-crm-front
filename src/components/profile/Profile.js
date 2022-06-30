import "react-pro-sidebar/dist/css/styles.css";
import styles from './profile.module.css'
import PersonalInfo from '../personal_info/PersonalInfo'
import Sidebar from '../sidebar/Sidebar'
import Gym from '../gym/Gym'
import Member from '../member_coach/MemberCoach'
import Calendar from '../calendar/Calendar'
import CalendarCoach from '../calendar_coach/CalendarCoach'
import Movement from '../movement/Movement'
import Workout from '../workout/Workout'
import {useState} from 'react'


function Component() {

  const [section, setSection] = useState('personal info')

  return (
    <div className={styles.container}>
      <div >
        <Sidebar setSection={setSection} />
      </div>
      {section === 'personal info' ?  <PersonalInfo /> : <></>}
      {section === 'movement' ?  <Movement /> : <></>}
      {section === 'workout' ?  <Workout /> : <></>}
      {section === 'gym' ?  <Gym /> : <></>}
      {section === 'member' ?  <Member /> : <></>}
      {section === 'calendar' ?  <Calendar /> : <></>}
      {section === 'performance' ?  <CalendarCoach /> : <></>}
    </div>
  );
}

export default Component;