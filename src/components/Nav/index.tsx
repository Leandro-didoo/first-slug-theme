
import { ReactChild, ReactNode, useEffect, useState } from 'react';
import { Button, Card, Row, Col, Carousel, Navbar, Icon, NavItem } from 'react-materialize';
import style from './style.module.scss'

type Props = {
    children: ReactNode,
    logo: ReactChild,
    color: string,
    colorTxt: string
  }
  

export const Nav = ({children, logo, color}:Props) => {
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
        <div 
    
        className={style.contentnav}>
            <Navbar
                alignLinks="right"
                brand={logo}
                id="mobile-nav"
                menuIcon={<Icon>menu</Icon>}
                centerChildren={true}
                fixed={true}
                className={`z-depth-0 ${style.custonNav}`}
                style={{
                    backgroundColor: scroll > 100? color :''
                }}
            >
               {children}
            </Navbar>
        </div>
    )
}
