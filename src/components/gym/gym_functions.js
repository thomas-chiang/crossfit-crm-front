import utilsFunctions from '../../utils/functions'
const Functions = {
  getGyms,
  getOwnedGyms,
  createGym,
  updateGym,
  deleteGym
}
export default Functions




 
async function getOwnedGyms(setOwnedGyms) {
  try{
    let token = localStorage.getItem('jwtToken')
    let response = await fetch(
      process.env.REACT_APP_API_URL+'gym/owned',
      {
        headers: {'Authorization': `Bearer ${token}`}
      }
    )
    let data = await response.json()
    if (response.ok) setOwnedGyms(data)
    else console.log(response.status+': '+ data.error)
  }catch(e){
    console.log(e)
  }
}

async function getGyms(setGyms) {
  try{
    const response = await fetch (
      process.env.REACT_APP_API_URL+'gym'
    )
    let data = await response.json()
    if (response.ok) setGyms(data)
    else alert(response.status+': '+ data.error)
  }catch(e){
    alert(e.message)
  }
}

async function createGym (newGym, update, setUpdate, setAuth) {
  try{
    let token = localStorage.getItem('jwtToken')

    if(!await utilsFunctions.auth()) return setAuth(false)

    const response = await fetch (
      process.env.REACT_APP_API_URL+'gym',
      {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name: newGym
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

async function updateGym (id, gymName, update, setUpdate, setAuth) {
  try{
    let token = localStorage.getItem('jwtToken')

    if(!await utilsFunctions.auth()) return setAuth(false)

    const response = await fetch (
      process.env.REACT_APP_API_URL+'gym',
      {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          id: id,
          name: gymName
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

async function deleteGym (id, update, setUpdate, setAuth) {
  try{
    let token = localStorage.getItem('jwtToken')

    if(!await utilsFunctions.auth()) return setAuth(false)

    const response = await fetch (
      process.env.REACT_APP_API_URL+`gym/${id}`,
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