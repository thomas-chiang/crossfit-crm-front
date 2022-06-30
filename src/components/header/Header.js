import styles from './header.module.css'
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../utils/reactContexts'
import Functions from './header_functions';


function Component() {
  
  const appContext = useContext(AppContext)
  const [user, setUser] = useState(null)

  useEffect(() => {
    Functions.getUserProfile(setUser, appContext)
  },[appContext.update])


  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <Link className={styles.a} to="/">CrossFit CRM</Link>
      </div>
      <nav>
        <ul className={styles.ul}>
          {/* <li className={styles.li}><Link className={styles.a} to="/workout">WORKOUT</Link></li>
          <li className={styles.li}><Link className={styles.a} to="/movement">MOVEMENT</Link></li>
          <li className={styles.li}><Link className={styles.a} to="/gym">GYM</Link></li> */}
          <li className={styles.li}><Link className={styles.a} to="/analysis">ANALYSIS</Link></li>
          <li className={styles.li}><Link className={styles.a} to="/calendar">COURSE CALENDAR</Link></li>
          { 
            user 
            ? <li className={styles.li}><Link className={styles.a} to="/profile">PROFILE</Link></li>
            : <li className={styles.li}><Link className={styles.a} to="/profile">LOGIN</Link></li>
          } 
        </ul>
      </nav>  
    </div>
    
  );
}

export default Component;