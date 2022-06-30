import utilsFunctions from '../../utils/functions'

const Functions = {
  handleCancelButton,
  getCourseEnrolledmembers,
  enrollMemberByEmail,
  quitMemberById,
  checkoutMemberById
}
export default Functions

async function checkoutMemberById (course_id, user_id, enrollment, setUpdate, setAuth) {
  try {
    if(!await utilsFunctions.auth()) return setAuth(false)
    let token = localStorage.getItem('jwtToken')  // auth
    const response = await fetch (
      process.env.REACT_APP_API_URL+`course/enrollmentbycoach/?course_id=${course_id}&user_id=${user_id}&enrollment=${enrollment}`,
      {
        method: "PUT",
        headers: {
          'Authorization': `Bearer ${token}` // auth
        }
      }
    )
    if (response.ok) {
      alert('Checked out successfully')
      setUpdate(Date())
    } else {
      let data = await response.json()
      alert(response.status+': '+ data.error)
    }
  } catch (e) {
    alert(e.message)
  }  
}

async function quitMemberById (course_id, user_id, enrollment, setUpdate, setAuth) {
  try {
    if(!await utilsFunctions.auth()) return setAuth(false)
    let token = localStorage.getItem('jwtToken')  // auth
    const response = await fetch (
      process.env.REACT_APP_API_URL+`course/enrollmentbycoach/?course_id=${course_id}&user_id=${user_id}&enrollment=${enrollment}`,
      {
        method: "DELETE",
        headers: {
          'Authorization': `Bearer ${token}` // auth
        }
      }
    )
    if (response.ok) {
      alert('Quit successfully')
      setUpdate(Date())
    } else {
      let data = await response.json()
      alert(response.status+': '+ data.error)
    }
  } catch (e) {
    alert(e.message)
  }  
}

async function enrollMemberByEmail (course_id, email, setUpdate, setAuth) {
  try {
    if(!await utilsFunctions.auth()) return setAuth(false)
    let token = localStorage.getItem('jwtToken')  // auth
    const response = await fetch (
      process.env.REACT_APP_API_URL+`course/enrollmentbycoach/?course_id=${course_id}&email=${email}`,
      {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${token}` // auth
        }
      }
    )
    console.log(response.ok)
    if (response.ok) {
      alert('Enrolled successfully')
      setUpdate(Date())
    } else {
      let data = await response.json()
      alert(response.status+': '+ data.error)
    }
  } catch (e) {
    alert(e.message)
  }  
}


async function getCourseEnrolledmembers(course_id, setMembers) {
  try {
    const response = await fetch (
      process.env.REACT_APP_API_URL+`course/enrolled/${course_id}`
    )
    let data = await response.json()
    if (response.ok) {
      setMembers(data)
    } else {
      alert(response.status+': '+ data.error)
    }
  } catch (e) {
    console.log(e.message)
  }  
}




function handleCancelButton(id, calendarContext) {   
  calendarContext.setUpdate(!calendarContext.update)
  let oldArr = calendarContext.arr
  let newArr = oldArr.filter(item => item.id !== id)
  calendarContext.setArr(newArr)
}


