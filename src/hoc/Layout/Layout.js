import React from 'react';
// import Toolbar from '../../components/Navigation/Toolbar/Toolbar';

const Layout = (props) => {
    return(
        <div>
            {/* <Toolbar/> */}
            <main style={{marginTop: "65px"}}>
                {props.children}
            </main>
        </div>
    );
}

export default Layout;