import utilsFunctions from '../../utils/functions'

const Functions = {
  createPerformance
}
export default Functions

async function createPerformance(performance, setAuth, setUpdate) {
  console.log(performance)
  try {
    if(!await utilsFunctions.auth()) return setAuth(false)
    
    let token = localStorage.getItem('jwtToken') // auth
    const response = await fetch (
      process.env.REACT_APP_API_URL+'course/performance',
      {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // auth
        },
        body: JSON.stringify(performance)
      }
    )
    if (response.ok) {
      setUpdate(Date())
      alert('created successfully')
    } else {
      let data = await response.json()
      alert(response.status+': '+ data.error)
    }
  } catch (e) {
    alert(e.message)
  }  
}