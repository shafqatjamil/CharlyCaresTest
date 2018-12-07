import { isMobile } from 'react-device-detect';
import styled from 'styled-components';

const Confirmation = styled.div`
  position: ${isMobile ? 'fixed' : 'relative'};
  bottom: 0;
  left: 0;
  background-color: ${isMobile ? 'rgba(250, 250, 250, 0.9);' : props => (props.color == null ? '#fff' : props.color)};
  box-shadow: ${isMobile ? '0 0.5px 0 0 rgba(0, 0, 0, 0.25) inset' : 'unset'};
  border-top: ${props => (props.noBorder ? 0 : '1px solid #e6e6e6')};
  width: 100%;
  padding: 0.8735rem;
  text-align: center;
  z-index: ${isMobile ? 999 : 'unset'};
`;

export default Confirmation;
