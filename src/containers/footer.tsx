import React from 'react';
import { Center, Box } from '@chakra-ui/react';

const Footer: React.FC = () => {
    return (
        <Center
            as="footer"
            bg="white"
            py={{ base: 100, md: 250 }}
        >
            <Box
                w={{ base: '80px', md: '220px' }}
                h={{ base: '80px', md: '220px' }}
            >
                <img
                    src="/img/logo.svg"
                    alt="Logo"
                    width="100%"
                    height="100%"
                />
            </Box>
        </Center>
    )
}
export default Footer;