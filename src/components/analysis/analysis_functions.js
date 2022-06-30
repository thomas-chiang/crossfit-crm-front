import utilsFunctions from '../../utils/functions'
import moment from 'moment'

const Functions = {
  getMovements,
  getPerformanceByUserMovement
}
export default Functions


async function getMovements(setMovements) {
  try{
    const response = await fetch (
      process.env.REACT_APP_API_URL+'movement'
    )
    let data = await response.json()
    for (let item of data) {
      item.label = item.name
      item.value = item.id
    }
    if (response.ok) setMovements(data)
    else alert(response.status+': '+ data.error)
  }catch(e){
    alert(e.message)
  }
}

async function getPerformanceByUserMovement(movement_id, setLineDate, setAuth) {
  try{
    let token = localStorage.getItem('jwtToken')
    if(!await utilsFunctions.auth()) return setAuth(false)
    const response = await fetch (
      process.env.REACT_APP_API_URL+`performance/usermovement/${movement_id}`
      ,{
        headers: { 
          'Authorization': `Bearer ${token}`
        }
      }
    )
    let data = await response.json()
    let labels = []
    let datasets = [
      {
        label: 'kg',
        data: [],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'rep',
        data: [],
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: 'meter',
        data: [],
        borderColor: 'rgb(50,205,50)',
        backgroundColor: 'rgba(50,205,50, 0.5)',
      },
      {
        label: 'cal',
        data: [],
        borderColor: 'rgb(255,165,0)',
        backgroundColor: 'rgba(255,165,0, 0.5)',
      },
      {
        label: 'sec',
        data: [],
        borderColor: 'rgb(186,85,211)',
        backgroundColor: 'rgb(186,85,211, 0.5)',
      },
    ]
    for (let item of data) {
      labels.push(`${moment(item.start).local().format('YYYY/MM/DD')}: ${item.workout_name}`)
      datasets[0].data.push(item.kg)
      datasets[1].data.push(item.rep)
      datasets[2].data.push(item.meter)
      datasets[3].data.push(item.cal)
      datasets[4].data.push(item.sec)
    }
    let lineDate = {labels, datasets}
    //console.log(labels)
    //console.log(datasets[2].data)
    if (response.ok) setLineDate(lineDate)
    else alert(response.status+': '+ data.error)
  }catch(e){
    alert(e.message)
  }
}