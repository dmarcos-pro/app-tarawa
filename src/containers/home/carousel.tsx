import { useState, useEffect, useRef, useCallback, RefObject } from "react";
import { Box, HStack, Heading, Text, Spacer } from '@chakra-ui/react';

// HOOK
import useScrollAnimation from "../../hooks/scrollAnimation";

// CSS
import common from '../../styles/homepage.module.scss'
import animation from '../../styles/animation.module.scss'

interface VideoState {
    videoRef1: boolean;
    videoRef2: boolean;
}
const Carousel: React.FC = () => {

    const mainBoxRef: RefObject<HTMLDivElement> = useScrollAnimation();

    const carouselRef = useRef<HTMLDivElement>(null);
    const [isCarouselActive, setIsCarouselActive] = useState(false);
    const [carouselHeight, setCarouselHeight] = useState(0);
    
    useEffect(() => {
        const handleDocumentWheel = (event: WheelEvent) => {
            if (isCarouselActive && !event.defaultPrevented) {
                event.preventDefault();
                carouselRef.current?.scrollBy(event.deltaY, 0);
            }
        };

        document.addEventListener("wheel", handleDocumentWheel, {
            passive: false,
        });

        return () => {
            document.removeEventListener("wheel", handleDocumentWheel);
        };
    }, [isCarouselActive]);

    useEffect(() => {
        // Targeting carousel items
        const carouselItems = carouselRef.current?.children[0].children;

        // Init max and min position
        let highestTop = Infinity;
        let lowestBottom = -Infinity;

        // Looping carousel items
        for (let i = 0; carouselItems && i < carouselItems.length; i++) {
            const elementTop = carouselItems[i].getBoundingClientRect().top;
            const elementBottom = carouselItems[i].getBoundingClientRect().bottom;

            // Update max and min position
            highestTop = Math.min(highestTop, elementTop);
            lowestBottom = Math.max(lowestBottom, elementBottom);
        }

        // Height Carousel
        setCarouselHeight(lowestBottom - highestTop);
    }, [carouselHeight]);

    useEffect(() => {
        const currentRef = carouselRef.current;
        
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 1,
        };
        
        // Init carousel actived
        const handleIntersection = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setIsCarouselActive(true);
                } else {
                    setIsCarouselActive(false);
                }
            });
        };

        const intersectionObserver = new IntersectionObserver(handleIntersection, options);

        if (currentRef) {
            intersectionObserver.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                intersectionObserver.unobserve(currentRef);
            }
        };
    }, []);

    // Updating carousel state
    const handleScroll = useCallback((event: React.WheelEvent<HTMLDivElement>) => {
        const delta = event.deltaY !== undefined ? event.deltaY : (event.deltaY || -event.wheelDelta);

        if (Math.abs(delta) > 0 && Math.abs(delta) > Math.abs(event.deltaX)) {
            const isEndOfCarousel = carouselRef.current && (carouselRef.current.scrollLeft + carouselRef.current.clientWidth >= carouselRef.current.scrollWidth);

            if (
                carouselRef.current !== null && carouselRef.current !== undefined &&
                carouselRef.current.scrollLeft !== undefined &&
                carouselRef.current.scrollLeft >= 0 &&
                carouselRef.current.clientWidth !== undefined &&
                carouselRef.current.scrollLeft + carouselRef.current.clientWidth <= carouselRef.current.scrollWidth
            ) {
                    if (!isCarouselActive) {
                        setIsCarouselActive(true);
                    }
                    if (carouselRef.current?.scrollLeft === 0) {
                        setIsCarouselActive(false);
                    }
            }
            if (isEndOfCarousel) {
                setIsCarouselActive(false);
            }
        }
    }, [isCarouselActive]);

    const [isVideoPlaying, setIsVideoPlaying] = useState<VideoState>({
        'videoRef1': false,
        'videoRef2': false
    });
    const videoRef1 = useRef<HTMLVideoElement>(null);
    const videoRef2 = useRef<HTMLVideoElement>(null);

    const videoRefs = { videoRef1, videoRef2 };
    
    // Updating video
    const handleVideoClick = (videoRefKey: keyof VideoState) => {
        const videoRef = videoRefs[videoRefKey];
        const video = videoRef.current;
    
        setIsVideoPlaying(prevState => ({
            ...prevState,
            [videoRefKey]: video?.paused ? false : true
        }));
    
        if (video?.paused) {
            video.play();
        } else {
            video?.pause();
        }
    };

    return (
        <Box ref={mainBoxRef} style={{ height: carouselHeight + `px`}}>
            <Box
                className={`anim ${animation.fadeRight} ${common.carousel}`}
                ref={carouselRef}
                onWheel={handleScroll}
            >
                <Box>
                    <HStack alignItems="flex-end">
                        <Box
                            w={{ base: '60vw', md: '25vw' }}
                            mb={{ base: 100, md: 150 }}
                        >
                            <img
                                src="/img/slideshow-01.jpg"
                                width="100%"
                                alt="Image 1"
                            />
                        </Box>
                        <Box
                            w={{ base: '60vw', md: '35vw' }}
                            ml={{ base: 50, md: 100 }}
                        >
                            <Heading
                                as="h3"
                                fontSize={{ base: '24px', md: '40px' }}
                            >
                                Toutes les saveurs des îles
                            </Heading>
                            <Text
                                fontSize={{ base: '16px', md: '24px' }}
                                mt={15}
                                mb={{ base: 50, md: 100 }}
                                >
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsam esse beatae recusandae ab repellat saepe. Enim aspernatur hic fuga maiores blanditiis, similique id porro vero.
                            </Text>
                            <Box
                                className={common.containerVideo}
                                onClick={() => { handleVideoClick('videoRef1'); }}
                                >
                                {!isVideoPlaying['videoRef1'] && (
                                    <img src="/img/play-btn.svg" alt="Icone play" />
                                )}
                                <video
                                    ref={videoRef1}
                                    width="100%"
                                    height="360px"
                                    controls={false}
                                    muted
                                    className={common.video}
                                >
                                    <source src="/video/slideshow-02.mp4" type="video/mp4" />
                                    Votre navigateur ne prend pas en charge la balise vidéo.
                                </video>
                            </Box>
                        </Box>
                        <Spacer w="10vw" />
                        <Box
                            w={{ base: '60vw', md: '25vw' }}
                            mb={{ base: 50, md: 150 }}
                        >
                            <img
                                src="/img/slideshow-03.jpg"
                                width="100%"
                                alt="Image 2"
                                />
                        </Box>
                        <Spacer w="10vw" />
                        <Box
                            w={{ base: '90vw', md: '50vw' }}
                            mb={{ base: 150, md: 50 }}
                        >
                            <img
                                src="/img/slideshow-05.jpg"
                                width="100%"
                                alt="Image 3"
                                />
                        </Box>
                        <Spacer w="10vw" />
                        <Box
                            w={{ base: '90vw', md: '50vw' }}
                            mb={150}
                            className={common.containerVideo}
                            onClick={() => { handleVideoClick('videoRef2'); }}
                            >
                            {!isVideoPlaying['videoRef2'] && (
                                <img src="/img/play-btn.svg" alt="Icone play" />
                            )}
                            <video
                                ref={videoRef2}
                                width="100%"
                                height="700px"
                                controls={false}
                                muted
                                className={common.video}
                            >
                                <source src="/video/slideshow-06.mp4" type="video/mp4" />
                                Votre navigateur ne prend pas en charge la balise vidéo.
                            </video>
                        </Box>
                        <Spacer w="10vw" />
                        <Box
                            w={{ base: '60vw', md: '25vw' }}
                        >
                            <img
                                src="/img/slideshow-07.jpg"
                                width="100%"
                                alt="Image 4"
                                />
                        </Box>
                    </HStack>
                </Box>
            </Box>
        </Box>
    )
}
export default Carousel;