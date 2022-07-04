import utilsFunctions from '../../utils/functions'

const Functions = {
  handleEnrollButton,
  handleQuitButton,
  handleCancelButton,
  getWorkout
}
export default Functions

async function handleEnrollButton(id, calendarContext, setAuth) {
  try {
    if(!await utilsFunctions.auth()) return setAuth(false)

    let token = localStorage.getItem('jwtToken')  // auth
    const response = await fetch (
      process.env.REACT_APP_API_URL+`course/enroll/${id}`,
      {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${token}` // auth
        }
      }
    )
    if (response.ok) {
      alert('Enrolled successfully')
      calendarContext.setUpdate(!calendarContext.update)
      
    } else {
      let data = await response.json()
      alert(response.status+': '+ data.error)
    }
  } catch (e) {
    alert(e.message)
  }  
}


async function handleQuitButton(id, calendarContext, setAuth) {
  try {
    if(!await utilsFunctions.auth()) return setAuth(false)

    let token = localStorage.getItem('jwtToken')  // auth
    const response = await fetch (
      process.env.REACT_APP_API_URL+`course/enroll/${id}`,
      {
        method: "DELETE",
        headers: {
          'Authorization': `Bearer ${token}` // auth
        }
      }
    )
    if (response.ok) {
      alert('Quit successfully')
      calendarContext.setUpdate(!calendarContext.update)
      
    } else {
      let data = await response.json()
      alert(response.status+': '+ data.error)
    }
  } catch (e) {
    alert(e.message)
  }  
}




function handleCancelButton(id, calendarContext) {   
  calendarContext.setUpdate(!calendarContext.update) 
  let oldArr = calendarContext.arr
  let newArr = oldArr.filter(item => item.id !== id)
  calendarContext.setArr(newArr)
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
  }  
}
