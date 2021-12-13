import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { actionFetchID } from '../redux/actions';

function BebidaDetails() {
  const disp = useDispatch();
  const { pathname } = useLocation();
  const [, PAGE, ID] = pathname.split('/');

  useEffect(() => {
    disp(actionFetchID(ID, PAGE));
  }, []);

  return (
    <>
      <h1>detalhes da Bebida</h1>
      <div>
        Empty
      </div>
    </>
  );
}

export default BebidaDetails;
