import { Header } from 'semantic-ui-react';
import CustomColumn from 'Components/CustomColumn';
import CustomRow from 'Components/CustomRow';
import React from 'react';

import Angel from './components/Angel';
import AngelsList from './components/AngelsList';
import Description from './components/Description';

const DirectAcceptance = ({
  selectedAngels = [],
  onToggleAngelApproval,
  approval,
}) => (
  <React.Fragment>
    <CustomRow padding="0 0 2rem 0">
      <CustomColumn padding="0 0 1rem 0">
        <Header as="h5">Direct acceptance</Header>
      </CustomColumn>
      <CustomColumn padding="0 0 1rem 0">
        <Description>
          For this multi-day application, after your response from the Angel,
          your acceptance is required. Indicate which Angels you accept
          immediately when they are available all of the days.
        </Description>
      </CustomColumn>
      <CustomColumn>
        <AngelsList>
          {selectedAngels.map(angel => (
            <Angel
              key={angel.id}
              approval={approval}
              onToggleAngelApproval={onToggleAngelApproval(angel.id)}
              img={angel.image || angel.profile.image}
              name={angel.first_name || angel.profile.first_name}
              liked={angel.is_liked}
              forApproval={approval.includes(angel.id)}
            />
          ))}
        </AngelsList>
      </CustomColumn>
    </CustomRow>
  </React.Fragment>
);

export default DirectAcceptance;
