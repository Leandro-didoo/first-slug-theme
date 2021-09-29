
import { ReactChild, ReactNode, useEffect, useState } from 'react';
import { Button, Card, Row, Col, Carousel, Navbar, Icon, NavItem } from 'react-materialize';
import style from './style.module.scss'

type Props = {
    children: ReactNode,
    logo: ReactChild,

  }
  

export const Nav = ({children, logo}:Props) => {
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
                brand={logo}
                id="mobile-nav"
                menuIcon={<Icon>menu</Icon>}
                centerChildren={true}
                fixed={true}
                className={`z-depth-0 ${style.custonNav}`}
                style={{
                    backgroundColor: scroll > 100? '#333':''
                }}
            >
               {children}
                
            </Navbar>
        </div>
    )
}
