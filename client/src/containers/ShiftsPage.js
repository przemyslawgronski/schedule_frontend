import React from 'react'
import { Link } from 'react-router-dom'
import ChooseGroup from '../components/newShift/ChooseGroup'
import ShiftsLinks from '../components/shifts/ShiftsLinks'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import style from '../styles/shiftspage.module.css'

const ShiftsPage = () => {

  return (
    <div className={style.shiftspage}>
      <h1>Zmiany</h1>
      <Link to="new">Dodaj nowe zmiany <AddCircleIcon/></Link>
      
      <ChooseGroup>
        <ShiftsLinks />
      </ChooseGroup>
    </div> 
  )
}

export default ShiftsPage