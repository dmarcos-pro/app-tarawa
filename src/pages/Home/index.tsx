import { Box } from '@chakra-ui/react';

// CONTAINERS
import Header from '../../containers/header'
import Footer from '../../containers/footer'
import HeroBanner from '../../containers/heroBanner'
import Description from '../../containers/home/description'
import BlocHour from '../../containers/home/blocHour'
import BannerContent from '../../containers/home/bannerContent'
import Carousel from '../../containers/home/carousel'

// CSS
import common from '../../styles/homepage.module.scss'

interface BlocHourProps {
    content: 'left' | 'right';
    hour: string;
    start: string;
    end: string;
    title: string;
    cta: string;
    url: string;
    sourceMedia: string;
    heightMedia: string;
}

const Home: React.FC = () => {
    const blocHourData: BlocHourProps[] = [
        {
            content: 'left',
            hour: '10',
            start: '0',
            end: '34',
            title: 'Un réveil en douceur',
            cta: 'Voir les chambres',
            url: '/url-room',
            sourceMedia: 'timeline-01',
            heightMedia: '640px',
        }, {
            content: 'right',
            hour: '21',
            start: '30',
            end: '57',
            title: 'Soleil, mer, détente',
            cta: 'Voir les offres',
            url: '/url-offer',
            sourceMedia: 'timeline-05',
            heightMedia: '1124px',
        }
    ];

    return (
        <>
            <Header />
            <HeroBanner />
            <Box as="main">
                <Description />
                {blocHourData.map( (data, index) => (
                    <BlocHour key={index} {...data} />
                ))}
                <Box
                    className={common.bgGrey}
                    pb={100}
                >
                    <BannerContent />
                    <Carousel />
                </Box>
            </Box>
            <Footer />
        </>
    )
}

export default Home;
