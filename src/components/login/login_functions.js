const Functions = {
  handleSignUp,
  handleSignIn
}

export default Functions

async function handleSignUp (role, name, email, password, gender, appContext, navigate) {
  try{
    let response = await fetch (
      process.env.REACT_APP_API_URL+'user/signup',
      {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          role,
          name,
          email,
          password,
          gender,
          provider: 'native'
        })
      }
    )
    let data = await response.json()
    if (response.ok) {
      alert('Signed up successfully')
      localStorage.setItem("jwtToken", data.access_token)
      appContext.setUpdate(!appContext.update)
      navigate(-1)
    } else {
      alert(response.status+': '+ data.error+' Please login again')
    }
  } catch(e){
    alert(e.message)
  }
}

async function handleSignIn (role, email, password, appContext, navigate) {
  try{
    let response = await fetch (
      process.env.REACT_APP_API_URL+'user/signin',
      {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          role,
          email,
          password
        })
      }
    )
    let data = await response.json()

    if (response.ok) {
      alert('Signed in successfully')
      localStorage.setItem("jwtToken", data.access_token)
      appContext.setUpdate(!appContext.update)
      navigate(-1)
    } else {      
      alert(response.status+': '+ data.error)
    }
  } catch(e){
    alert(e.message)
  }
}