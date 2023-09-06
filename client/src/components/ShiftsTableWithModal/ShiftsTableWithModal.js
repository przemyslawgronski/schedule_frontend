import Modal from '../Modal/Modal'
import ShiftsTable from '../ShiftsTable/ShiftsTable'
import style from './ShiftsTableWithModal.module.css'

const ShiftsTableWithModal = ({headers, children}) => {

  // TODO: Co gdy w jednym dniu będzie więcej niż jedna zmiana?

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