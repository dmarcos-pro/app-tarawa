import React from 'react';
import headerStyles from '../styles/header.module.scss';
import animationStyles from '../styles/animation.module.scss';

const HeroBanner: React.FC = () => {
    return (
        <aside className={headerStyles.videoContainer}>
            <video
                width="100%"
                height="100%"
                controls={false}
                autoPlay
                loop
                muted
                className={headerStyles.video}
            >
                <source src="/video/teaser_header.mp4" type="video/mp4" />
                Votre navigateur ne prend pas en charge la balise vidéo.
            </video>
            <figure>
                <img
                    src="/img/logo-white.png"
                    alt="Logo"
                    width="220"
                    height="220"
                />
                <figcaption className={`
                        ${headerStyles.name}
                        ${animationStyles.fadeUp}
                        ${animationStyles.delay20}
                        ${animationStyles.animated}
                `}>
                    TARAWA <span>HOTEL</span>
                </figcaption>
            </figure>
        </aside>
    );
};

export default HeroBanner;
