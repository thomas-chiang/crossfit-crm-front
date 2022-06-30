import utilsFunctions from '../../utils/functions'
const Functions = {
  getMovements,
  getOwnedMovements,
  createMovement,
  updateMovement,
  deleteMovement
}
export default Functions



 
async function getOwnedMovements(setOwnedMovements) {
  try{
    let token = localStorage.getItem('jwtToken')
    let response = await fetch(
      process.env.REACT_APP_API_URL+'movement/owned',
      {
        headers: {'Authorization': `Bearer ${token}`}
      }
    )
    let data = await response.json()
    if (response.ok) setOwnedMovements(data)
    else console.log(response.status+': '+ data.error)
  }catch(e){
    console.log(e)
  }
}

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

async function createMovement (newMovement, newLink, update, setUpdate, setAuth) {
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
        body: JSON.stringify({
          name: newMovement,
          demo_link: newLink
        })
      }
    )
    let data = await response.json()
    if (response.ok) {
      alert('created successfully')
      setUpdate(!update)
    }
    else alert(response.status+': '+ data.error)
  }catch(e){
    alert(e.message)
  }
}

async function updateMovement (id, movementName, movementLink, update, setUpdate, setAuth) {
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
          demo_link: movementLink
        })
      }
    )
    let data = await response.json()
    if (response.ok) {
      alert('updated successfully')
      setUpdate(!update)
    }
    else alert(response.status+': '+ data.error)
  }catch(e){
    alert(e.message)
  }
}

async function deleteMovement (id, update, setUpdate, setAuth) {
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
      setUpdate(!update)
    }
    else alert(response.status+': '+ data.error)
  }catch(e){
    alert(e.message)
  }
}