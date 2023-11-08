import { Helmet, HelmetProvider } from 'react-helmet-async';
import React from 'react'

const Meta = ({ title }) => {
    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>eMithila-{title}</title>
                </Helmet>
            </HelmetProvider>
        </>
    )
}

export default Meta
