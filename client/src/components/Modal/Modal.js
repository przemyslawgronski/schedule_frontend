import { useRef } from 'react'
import style from './Modal.module.css'
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';

const Modal = ({children}) => {
    const dialogRef = useRef(null);

  return (
    <div className={style.modal}>
        <button onClick={()=>dialogRef.current.showModal()}>Powiększ<OpenInFullIcon/></button>
        <dialog ref={dialogRef}>
            <button onClick={()=>dialogRef.current.close()}>Zamknij<CloseFullscreenIcon/></button>
            <div>{children}</div>
        </dialog>
    </div>
  )
}
export default Modal