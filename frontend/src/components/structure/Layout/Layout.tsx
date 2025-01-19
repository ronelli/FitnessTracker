import React from 'react';
import './Layout.css';
import {BrowserRouter} from 'react-router-dom';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';

const Layout: React.FC = () => {
  return (
    <div className='Layout'>
      <BrowserRouter>
        <Header></Header>
        <Main></Main>
        <Footer></Footer>
      </BrowserRouter>
    </div>
  )
};
export default Layout;