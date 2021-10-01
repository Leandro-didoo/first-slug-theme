import { CookiesIco } from '../Icons'
import style from './style.module.scss'
import { useState, useEffect } from 'react';

export const BtnCokies = () => {
    const [acceptCookies, setAcceptCookies] = useState<boolean>(() => {
        if (process.browser) {
            return localStorage.getItem('@cms:accepted_cookies') === 'accepted';
        }
        return false;
    });

    useEffect(() => {
        if (process.browser) {
          return localStorage.setItem('@cms:accepted_cookies',acceptCookies ? 'accepted':'');
        }
    },[acceptCookies]);

    function handleCookies(){ setAcceptCookies(true); }

    if(!acceptCookies) return <></>;
    return (
        <div className={`${style.container} z-depth-3`}>
            <div className={style.content}>
                <div className={style.titleCard}>
                    <strong>Esse site usa cookies</strong>
                    <CookiesIco />
                </div>
                <p>Nós armazenamos dados temorariamente para melhorar a sua experiencia de navegação e recomendar conteudo do seu enteresse. Ao utilizar esste site você concorda com tal monitoramento.</p>
                <a>Politica de Privacidade</a>
                <button onClick={handleCookies} className="btn grey darken-4 waves-effect waves-light">Ok</button>
            </div>
        </div>
    )
}