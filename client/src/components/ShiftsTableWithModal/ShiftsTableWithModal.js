import Modal from '../Modal/Modal'
import ShiftsTable from '../ShiftsTable/ShiftsTable'
import style from './ShiftsTableWithModal.module.css'

const ShiftsTableWithModal = ({headers, children}) => {

    return (
        <>
          <div className={style.crop}>
            <ShiftsTable headers={headers}>
                {children}
            </ShiftsTable>
          </div>
          <Modal>
            <ShiftsTable headers={headers}>
                {children}
            </ShiftsTable>
          </Modal>
      </>
      )
}
export default ShiftsTableWithModal