
import { ReactChild, ReactNode, useEffect, useState } from 'react';
import { Button, Card, Row, Col, Carousel, Navbar, Icon, NavItem } from 'react-materialize';
import { NavType } from '../../types/typesdef';
import style from './style.module.scss'


type Props = {
    children: ReactNode,
    color: string,
    colorTxt: string,
    data: NavType,
  }
export const Nav = ({children, color, data}:Props) => {
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
                brand={ <a className={style.logo}><img  src={data.logo} alt="" /></a>}
                id="mobile-nav"
                menuIcon={<Icon>menu</Icon>}
                centerChildren={true}
                fixed={true}
                className={`z-depth-0 ${style.custonNav}`}
                style={{
                    backgroundColor: scroll > 100? data.background :''
                }}
            >
               
               {children}
            </Navbar>
        </div>
    )
}
