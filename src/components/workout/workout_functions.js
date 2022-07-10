import utilsFunctions from '../../utils/functions'
const Functions = {
  createWorkout, //
  getMovementOptions, //
  getWorkoutsWithMovements, //
}
export default Functions



async function getMovementOptions(setMovements) {
  try{
    const response = await fetch (
      process.env.REACT_APP_API_URL+'movement'
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
    //alert(e.message)
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

