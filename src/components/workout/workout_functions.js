import utilsFunctions from '../../utils/functions'
const Functions = {
  //getWorkouts,
  //getOwnedWorkouts,
  createWorkout, //
  //updateWorkout,
  //deleteWorkout,
  getMovementOptions, //
  getWorkoutsWithMovements, //
  getOwnedWorkoutsWithMovements, //
  //deleteWorkoutWithMovements
}
export default Functions


async function getOwnedWorkoutsWithMovements(setOwnedWorkouts) {
  try{
    let token = localStorage.getItem('jwtToken')
    let response = await fetch(
      process.env.REACT_APP_API_URL+'workout/ownedmovement',
      {
        headers: {'Authorization': `Bearer ${token}`}
      }
    )
    let data = await response.json()
    if (response.ok) setOwnedWorkouts(data)
    else console.log(response.status+': '+ data.error)
  }catch(e){
    console.log(e)
  }
}


async function getMovementOptions(setMovements) {
  try{
    const response = await fetch (
      process.env.REACT_APP_API_URL+'movement/option'
    )
    let data = await response.json()
    if (response.ok) setMovements(data)
    else alert(response.status+': '+ data.error)
  }catch(e){
    console.log(e)
    alert(e.message)
  }
}

 




async function getWorkoutsWithMovements(setWorkouts) {
  try{
    const response = await fetch (
      process.env.REACT_APP_API_URL+'workout/movement'
    )
    let data = await response.json()
    if (response.ok) setWorkouts(data)
    else alert(response.status+': '+ data.error)
  }catch(e){
    console.log(e)
    alert(e.message)
  }
}

async function createWorkout (newWorkout, movementArr, setUpdate, setAuth) {
  try{
    let token = localStorage.getItem('jwtToken')

    if(!await utilsFunctions.auth()) return setAuth(false)

    newWorkout.movementArr = movementArr
    const response = await fetch (
      process.env.REACT_APP_API_URL+'workout/movement',
      {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newWorkout)
      }
    )
    let data = await response.json()
    if (response.ok) {
      alert('created successfully')
      setUpdate(Date())
    }
    else alert(response.status+': '+ data.error)
  }catch(e){
    console.log(e)
    alert(e.message)
  }
}

