import styled from 'styled-components';
import { Grid } from 'semantic-ui-react';
import { isMobile } from 'react-device-detect';

const CardGrid = styled(Grid)`
  &&& {
    margin: 0;
    ${!isMobile ? `background: #fff;` : ''};
  }
`;

export default CardGrid;
