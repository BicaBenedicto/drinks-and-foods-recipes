import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { actionFetchID } from '../redux/actions';

function ComidaDetails() {
  const disp = useDispatch();
  const { pathname } = useLocation();
  const [, PAGE, ID] = pathname.split('/');

  useEffect(() => {
    disp(actionFetchID(ID, PAGE));
  }, []);

  return (
    <>
      <h1>detalhes da comida</h1>
      <div>
        Empty
      </div>
    </>
  );
}

export default ComidaDetails;
