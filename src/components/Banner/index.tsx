import { BannerType } from "../../types/typesdef"
import { Nav } from "../Nav"
import style from './style.module.scss'
type props = {
    banner: BannerType
}

export const Banner = (banner: props) => {
    return (
        <div
            style={{
                backgroundImage: `url(${banner.banner.img})`
            }}
            className={style.containerBanner}
        >
            <Nav />
            <div className={`${style.contentBanner} container`}>
                {/* title */}
                <h2
                    style={{
                        color: `${banner.banner.color_title}`
                    }}
                >{banner.banner.title}</h2>

                {/* sub title */}
                <h3
                    style={{ color: banner.banner.color_caption }}
                >{banner.banner.caption}</h3>
                {/* text */}
                <div
                    style={{ color: banner.banner.color_txt }}
                    className={style.contentTxt}
                    dangerouslySetInnerHTML={{ __html: `${banner.banner.txt}` }}
                />

                {/* button */}
                <button
                    style={{
                        backgroundColor: banner.banner.button_background,
                        color: banner.banner.button_color
                    }}
                    className="btn">{banner.banner.txt_button}</button>
                {/* ovelay */}


            </div>
            <div 
            style={{
                backgroundColor: banner.banner.overlay
            }}
            className={style.overlay}>

            </div>

        </div>
    )
}