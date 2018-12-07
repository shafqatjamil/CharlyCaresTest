import { getAge } from 'Utils';
import Divider from 'Components/Divider';
import React from 'react';
import styled from 'styled-components';
import { isMobile } from 'react-device-detect';

import Angel from '../components/Angel';
import Timer from './components/Timer';

const TimerWrapper = styled.div`
  padding: 1rem 1rem 2rem;
`;
const AngelWrapper = styled.div`
  padding: 1rem 1rem 0;
  padding-right: 0 !important;
`;

const onAngelSelect = (id, history) => () =>{
  if(isMobile){
    history.push('/angel/' + id, { from: 'favorites' });
  }
  else{
    history.push('/favorites/angel/' + id, { from: 'favorites' });
  }
}

const ActiveBabySitting = ({ activeBabysitting = {}, history }) => {
  return (
    <div>
      <Divider />
      <AngelWrapper>
        <Angel
          onAngelSelect={onAngelSelect(activeBabysitting.angel.id, history)}
          div
          id={activeBabysitting.angel.id}
          img={activeBabysitting.angel.image}
          name={activeBabysitting.angel.first_name}
          age={getAge(activeBabysitting.angel.birthdate)}
        />
      </AngelWrapper>
      <TimerWrapper>
        <Timer
          history={history}
          startTime={activeBabysitting.start_time}
          endTime={activeBabysitting.end_time}
          angel={activeBabysitting.angel}
          transactionCosts={activeBabysitting.transactioncosts}
          credit={activeBabysitting.credit}
          bookingId={activeBabysitting.booking_id}
        />
      </TimerWrapper>
    </div>
  );
};

export default ActiveBabySitting;
