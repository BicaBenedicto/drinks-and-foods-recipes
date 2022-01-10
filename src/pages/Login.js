import React from 'react';
import rockGlass from '../images/rockGlass.svg';
import DataUserLogin from '../components/DataUserLogin';
import '../styles/Login.css';

export default function Login() {
  return (
    <div className="meals">
      <span className="logo">Drinks and Foods</span>
      <object className="rocksGlass" type="image/svg+xml" data={ rockGlass }>
        Glass
      </object>
      <DataUserLogin />
    </div>
  );
}
