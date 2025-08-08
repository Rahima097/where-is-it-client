import React from 'react';
import { Helmet } from 'react-helmet-async';
import Banner from './Banner';
import LatestItem from './LatestItem';
import About from '../Shared/About';
import Faq from '../Shared/Faq';
import Newsletter from './Newsletter';
import Testimonial from './Testimonial';


const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Home | WhereIsItHub</title>
            </Helmet>
            <Banner></Banner>
            <LatestItem></LatestItem>
            <About></About>
            <Testimonial></Testimonial>
            <Newsletter></Newsletter>
        </div>
    );
};

export default Home;