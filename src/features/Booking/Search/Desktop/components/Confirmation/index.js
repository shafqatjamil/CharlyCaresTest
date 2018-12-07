import styled from 'styled-components';
import { isMobile } from 'react-device-detect';

const Confirmation = styled.div`
  background-color: #f9f8f9;
  box-shadow: ${isMobile ? '0 0.5px 0 0 rgba(0, 0, 0, 0.25) inset' : 'unset'};
  border-top: 1px solid #e6e6e6;
  padding: 0.4rem;
  text-align: center;
  position: sticky;
  bottom: 0;
  width: 29.04rem;
`;
// padding: 0.8735rem;
export default Confirmation;
