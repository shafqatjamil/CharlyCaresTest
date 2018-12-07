import styled from 'styled-components';

const DesktopInput = styled.input`
  width: 100%;
  height: 100%;
  border: 0;
  background: transparent;
  color: ${props => props.theme.secondaryColor};
  font-family: ${props => props.theme.primaryFont};
  text-align: right;
  cursor: pointer;

  ::placeholder {
    color: ${props => props.theme.secondaryColor};
  }
`;

export default DesktopInput;
