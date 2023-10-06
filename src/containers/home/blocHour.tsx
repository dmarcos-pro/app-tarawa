import React, { RefObject, useState, useEffect, useRef } from "react";
import { Box, Text, Flex} from '@chakra-ui/react';

// HOOK
import useScrollAnimation from "../../hooks/scrollAnimation";

// COMPONENTS
import Btn from '../../components/btn';

// CSS
import common from '../../styles/homepage.module.scss'
import animation from '../../styles/animation.module.scss'

interface BoxProps {
    readonly content: string;
    readonly hour: string;
    readonly start: string;
    readonly end: string;
    readonly title: string;
    readonly cta: string;
    readonly url: string;
    readonly sourceMedia: string;
    readonly heightMedia: string;
}
const BlocHour: React.FC<BoxProps> = ({ content, hour, start, end, title, cta, url, sourceMedia, heightMedia }) => {

    const mainBoxRef: RefObject<HTMLDivElement> = useScrollAnimation();
    
    const clockRef = useRef<HTMLSpanElement>(null);
    const [currentMinutes, setCurrentMinutes] = useState<string>(start);

    useEffect(() => {
        // Scroll Animation on hour items 
        const clock = clockRef.current;
        const handleIntersection = (entries: IntersectionObserverEntry[], start: string, end: string, setCurrent: (value: string) => void) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    startAnimation(start, end, setCurrent);
                }
            });
        };

        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0,
        };

        const intersectionObserverAm = new IntersectionObserver((entries) => {
            handleIntersection(entries, start, end, setCurrentMinutes);
        }, options);

        if (clock) {
            intersectionObserverAm.observe(clock);
        }

        return () => {
            if (clock) {
                intersectionObserverAm.unobserve(clock);
            }
        };
    }, [clockRef, start, end]);

    // Init Hour items
    const startAnimation = (start: string, end: string, setCurrent: (value: string) => void) => {
        let currentCount = parseInt(start);
    
        const intervalId = setInterval(() => {
            setCurrent(currentCount.toString());
            currentCount++;
    
            if (currentCount > parseInt(end)) {
                clearInterval(intervalId);
            }
        }, 2000 / (parseInt(end) - parseInt(start)));
    
        return () => clearInterval(intervalId);
    };

    return (
        <Box
            as="section"
            bg="white"
            pb={150}
            ref={mainBoxRef}
            className={common.article}
        >
            <Flex
                alignItems="center"
                flexDirection={{ base: 'column', md: content === "left" ? 'row' : 'row-reverse' }}
            >
                <Box
                    flex={{ base: 'none', md: 5 }}
                    bg={{ base: 'white', md: 'transparent' }}
                    zIndex={1}
                >
                    <Flex textAlign="center">
                        <Box flex="1" px={50}>
                            <Text
                                as="span"
                                className={common.time}
                                ref={clockRef}
                                fontSize={{ base: '96px', md: '120px' }}
                            >
                                {hour}:{currentMinutes.toString().padStart(2, '0')}
                            </Text>
                            <Text
                                fontSize={{ base: '24px', md: '42px' }}
                                className={`anim ${animation.fadeUp}`}
                            >
                                {title}
                            </Text>
                            <Box
                                mt={{ base: 5, md: 10 }}
                                className={`anim ${animation.fadeUp} ${animation.delay5}`}
                            >
                                <Btn theme="secondary" url={url}>
                                    {cta}
                                </Btn>
                            </Box>
                        </Box>
                    </Flex>
                </Box>
                <Box
                    flex={{ base: 'none', md: 7 }}
                    mt={{ base: 20, md: 0 }}
                    borderLeftRadius={content === "left" ? 15: 0}
                    borderRightRadius={content === "right" ? 15: 0}
                    overflow="hidden"
                    className={common.containerVideo}
                    height={heightMedia}
                >
                    <video
                        width="auto"
                        height="100%"
                        controls={false}
                        autoPlay
                        loop
                        muted
                        className={`anim ${content === "left" ? animation.fadeRight : animation.fadeLeft} ${common.video}`}
                    >
                        <source src={`/video/${sourceMedia}.mp4`} type="video/mp4" />
                        Votre navigateur ne prend pas en charge la balise vidéo.
                    </video>
                </Box>
            </Flex>
        </Box>
    )
}

export default BlocHour;