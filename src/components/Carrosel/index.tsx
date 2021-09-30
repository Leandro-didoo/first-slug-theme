import { ReactNode, useEffect, useState } from 'react'
import { AngleLeft, AngleRight } from '../Icons'
import style from './style.module.scss'


type Props = {
    children: ReactNode,
}

type CarrouSelProps = {
    children: ReactNode,
    qtd: number,
}
export const CardContent = ({children}:Props) => {
    return (
        <div className={style.item}>
            <div className={style.itemContent}>
                {children}
            </div>
        </div>
    )
}

export const Carrousel = ({children, qtd}:CarrouSelProps) => {
    const [scrollX, setScrollX] = useState(0);
    const [deviceWidth, setDeviceWidth] = useState(0);
    const [btn, setBtn] = useState(false);
    const [btnL, setbtnL] = useState(false);

    useEffect(()=>{
        let item : any;
        item  = document.getElementById('carouselContainer')
        setDeviceWidth(item.scrollWidth)

    },[])

    const handleLeftArrow = () => {
        let x = scrollX + Math.round(deviceWidth / 2);
        if (x >= 0) {
            x = 0
            setbtnL(true)
        }
        setScrollX(x)
        setBtn(false)
    }
    const handleRigthArrow = () => {
        let x = scrollX - Math.round(deviceWidth / 2);
        let listW =  qtd * 250;
        if (deviceWidth - listW > x) {
            setBtn(true)
            x = (deviceWidth - listW) - 100;
        }
        setbtnL(false)
        setScrollX(x);
    }
    return (
        <div id="carouselContainer" className={style.cotaniner}>
            <button style={{display: btnL? 'none':'block'}}  className={style.btnLeft} onClick={handleLeftArrow}>
                <AngleLeft width={20} color="#333" />
            </button>
           
            <button style={{display: btn? 'none':'block'}} className={style.btnRight} onClick={handleRigthArrow}>
                <AngleRight width={20} color="#333" />
            </button>
            <div className={style.content}>
                <div className={style.scroll}
                    style={{
                        marginLeft: scrollX,
                        width: qtd * 250
                    }}
                >
                        {children}
                </div>
            </div>

        </div>
    )
}