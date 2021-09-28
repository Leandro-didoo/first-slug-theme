import { BannerType } from "../../types/typesdef"
import { Nav } from "../Nav"
import style from './style.module.scss'
type props = {
    banner: BannerType
}

export const Banner = (banner: props) => {
    return (
        <div
            style={{ backgroundImage: `url(${banner.banner.img})` }}
            className={style.containerBanner}
        >
            <Nav />
         
            <div className={style.content}>
                <div className={style.cotentLeft}>
                    <h1 style={{color: banner.banner.color_title}}>{banner.banner.title}</h1>
                    <h2 style={{color: banner.banner.color_caption}}>{banner.banner.caption}</h2>
                    <div className={style.txt} style={{color: banner.banner.color_txt}} dangerouslySetInnerHTML={{ __html: `${banner.banner.txt}` }} />
                    <button 
                    style={{color: banner.banner.button_color, backgroundColor: banner.banner.button_background}}
                     className="btn">{banner.banner.txt_button}</button>

                </div>
                <div className={style.contentRight}>
                    <img src={banner.banner.png_img} alt="" />
                </div>
            </div>

            <div style={{ backgroundColor: banner.banner.overlay }} className={style.overlay} />

        </div>
    )
}