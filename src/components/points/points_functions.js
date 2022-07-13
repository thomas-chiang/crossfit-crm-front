const Functions = {
  getUsersByRole,
  getUser,
  getPointsByUser
}
export default Functions



async function getPointsByUser(user_id, setPoints) {
  try{
    const response = await fetch (
      process.env.REACT_APP_API_URL+`user/point/${user_id}`
    )
    let data = await response.json()
    if (response.ok) setPoints(data)
    else alert(response.status+': '+ data.error)
  }catch(e){
    alert(e.message)
  }
}

async function getUsersByRole(role_level, setCoaches) {
  try{
    const response = await fetch (
      process.env.REACT_APP_API_URL+`user/role/${role_level}`
    )
    let data = await response.json()

    for (let user of data) {
      user.value = user.id
      user.label = user.name
    }

    if (response.ok) setCoaches(data)
    else alert(response.status+': '+ data.error)
  }catch(e){
    alert(e.message)
  }
}

async function getUser (setUser) { 
  try{
    let token = localStorage.getItem('jwtToken')
    let response = await fetch(
      process.env.REACT_APP_API_URL+'token',
      {
        headers: {'Authorization': `Bearer ${token}`}
      }
    )
    let data = await response.json()
    if (response.ok) {
      data.value = data.id
      data.label = data.name
      setUser(data)
    } else {
      console.log(response.status+': '+ data.error)
      localStorage.removeItem('jwtToken')
    }
  } catch(e){
    console.log(e.message)
  }
}
