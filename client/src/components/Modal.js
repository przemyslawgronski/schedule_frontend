import { useRef } from 'react'

const Modal = ({children}) => {
    const dialogRef = useRef(null);

  return (
    <div>
        <button onClick={()=>dialogRef.current.showModal()}>Open Modal</button>
        <dialog ref={dialogRef}>
            <button onClick={()=>dialogRef.current.close()}>Close Modal</button>
            <div>{children}</div>
        </dialog>
    </div>
  )
}
export default Modal