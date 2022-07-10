const Functions = {
  getLeader
}

export default Functions

async function getLeader(member, setLeader) { 
  try{
    let response = await fetch(
      process.env.REACT_APP_API_URL+`performance/leaderboard/leader/?course_id=${member.course_id}&user_id=${member.user_id}&workout_id=${member.workout_id}`,
    )
    let data = await response.json()
    if (response.ok) {
      setLeader(data)
    } else {
      console.log(response.status+': '+ data.error)
      localStorage.removeItem('jwtToken')
    }
  } catch(e){
    console.log(e.message)
  }
}