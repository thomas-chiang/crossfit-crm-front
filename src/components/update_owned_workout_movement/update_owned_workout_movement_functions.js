import utilsFunctions from '../../utils/functions'
const Functions = {
  updateOwnedWorkoutMovement,
  getWorkoutMovement,
  deleteWorkoutMovement
}
export default Functions

async function updateOwnedWorkoutMovement (updatedMovement, setUpdate, setPassDownUpdate, setAuth) {
  try{
    let token = localStorage.getItem('jwtToken')
    if(!await utilsFunctions.auth()) return setAuth(false)

    const response = await fetch (
      process.env.REACT_APP_API_URL+'workout/workoutmovement',
      {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updatedMovement)
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



async function getWorkoutMovement (setUpdatedMovement, workout_movement_id) {
  try{
    const response = await fetch (
      process.env.REACT_APP_API_URL+`workout/workoutmovement/${workout_movement_id}`,
    )
    let data = await response.json()
    if (response.ok) setUpdatedMovement(data)
    else console.log(response.status+': '+ data.error)
  }catch(e){
    //alert(e.message)
    console.log(e)
  }  
}



async function deleteWorkoutMovement (workout_movement_id, setUpdateFromChild, setPassDownUpdate, setAuth) {
  try{
    let token = localStorage.getItem('jwtToken')
    if(!await utilsFunctions.auth()) return setAuth(false)

    const response = await fetch (
      process.env.REACT_APP_API_URL+`workout/workoutmovement/${workout_movement_id}`,
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
      setUpdateFromChild(Date())
    }
    else console.log(response.status+': '+ data.error)
  }catch(e){
    alert(e.message)
  }  
}