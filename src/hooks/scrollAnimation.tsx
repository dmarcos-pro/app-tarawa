import { useEffect, useRef, RefObject } from "react";

// CSS
import animation from '../styles/animation.module.scss'

const useScrollAnimation = (): RefObject<HTMLDivElement> => {
    const mainBoxRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const mainBox = mainBoxRef.current;
        
        if (!mainBox) {
            return;
        }
        const elementsToAnimate = mainBox.getElementsByClassName('anim') as HTMLCollectionOf<HTMLElement>;

        const handleScroll = () => {
            // Add class animated when element is visible
            for (let i = 0; i < elementsToAnimate.length; i++) {
                const element = elementsToAnimate[i];
                const rect = element.getBoundingClientRect();

                if (rect.top < window.innerHeight * 0.8) {
                    element.classList.add(animation.animated);
                }
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return mainBoxRef;
};

export default useScrollAnimation;