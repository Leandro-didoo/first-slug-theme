
import { useEffect, useState } from 'react';
import { Button, Card, Row, Col, Carousel, Navbar, Icon, NavItem } from 'react-materialize';
import style from './style.module.scss'
export const Nav = () => {
    const [scroll, setScroll] = useState(0);
   
    const animeScroll = () => {
        const windowTop = window.pageYOffset;
        setScroll(windowTop)
    }
    if (process.browser) {
        window.addEventListener('scroll', () => {
            animeScroll();
        })

    }
    return (
        <div>
            <Navbar
                alignLinks="right"
                brand={<a className="brand-logo" href="#">Logo</a>}
                id="mobile-nav"
                menuIcon={<Icon>menu</Icon>}
                centerChildren={true}
                fixed={true}
                className={`z-depth-0 ${style.custonNav}`}
                style={{
                    backgroundColor: scroll > 100? '#333':''
                }}
            >
                <li><a href="#services">Serviços</a></li>
                <li><a href="#about">sobre</a></li>
                <li><a href="#products">produtos</a></li>
                <li><a href="#testimonial">depoimento</a></li>
                <li><a href="#gallery">galeria</a></li>
                <li><a href="#blog">blog</a></li>
                <li><a href="#schedule">contato</a></li>
                <li><a style={{borderRadius: '2rem'}} href="#schedule" className="btn">Agendar horario</a></li>

            </Navbar>
        </div>
    )
}
