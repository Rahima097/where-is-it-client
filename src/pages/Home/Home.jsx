import React from 'react';
import Banner from './Banner';
import LatestItem from './LatestItem';
import About from './About';
import Faq from './Faq';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <LatestItem></LatestItem>
            <About></About>
            <Faq></Faq>
            
        </div>
    );
};

export default Home;