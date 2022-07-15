import moment from 'moment'
const Functions = {
  getWorkouts,
  //getLeaderboardByWorkout,
  getLeaderboardByWorkouts,
  getWorkout
}
export default Functions

async function getWorkouts(setWorkouts) {
  try{
    const response = await fetch (
      process.env.REACT_APP_API_URL+'workout/'
    )
    let data = await response.json()
    if (response.ok) setWorkouts(data)
    else console.log(data.error)
  }catch(e){
    console.log(e)
    //alert(e.message)
  }
}


// async function getLeaderboardByWorkout(workout, leaderboards, setLeaderboards) {
//   try{
//     const response = await fetch (
//       process.env.REACT_APP_API_URL+`performance/leaderboard/workout/${workout.id}`
//     )
//     let data = await response.json()
//     if (response.ok) setLeaderboards([...leaderboards, data])
//     else console.log(data.error)
//   }catch(e){
//     console.log(e)
//     //alert(e.message)
//   }
// }


async function getLeaderboardByWorkouts(selectedWorkouts, setLeaderboards) {
  try{
    let reqQuery = ''
    for (let workout of selectedWorkouts) {
      reqQuery += `workout_ids=${workout.id}&`
    }

    const response = await fetch (
      process.env.REACT_APP_API_URL+`performance/leaderboard/workout?${reqQuery}`,
    )
    let data = await response.json()


    let arr = []
    for (let item of data) {
      arr.push({
        ...generateBarData(item.leaders),
        ...item
      })
    }

    //console.log(arr)

    if (response.ok) setLeaderboards(arr)
    else console.log(data.error)
  }catch(e){
    console.log(e)
    //alert(e.message)
  }
}

async function getWorkout (workout_id, setUpdatedWorkout) {
  try{
    const response = await fetch (
      process.env.REACT_APP_API_URL+`workout/workout/${workout_id}`,
    )
    let data = await response.json()
    if (response.ok) setUpdatedWorkout(data)
    else console.log(data.error)
  }catch(e){
    console.log(e)
  }  
}

function generateBarData (data) {
  let labels = []
  let datasets = [
    {
      label: 'score',
      data: [],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'round & minute',
      data: [],
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
    {
      label: 'movements',
      data: [],
      borderColor: 'rgb(169,169,169)',
      backgroundColor: 'rgba(169,169,169, 0.5)',
    },

    // {
    //   label: 'kg',
    //   data: [],
    //   borderColor: 'rgb(255, 87, 34)',
    //   backgroundColor: 'rgba(255, 87, 34, 0.5)',
    // },
    // {
    //   label: 'rep',
    //   data: [],
    //   borderColor: 'rgb(53, 162, 235)',
    //   backgroundColor: 'rgba(53, 162, 235, 0.5)',
    // },
    // {
    //   label: 'meter',
    //   data: [],
    //   borderColor: 'rgb(50,205,50)',
    //   backgroundColor: 'rgba(50,205,50, 0.5)',
    // },
    // {
    //   label: 'cal',
    //   data: [],
    //   borderColor: 'rgb(255, 193, 7)',
    //   backgroundColor: 'rgba(255, 193, 7, 0.5)',
    // },
    // {
    //   label: 'round',
    //   data: [],
    //   borderColor: 'rgb(186,85,211)',
    //   backgroundColor: 'rgba(186,85,211, 0.5)',
    // },
    // {
    //   label: 'minute',
    //   data: [],
    //   borderColor: 'rgb(169,169,169)',
    //   backgroundColor: 'rgba(169,169,169, 0.5)',
    // },
  ]
  for (let item of data) {
    labels.push(item.name)
    datasets[0].data.push(item.score)
    datasets[1].data.push(item.round_minute)
    datasets[2].data.push(item.other)
    // datasets[1].data.push(item.kg)
    // datasets[2].data.push(item.rep)
    // datasets[3].data.push(item.meter)
    // datasets[4].data.push(item.cal)
    // datasets[5].data.push(item.round)
    // datasets[6].data.push(item.minute)
  }
  let barData = {labels, datasets}
  return barData
}