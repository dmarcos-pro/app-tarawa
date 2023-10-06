// theme.js
import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
    fonts: {
        body: "'Samsung One', sans-serif",
        heading: "'Samsung Sharp Bold', sans-serif",
        btn: "'Samsung Sharp Sans', sans-serif"
    },
    colors: {
        primary: '#009f9f',
        lightenPrimary: '#00CBCB',
        white: '#ffffff',
        black: '#3b3b3b',
        red: "#999999"
        // ... autres couleurs personnalisées
    },
});

export default theme;