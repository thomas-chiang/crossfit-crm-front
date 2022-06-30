import utilsFunctions from '../../utils/functions'
const Functions = {
  handleCreateButton,
}
export default Functions

async function handleCreateButton(course, calendarContext, setAuth) {
  try {
    // let user = await utilsFunctions.getUserData()
    // if (!user) return setAuth(false)
    if(!await utilsFunctions.auth()) return setAuth(false)
    
    let token = localStorage.getItem('jwtToken') // auth
    const response = await fetch (
      process.env.REACT_APP_API_URL+'course',
      {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // auth
        },
        body: JSON.stringify(course)
      }
    )

    if (response.ok) {
      alert('created successfully')
      calendarContext.setUpdate(!calendarContext.update)
      calendarContext.setNewCalendarEvent(null)
    } else {
      let data = await response.json()
      alert(response.status+': '+ data.error)
    }
  } catch (e) {
    alert(e.message)
  }  
}

