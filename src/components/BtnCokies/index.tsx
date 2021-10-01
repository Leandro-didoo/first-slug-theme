import { CookiesIco } from '../Icons'
import style from './style.module.scss'

export const BtnCokies = () => {

    function handleCookies(){
        if(typeof(Storage) !== "undefined") {
            
        }
    }
    return (
        <div className={`${style.container} z-depth-3`}>
            <div className={style.content}>
                <div className={style.titleCard}>
                    <strong>Esse site usa cookies</strong>
                    <CookiesIco />
                </div>
                <p>Nós armazenamos dados temorariamente para melhorar a sua experiencia de navegação e recomendar conteudo do seu enteresse. Ao utilizar esste site você concorda com tal monitoramento.</p>
                <a>Politica de Privacidade</a>
                <button className="btn grey darken-4 waves-effect waves-light">Ok</button>
            </div>
        </div>
    )
}