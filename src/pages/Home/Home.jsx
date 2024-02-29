import React from 'react';
import { SideBar, AppContent  } from '../../components/index';


const Home = () => {
    return (
        <div className='wrapper-home'>
            <SideBar />
            <AppContent />
        </div>
    )
}

export default Home;