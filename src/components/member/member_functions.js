import utilsFunctions from '../../utils/functions'
const Functions = {
  getUsersByRole,
  updateValidStatus,
  updatePoint
}
export default Functions

async function getUsersByRole(role_level, setCoaches) {
  try{
    const response = await fetch (
      process.env.REACT_APP_API_URL+`user/role/${role_level}`
    )
    let data = await response.json()
    if (response.ok) setCoaches(data)
    else alert(response.status+': '+ data.error)
  }catch(e){
    alert(e.message)
  }
}


async function updateValidStatus (user_id, valid_status, setUpdate, setAuth) {
  try{
    let token = localStorage.getItem('jwtToken')

    if(!await utilsFunctions.auth()) return setAuth(false)

    const response = await fetch (
      process.env.REACT_APP_API_URL+`user/valid?user_id=${user_id}&valid_status=${valid_status}`,
      {
        method: 'PUT',
        headers: { 
          'Authorization': `Bearer ${token}`
        }
      }
    )
    let data = await response.json()
    if (response.ok) {
      alert('updated valid status successfully')
      setUpdate(Date())
    }
    else alert(response.status+': '+ data.error)
  }catch(e){
    alert(e.message)
  }
}

async function updatePoint (user_id, point, setUpdate, setAuth) {
  try{
    let token = localStorage.getItem('jwtToken')

    if(!await utilsFunctions.auth()) return setAuth(false)

    const response = await fetch (
      process.env.REACT_APP_API_URL+`user/point?user_id=${user_id}&point=${point}`,
      {
        method: 'PUT',
        headers: { 
          'Authorization': `Bearer ${token}`
        }
      }
    )
    let data = await response.json()
    if (response.ok) {
      alert('updated point successfully')
      setUpdate(Date())
    }
    else alert(response.status+': '+ data.error)
  }catch(e){
    alert(e.message)
  }
}
