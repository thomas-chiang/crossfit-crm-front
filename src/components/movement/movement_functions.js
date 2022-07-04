import utilsFunctions from '../../utils/functions'
const Functions = {
  getMovements,
  createMovement,
  updateMovement,
  deleteMovement
}
export default Functions


async function getMovements(setMovements) {
  try{
    const response = await fetch (
      process.env.REACT_APP_API_URL+'movement'
    )
    let data = await response.json()
    if (response.ok) setMovements(data)
    else alert(response.status+': '+ data.error)
  }catch(e){
    alert(e.message)
  }
}

async function createMovement (name, setUpdate, setAuth) {
  try{
    let token = localStorage.getItem('jwtToken')

    if(!await utilsFunctions.auth()) return setAuth(false)

    const response = await fetch (
      process.env.REACT_APP_API_URL+'movement',
      {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({name})
      }
    )
    let data = await response.json()
    if (response.ok) {
      alert('created successfully')
      setUpdate(Date())
    }
    else alert(response.status+': '+ data.error)
  }catch(e){
    alert(e.message)
  }
}

async function updateMovement (id, movementName, setUpdate, setAuth) {
  try{
    let token = localStorage.getItem('jwtToken')

    if(!await utilsFunctions.auth()) return setAuth(false)

    const response = await fetch (
      process.env.REACT_APP_API_URL+'movement',
      {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          id: id,
          name: movementName,
        })
      }
    )
    let data = await response.json()
    if (response.ok) {
      alert('updated successfully')
      setUpdate(Date())
    }
    else alert(response.status+': '+ data.error)
  }catch(e){
    alert(e.message)
  }
}

async function deleteMovement (id, setUpdate, setAuth) {
  try{
    let token = localStorage.getItem('jwtToken')

    if(!await utilsFunctions.auth()) return setAuth(false)

    const response = await fetch (
      process.env.REACT_APP_API_URL+`movement/${id}`,
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
      setUpdate(Date())
    }
    else alert(response.status+': '+ data.error)
  }catch(e){
    alert(e.message)
  }
}