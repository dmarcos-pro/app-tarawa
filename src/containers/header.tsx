import React, { useEffect, useRef, useState } from 'react';
import { Flex, Link } from '@chakra-ui/react'

// Component
import Btn from '../components/btn';

// HOOK
import whichDevice from "../hooks/device";

// CSS
import header from '../styles/header.module.scss';
import animation from '../styles/animation.module.scss';

const Header: React.FC = () => {

    const device = whichDevice();
    
    const headerRef = useRef<HTMLDivElement>(null);
    const [logoWhite, setLogoWhite] = useState<boolean>(true);
    const [textColorWhite, setTextColorWhite] = useState<boolean>(true);
    const [menuOpen, setMenuOpen] = useState<boolean>(false);

    useEffect(() => {
        const handleScroll = () => {
            const headerHeight = headerRef.current?.clientHeight || 0;
            
            // change header element
            if (window.scrollY >= window.innerHeight - (headerHeight / 2)) {
                setTextColorWhite(false);
                setLogoWhite(false);
            } else {
                setTextColorWhite(true);
                setLogoWhite(true);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
        setTextColorWhite(false);
    }

    return (
        <Flex
            as="header"
            alignItems="center"
            justifyContent="space-between"
            p={30}
            pos="fixed"
            top="0"
            left="0"
            w="100%"
            zIndex={999999}
            className={header.header}
            ref={headerRef}
        >
            {device === "mobile" && (
                <figure
                    className={header.manageMenu}
                    onClick={() => { toggleMenu(); }}
                >
                    {menuOpen ? (
                        <img src="/img/close.svg" alt="Close" />
                    ) : (
                        <img src={`/img/bars_solid${textColorWhite ? '-white' : ''}.svg`} alt="Menu" />
                    )}
                </figure>
            )}
            <Flex
                as="nav"
                alignItems="center"
                className={`
                    ${device === "mobile" ? header.navMobile : ''}
                    ${menuOpen ? header.navOpen : ''}
                    ${header.nav}
                    ${animation.fadeDown}
                    ${animation.delay10}
                    ${animation.animated}
                `}
            >
                {device !== "mobile" && (
                    <Link
                        href="/"
                        pr={10}
                    >
                        <figure>
                            <img
                                src={`/img/logo_mini${logoWhite ? "-white" : ""}.svg`}
                                alt="Retour à l'accueil"
                                width="50px"
                                height="60px"
                            />
                        </figure>
                    </Link>
                )}
                <Link
                    href="/"
                    color={textColorWhite && !menuOpen ? "white" : "black"}
                    px={5}
                >
                    Séjours
                </Link>
                <Link
                    href="/"
                    color={textColorWhite && !menuOpen ? "white" : "black"}
                    px={5}
                >
                    Expériences
                </Link>
                <Link
                    href="/"
                    color={textColorWhite && !menuOpen ? "white" : "black"}
                    px={5}
                >
                    Découvertes
                </Link>
            </Flex>
            <Btn
                theme="primary"
                url="#"
            >
                Réserver
            </Btn>
        </Flex>
    );
};

export default Header;