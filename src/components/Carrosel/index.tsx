import { AngleLeft, AngleRight } from '../Icons'
import style from './style.module.scss'

export const Carrousel = () => {
    return (
        <div className={style.cotaniner}>
            <button className={style.btnLeft}>
                <AngleLeft width={20} color="#333" />
            </button>
            <button className={style.btnRight}>
                <AngleRight width={20} color="#333" />
            </button>
            <div className={style.content}>
                <div className={style.scroll}>
                    <div className={style.item}>
                        <div className={style.itemContent}>

                        </div>
                    </div>

                </div>
                <div className={style.scroll}>
                    <div className={style.item}>
                        <div className={style.itemContent}>

                        </div>


                    </div>

                </div>
                <div className={style.scroll}>
                    <div className={style.item}>
                        <div className={style.itemContent}>

                        </div>


                    </div>

                </div>
                <div className={style.scroll}>
                    <div className={style.item}>
                        <div className={style.itemContent}>

                        </div>


                    </div>

                </div>
                <div className={style.scroll}>
                    <div className={style.item}>
                        <div className={style.itemContent}>

                        </div>


                    </div>

                </div>  
            </div>

        </div>
    )
}