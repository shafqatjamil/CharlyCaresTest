import styled from 'styled-components';

const Cell = styled.div`
  height: 2.5rem;
  border: 0;
  outline: 0;
  border-bottom: ${({ available }) =>
    available ? '1px solid #c7c7c9;' : 'none;'};
  background: ${({ available }) => (available ? '#fff' : '#e6e6e6')};
`;

export default Cell;
