import { CookiesIco } from '../Icons'
import style from './style.module.scss'
import { useState, useEffect } from 'react';
import Link from 'next/link'

export const BtnCokies = () => {
    const [acceptCookies, setAcceptCookies] = useState(false)

    useEffect(()=>{
        if (localStorage.getItem("@cms:accepted_cookies") === 'accepted') {
            setAcceptCookies(true)
        }else   setAcceptCookies(false);
    },[])

    function handleCookies() {
        localStorage.setItem('@cms:accepted_cookies', 'accepted');
        setAcceptCookies(true)
    }
    return (
            <div
                className={`${style.container} z-depth-3`}
                style={{display: acceptCookies? 'none': 'block'}}
            >
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