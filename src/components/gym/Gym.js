import { useState, useEffect }  from 'react'
import  { Navigate } from 'react-router-dom' // auth handler
import Functions from './gym_functions'


function Component() {
 
  const [update, setUpdate] = useState(true)
  const [auth, setAuth] = useState(true) // auth
  const [gyms, setGyms] = useState([])
  const [ownedGyms, setOwnedGyms] = useState([])
  const [newGym, setNewGym] = useState('new gym name')

  useEffect(() => {
    Functions.getGyms(setGyms)
    Functions.getOwnedGyms(setOwnedGyms)
  },[update])
  
  if (!auth) return <Navigate to='/login'/> // auth handler
  return (
    <div>
      All gyms: {gyms.map(gym => <div key={gym.id}>{gym.name}</div>)}
      <br/><br/><br/>
      <div>Create gym:</div>
      <input value={newGym} onChange={e => setNewGym(e.target.value)}></input>
      <button onClick={() => Functions.createGym(newGym, update, setUpdate, setAuth)}>create</button>
      <br/><br/><br/><br/>
      {
        ownedGyms.length > 0 
        ? <> 
            <div>Your gyms: </div>
            {ownedGyms.map(gym => 
              <GYM key={gym.id} id={gym.id} gym={gym} update={update} setUpdate={setUpdate} setAuth={setAuth} />
            )}
          </> 
        : <></>
      }
    </div>
  );
}

export default Component;

function GYM({id, gym, update, setUpdate, setAuth}) {

  const [gymName, setGymName] = useState(gym.name)

  return (
    <div>
      <input type="text" value={gymName} onChange={e => setGymName(e.target.value)}></input>
      <button  onClick={() => Functions.updateGym(id, gymName, update, setUpdate, setAuth)} >update</button>
      <button  onClick={() => Functions.deleteGym(id, update, setUpdate, setAuth)} >delete</button>
    </div>
  )
}