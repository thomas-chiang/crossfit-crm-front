import utilsFunctions from '../../utils/functions'
const Functions = {
  getWorkout,
  addWorkoutMovement,
  updateOnlyWorkout,
  deleteWorkout
}
export default Functions

async function deleteWorkout (workout_id, setAuth, setPassDownUpdate) {
  try{
    let token = localStorage.getItem('jwtToken')
    if(!await utilsFunctions.auth()) return setAuth(false)

    const response = await fetch (
      process.env.REACT_APP_API_URL+`workout/workout/${workout_id}`,
      {
        method: 'DELETE',
        headers: { 
          'Authorization': `Bearer ${token}`
        }
      }
    )
    let data = await response.json()
    if (response.ok) {
      alert('deleted successfully')
      setPassDownUpdate(Date())
    }
    else alert(response.status+': '+ data.error)
  }catch(e){
    console.log(e)
    alert(e.message)
  }  
}

async function getWorkout (workout_id, setUpdatedWorkout) {
  try{
    const response = await fetch (
      process.env.REACT_APP_API_URL+`workout/workout/${workout_id}`,
    )
    let data = await response.json()
    if (response.ok) setUpdatedWorkout(data)
    else console.log(response.status+': '+ data.error)
  }catch(e){
    console.log(e)
    //alert(e.message)
  }  
}

async function addWorkoutMovement (newWorkoutMovement, setAuth, setUpdate, setPassDownUpdate) {
  try{
    let token = localStorage.getItem('jwtToken')
    if(!await utilsFunctions.auth()) return setAuth(false)

    const response = await fetch (
      process.env.REACT_APP_API_URL+'workout/addmovement',
      {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newWorkoutMovement)
      }
    )
    let data = await response.json()
    if (response.ok) {
      alert('added successfully')
      setUpdate(Date())
      setPassDownUpdate(Date())
    }
    else alert(response.status+': '+ data.error)
  }catch(e){
    console.log(e)
    alert(e.message)
  }
}

async function updateOnlyWorkout (updatedWorkout, setAuth, setUpdate, setPassDownUpdate) {
  try{
    let token = localStorage.getItem('jwtToken')
    if(!await utilsFunctions.auth()) return setAuth(false)

    const response = await fetch (
      process.env.REACT_APP_API_URL+'workout/onlynameandnote',
      {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updatedWorkout)
      }
    )
    let data = await response.json()
    if (response.ok) {
      alert('updated successfully')
      setUpdate(Date())
      setPassDownUpdate(Date())
    }
    else alert(response.status+': '+ data.error)
  }catch(e){
    console.log(e)
    alert(e.message)
  }
}