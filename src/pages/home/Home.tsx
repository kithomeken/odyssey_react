import React, {useEffect, useState} from 'react'
import { Helmet } from 'react-helmet'

const Home = () => {
    return (
        <React.Fragment>
            <Helmet>
                <title>Home</title>
            </Helmet>

            <div className={`px-12 py-3 w-full form-group text-2xl mb-3`}>
                Welcome to Odyssey
            </div>
        </React.Fragment>
    )
}

export default Home