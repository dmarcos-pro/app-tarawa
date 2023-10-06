import React, { RefObject } from "react";
import { Center, Box, Text, Heading, Flex, HStack } from '@chakra-ui/react';

// COMPONENTS
import Btn from '../../components/btn';

// HOOK
import useScrollAnimation from "../../hooks/scrollAnimation";

// CSS
import common from '../../styles/homepage.module.scss'
import animation from '../../styles/animation.module.scss'

const Description: React.FC = () => {

    const mainBoxRef: RefObject<HTMLDivElement> = useScrollAnimation();

    return (
        <Center
            bg="white"
            py={{ base: 50, md: 100 }}
            px={5}
            ref={mainBoxRef}
        >
            <Box maxW='1400'>
                <Text
                    className={`anim ${animation.fadeLeft} ${common.subtitle}`}
                    pb={{ base: 5, md: 5 }}
                    fontSize={{ base: '32px', md: '48px' }}
                >
                    Tarawa Hotel 5 étoiles
                </Text>
                <Flex flexDir={{ base: 'column', md: 'row' }}>
                    <Box flex={{ base: 'none', md: 5 }}>
                        <Heading
                            as="h1"
                            fontSize={{ base: '40px', md: '72px' }}
                            className={`anim ${animation.fadeLeft}`}
                        >
                            Détente. Relaxation. Silence.
                        </Heading>
                    </Box>
                    <Box
                        flex={{ base: 'none', md: 7 }}
                        pl={{ base: 0, md: 100 }}
                        pt={{ base: 5, md: 0 }}
                    >
                        <Text
                            fontSize={{ base: '24px', md: '40px' }}
                            className={`anim ${animation.fadeRight}`}
                        >
                            Surplombant les plages de sable blanc de l'île de Saint-Barthélemy, le <b>Tarawa Hotel</b> est le lieu rêvé des voyageurs en quête d'une escapade luxueuse en toute intimité.
                        </Text>
                        <HStack
                            flexDir={{ base: 'column', md: 'row' }}
                            spacing='16px'
                            align="flex-start"
                            mt={{ base: 5, md: 10 }}
                            className={`anim ${animation.fadeUp}`}
                        >
                            <Box>
                                <Btn theme="primary" url="#">
                                    Voir les chambres
                                </Btn>
                            </Box>
                            <Box>
                                <Btn theme="secondary" url="#">
                                    Comparer les chambres
                                </Btn>
                            </Box>
                        </HStack>
                    </Box>
                </Flex>
            </Box>
        </Center>
    )
}

export default Description;