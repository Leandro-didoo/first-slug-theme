import { ReactNode } from "react"
import { BannerType } from "../../types/typesdef"
import { Nav } from "../Nav"
import style from './style.module.scss'
type props = {
    banner: BannerType,
    children: ReactNode,
}

export const Banner = ({ banner, children }: props) => {
    return (
        <div
            style={{
                backgroundImage: `url(${banner.img})`
            }}
            className={style.containerBanner}
        >
            {children}
            <div className={style.contentBanner}>
                <div className={style.itemLeft}>
                    <img src={banner.png_img} alt="" />

                </div>
                <div className={style.itemRIght}>
                    <h2 style={{ color: `${banner.color_title}` }} >
                        {banner.title}
                    </h2>
                    <h3 style={{ color: banner.color_caption }} >
                        {banner.caption}
                    </h3>
                    {/* texto alternativo iterpletando tag html */}
                    <div style={{ color: banner.color_txt }}
                        className={style.contentTxt}
                        dangerouslySetInnerHTML={{ __html: `${banner.txt}` }}
                    />
                    <a
                        href="#schedule"
                        style={{
                            backgroundColor: banner.button_background,
                            color: banner.button_color,
                            

                        }}
                        className={`${style.button} btn`}>
                        {banner.txt_button}
                    </a>


                </div>


            </div>

            <div style={{ backgroundColor: banner.overlay }} className={style.overlay} />
        </div>
    )
}


// <div className="container">
// <div className="row">
//     <div className={`col s12 m6 ${style.ordem2}`}>
//         <div className={style.itemRight}>
//             <div
//                 style={{ backgroundImage: `url(${banner.png_img})` }}
//                 className={style.content}>
//             </div>
//         </div>
//     </div>
//     <div className={`col s12 m6`}>
//         <div className={style.itemLeft}>
//             <div className={style.content}>


//             </div>
//         </div>

//     </div>
//     <div className={`col s12 m6 ${style.ordem1}`}>
//         <div className={style.itemRight}>
//             <div
//                 style={{ backgroundImage: `url(${banner.png_img})` }}
//                 className={style.content}>


//             </div>
//         </div>
//     </div>
// </div>

// </div>

