import React from 'react'
import { Link } from 'react-router-dom'
import ChooseGroup from '../../components/newShift/ChooseGroup'
import ShiftsLinks from '../../components/shifts/ShiftsLinks'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import style from './shiftspage.module.css'

const ShiftsPage = () => {

  return (
    <div className={style.shiftspage}>
      <div>
        <h1>Zmiany</h1>
        <Link to="new">Nowe <AddCircleIcon/></Link>
      </div>

      <div></div>

      <ChooseGroup>
        <ShiftsLinks />
      </ChooseGroup>
    </div> 
  )
}

export default ShiftsPage