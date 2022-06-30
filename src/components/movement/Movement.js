import { useState, useEffect }  from 'react'
import  { Navigate } from 'react-router-dom' // auth handler
import Functions from './movement_functions'


function Component() {
 
  const [update, setUpdate] = useState(true)
  const [auth, setAuth] = useState(true) // auth
  const [movements, setMovements] = useState([])
  const [newMovement, setNewMovement] = useState('new movement name')
  const [newLink, setNewLink] = useState('past link here')
  const [ownedMovements, setOwnedMovements] = useState([])


  useEffect(() => {
    Functions.getMovements(setMovements)
    Functions.getOwnedMovements(setOwnedMovements)
  },[update])
  
  if (!auth) return <Navigate to='/login'/> // auth handler
  return (
    <div>
      All movements: {movements.map(movement => 
        <div key={movement.id}>
          {movement.name} <a href={movement.demo_link} target="_blank" rel="noopener noreferrer">demo link</a>
        </div>
      )}
      <br/>
      <div>Create movement:</div>
      <input value={newMovement} onChange={e => setNewMovement(e.target.value)}></input>
      <input value={newLink} onChange={e => setNewLink(e.target.value)}></input>
      <button onClick={() => Functions.createMovement(newMovement, newLink, update, setUpdate, setAuth)}>create</button>
      <br/><br/>
      {
        ownedMovements.length > 0 
        ? <> 
            <div>Your movements: </div>
            {ownedMovements.map(movement => 
              <SubComponent key={movement.id} id={movement.id} movement={movement} update={update} setUpdate={setUpdate} setAuth={setAuth} />
            )}
          </> 
        : <></>
      }
    </div>
  );
}

export default Component;

function SubComponent({id, movement, update, setUpdate, setAuth}) {

  const [movementName, setMovementName] = useState(movement.name)
  const [movementLink, setMovementLink] = useState(movement.demo_link)

  return (
    <div>
      <input type="text" value={movementName} onChange={e => setMovementName(e.target.value)}></input>
      <input type="text" value={movementLink} onChange={e => setMovementLink(e.target.value)}></input>
      <button  onClick={() => Functions.updateMovement(id, movementName, movementLink, update, setUpdate, setAuth)} >update</button>
      <button  onClick={() => Functions.deleteMovement(id, update, setUpdate, setAuth)} >delete</button>
    </div>
  )
}