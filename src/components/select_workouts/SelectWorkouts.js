import { useState, useEffect }  from 'react'
import Functions from './select_workouts_functions'
import Select from 'react-select';



function Component({
  selectedWorkouts,
  setSelectedWorkouts
}) {
 
  const [workouts, setWorkouts] = useState([])
  //const [selectedWorkouts, setSelectedWorkouts] = useState(null)
  

  useEffect(() => {
    Functions.getWorkouts(setWorkouts)
  },[selectedWorkouts])

  //console.log(workouts)

  return (
    <div>
      Select workout:  <Select
        isMulti
        defaultValue={selectedWorkouts}
        onChange={setSelectedWorkouts}
        options={workouts}
      />
    </div>
  );
}

export default Component;

