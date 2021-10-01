import { WhatsappIco } from '../Icons'
import style from './style.module.scss'

type props = {
    phone: string
}

export const Whatsapp = ({phone}:props) =>{
    const urlBases = `https://api.whatsapp.com/send?phone=${phone}`;
    return(
        <div onClick={()=> window.open(`${urlBases}`)} className={style.container}>
             <WhatsappIco width={30} color='white' />
        </div>
    )
}