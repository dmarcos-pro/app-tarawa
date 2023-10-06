import React, { RefObject } from "react";
import { Box, Heading} from '@chakra-ui/react';

// HOOK
import useScrollAnimation from "../../hooks/scrollAnimation";

// CSS
import animation from '../../styles/animation.module.scss'

const BannerContent: React.FC = () => {
    const mainBoxRef: RefObject<HTMLDivElement> = useScrollAnimation();

    return (
        <Box ref={mainBoxRef}>
            <Heading
                as="h2"
                pt={{ base: 100, md: 300 }}
                px={{ base: 10, md: 10 }}
                pb={{ base: 100, md: 200 }}
                textAlign="center"
                fontSize={{ base: '42px', md: '136px' }}
                className={`anim ${animation.fade} ${animation.delay10}`}
            >
                Un hôtel pas comme&nbsp;les autres
            </Heading>
        </Box>
    )
}
export default BannerContent;