import React from 'react';
import { FaHome, FaSearch } from "react-icons/fa"
import { Link } from 'react-router';

const ErrorPage = () => {
    return (
        <div>
            <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
                <div className="text-center">
                    <div className="mb-8">
                        <FaSearch className="h-24 w-24 text-secondary mx-auto mb-4" />
                        <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
                        <h2 className="text-2xl font-semibold text-gray-700 mb-2">Page Not Found</h2>
                        <p className="text-gray-600 mb-8">
                            Sorry, we couldn't find the page you're looking for.
                        </p>
                    </div>
                    <div className="space-x-4">
                        <Link
                            to="/"
                            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-secondary"
                        >
                            <FaHome className="mr-2" /> Go Home
                        </Link>
                        <Link
                            to="/all-items"
                            className="inline-flex items-center justify-center px-4 py-2 border border-secondary text-sm font-medium rounded-md text-secondary bg-white hover:bg-gray-50"
                        >
                            Browse Items
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;