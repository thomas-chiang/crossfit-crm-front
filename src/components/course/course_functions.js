import utilsFunctions from '../../utils/functions'

const Functions = {
  handleUpdateButton,
  handleDeleteButton,
  handleCancelButton
}

export default Functions
async function handleUpdateButton(course, calendarContext, setAuth) {
  try {
    if(!await utilsFunctions.auth()) return setAuth(false)

    let token = localStorage.getItem('jwtToken')  // auth
    const response = await fetch (
      process.env.REACT_APP_API_URL+'course',
      {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // auth
        },
        body: JSON.stringify(course)
      }
    )
    if (response.ok) {
      alert('Updated successfully')
      calendarContext.setUpdate(!calendarContext.update)
      let oldArr = calendarContext.arr
      let newArr = oldArr.filter(item => item.id !== course.id)
      calendarContext.setArr(newArr)
    } else {
      let data = await response.json()
      alert(response.status+': '+ data.error)
    }
  } catch (e) {
    alert(e.message)
  }  
}

async function handleDeleteButton(id, calendarContext, setAuth) {
  try {
    if(!await utilsFunctions.auth()) return setAuth(false)
    
    let token = localStorage.getItem('jwtToken') // auth
    const response = await fetch (
      process.env.REACT_APP_API_URL+`course/delete/${id}`,
      { 
        method: "DELETE",
        headers: {
          'Authorization': `Bearer ${token}` // auth
        }
      }
    )
    if (response.ok) {
      alert('Deleted successfully')
      calendarContext.setUpdate(!calendarContext.update)
      let oldArr = calendarContext.arr
      let newArr = oldArr.filter(item => item.id !== id)
      calendarContext.setArr(newArr)
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


