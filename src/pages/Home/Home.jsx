import React from 'react';
import { Helmet } from 'react-helmet-async';
import Banner from './Banner';
import LatestItem from './LatestItem';
import About from './About';
import Faq from './Faq';


const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Home | WhereIsIt</title>
            </Helmet>
            <Banner></Banner>
            <LatestItem></LatestItem>
            <About></About>
            <Faq></Faq>
        </div>
    );
};

export default Home;