import styled from 'styled-components';
import { isMobile } from 'react-device-detect';

const Messages = styled.div`
  background: #e6e6e6;
  padding-bottom: 7rem;
  overflow-y: scroll;
  width: 100%;
  padding-top: 2rem;
  ${!isMobile
    ? `
    height: calc(100vh - 8.24rem);
    padding: 0 1rem;
    padding-bottom: 3rem;
    margin: 0 -1rem;
    width: auto;
  `
    : null};
`;

export default Messages;
