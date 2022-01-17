import React, {useEffect, useState} from 'react'

const Home = () => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        // Update the document title using the browser API    
        // document.title = `You clicked ${count} times`;
        // alert('rucjghbexj')
    });

    // setCount(count + 1)

    return (
        <React.Fragment>
            <p>This is home</p>
        </React.Fragment>
    )
}

export default Home