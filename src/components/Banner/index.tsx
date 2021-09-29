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
            <div className="container">
                <div className="row">
                <div className={`col s12 m6 ${style.ordem2}`}>
                        <div className={style.itemRight}>
                            <div
                            style={{backgroundImage: `url(${banner.banner.png_img})`}}
                            className={style.content}>
                              

                            </div>
                        </div>
                    </div>
                    <div className={`col s12 m6`}>
                        <div className={style.itemLeft}>
                            <div className={style.content}>
                                <h2 style={{ color: `${banner.banner.color_title}` }} >
                                    {banner.banner.title}
                                </h2>
                                <h3 style={{ color: banner.banner.color_caption }} >
                                    {banner.banner.caption}
                                </h3>
                                {/* texto alternativo iterpletando tag html */}
                                <div style={{ color: banner.banner.color_txt }}
                                    className={style.contentTxt}
                                    dangerouslySetInnerHTML={{ __html: `${banner.banner.txt}` }}
                                />
                                <button
                                    style={{
                                        backgroundColor: banner.banner.button_background,
                                        color: banner.banner.button_color
                                    }}
                                    className="btn waves-effect waves-light">{banner.banner.txt_button}
                                </button>

                            </div>
                        </div>

                    </div>
                    <div className={`col s12 m6 ${style.ordem1}`}>
                        <div className={style.itemRight}>
                            <div
                            style={{backgroundImage: `url(${banner.banner.png_img})`}}
                            className={style.content}>
                              

                            </div>
                        </div>
                    </div>
                </div>

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


{/* <div className={`${style.contentBanner} container`}>
                {/* title */}


            //     {/* sub title */}
            //  


            //     {/* button */}

            //     {/* overlay */}


            // </div>
            // */}