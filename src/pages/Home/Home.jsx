import React from 'react';
import { Helmet } from 'react-helmet-async';
import Banner from './Banner';
import LatestItem from './LatestItem';
import About from './About';
import Faq from './Faq';
import WobbleBgAnimation from '../Shared/BackgroundAnimation/WobbleBgAnimation';


const Home = () => {
    return (
        <div className='relative overflow-hidden min-h-screen'>
            <Helmet>
                <title>Home | WhereIsIt</title>
            </Helmet>
            <WobbleBgAnimation></WobbleBgAnimation>
            <div className='relative z-10'>
                <Banner></Banner>
                <LatestItem></LatestItem>
                <About></About>
                <Faq></Faq>
            </div>

        </div>
    );
};

export default Home;