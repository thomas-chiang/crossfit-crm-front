import utilsFunctions from '../../utils/functions'
const Functions = {
  getWorkouts,
  getPerformances,
  getPerformancesByCourseUser
}
export default Functions

async function getWorkouts(setWorkouts) {
  try{
    const response = await fetch (
      process.env.REACT_APP_API_URL+'workout/'
    )
    let data = await response.json()
    if (response.ok) setWorkouts(data)
    else alert(response.status+': '+ data.error)
  }catch(e){
    alert(e.message)
  }
}

async function getPerformances(course_id, user_id, setPerformances) {
  try{
    const response = await fetch (
      process.env.REACT_APP_API_URL+`course/performance?course_id=${course_id}&user_id=${user_id}`
    )
    let data = await response.json()
    if (response.ok) setPerformances(data)
    else alert(response.status+': '+ data.error)
  }catch(e){
    alert(e.message)
  }
}

async function getPerformancesByCourseUser(course_id, user_id, setPerformances) {
  try{
    const response = await fetch (
      process.env.REACT_APP_API_URL+`performance/courseuser?course_id=${course_id}&user_id=${user_id}`
    )
    let data = await response.json()
    if (response.ok) setPerformances(data)
    else alert(response.status+': '+ data.error)
  }catch(e){
    alert(e.message)
  }
}
