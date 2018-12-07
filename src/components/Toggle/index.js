import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Toggle = ({ name, onChange, value, onBlur }) => {
  return (
    <Container>
      <div className="ui toggle checkbox">
        <input
          onChange={onChange}
          onBlur={onBlur}
          id="check"
          type="checkbox"
          name={name}
          checked={value}
          value={value}
        />
        <label htmlFor="check" />
      </div>
    </Container>
  );
};

export default Toggle;
