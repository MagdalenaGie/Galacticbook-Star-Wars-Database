import React from 'react';
import lightsaber from './../../assets/lightsaber.png';

const Layout = (props) => {
    return(
        <div>
            <img src={lightsaber} alt="Might the force be with you!" style={{width: "80%"}}/>
            <main>
                {props.children}
            </main>
        </div>
    );
}

export default Layout;