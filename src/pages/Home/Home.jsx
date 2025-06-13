import React from 'react';
import Banner from './Banner';
import LatestItem from './LatestItem';
import About from './About';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <LatestItem></LatestItem>
            <About></About>
            
        </div>
    );
};

export default Home;