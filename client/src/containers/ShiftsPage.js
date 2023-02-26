import React from 'react'
import { Link } from 'react-router-dom'
import ChooseGroup from '../components/newShift/ChooseGroup'
import ShiftsLinks from '../components/shifts/ShiftsLinks'

const ShiftsPage = () => {

  return (
    <>
      <div>ShiftsPage</div>
      <Link to="new">Dodaj nowe zmiany</Link>

      <ChooseGroup>
        <ShiftsLinks />
      </ChooseGroup>
    </> 
  )
}

export default ShiftsPage