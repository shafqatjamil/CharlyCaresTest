import { getAge } from 'Utils';
import React from 'react';
import styled from 'styled-components';
import curry from 'ramda/es/curry';
import memoizeWith from 'ramda/es/memoizeWith';
import { isMobile } from 'react-device-detect';

import Angel from '../components/Angel';

const Container = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
`;

const onAngelSelect = memoizeWith(
  id => id,
  curry((id, history, _e) => {
    if(isMobile){
      history.push('/angel/' + id, { from: 'favorites' });
    }
    else{
      history.push('/favorites/angel/' + id, { from: 'favorites' });
    }
  })
);

const AngelsList = ({ favorites = [], history }) => {
  return (
    <Container>
      {favorites.map(angel => (
        <Angel
          onAngelSelect={onAngelSelect(angel.id, history)}
          img={angel.image}
          key={angel.id}
          name={angel.first_name}
          age={getAge(angel.birthdate)}
          phone={angel.phone}
          id={angel.id}
          userId={angel.user_id}
          history={history}
        />
      ))}
    </Container>
  );
};

export default AngelsList;
