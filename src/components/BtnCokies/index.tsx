import { CookiesIco } from '../Icons';
import style from './style.module.scss';
import Link from 'next/link'

export const BtnCokies = () => {

    function handleCookies() {
        if (typeof (Storage) !== "undefined") {
            localStorage.setItem("@cms:accepted_cookies", "true");
        } else (
            alert("seu navegador não suporta armazenamento na web")
        )
    }
    return (
        <div className={`${style.container} z-depth-3`}>
            <div className={style.content}>
                <div className={style.titleCard}>
                    <strong>Esse site usa cookies</strong>
                    <CookiesIco />
                </div>
                <p>Nós armazenamos dados temorariamente para melhorar a sua experiencia de navegação e recomendar conteudo do seu enteresse. Ao utilizar esste site você concorda com tal monitoramento.</p>
                <Link href="/politica-privacidade">
                    <a>Politica de Privacidade</a>
                </Link>
                <button onClick={handleCookies} className="btn grey darken-4 waves-effect waves-light">Ok</button>
            </div>
        </div>
    )
}