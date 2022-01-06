import React from 'react';
import rockGlass from '../images/rockGlass.svg';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function NotFound() {
  return (
    <div className="meals">
      <Header pageTitle="Not Found" />
      <span className="logo">TRYBE</span>
      <object className="rocksGlass" type="image/svg+xml" data={ rockGlass }>
        Glass
      </object>
      <h1>Página não encontrada :(</h1>
      <Footer />
    </div>
  );
}
