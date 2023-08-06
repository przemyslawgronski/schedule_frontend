import { useRef } from 'react'
import style from './Modal.module.css'

const Modal = ({children}) => {
    const dialogRef = useRef(null);

  return (
    <div className={style.modal}>
        <button onClick={()=>dialogRef.current.showModal()}>Open Modal</button>
        <dialog ref={dialogRef}>
            <button onClick={()=>dialogRef.current.close()}>Close Modal</button>
            <div>{children}</div>
        </dialog>
    </div>
  )
}
export default Modal