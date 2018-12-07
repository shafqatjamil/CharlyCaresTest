import React from 'react';
import { Grid } from 'semantic-ui-react';
import styled from 'styled-components';

const CustomColumn = ({ isWhite, ...rest }) => <Grid.Column {...rest} />;

const WhiteColumn = styled(CustomColumn)`
  &&& {
    background: ${props => (!props.isWhite ? 'transparent' : '#fff')};
    border-radius: 0.3125rem;
    border: ${({ isWhite, theme }) =>
      !isWhite ? 0 : `1px solid ${theme.defaultGrey}`};
    height: 100%;
    min-height: 100vh;
    padding: 0 1rem !important;
  }
`;

export default WhiteColumn;
