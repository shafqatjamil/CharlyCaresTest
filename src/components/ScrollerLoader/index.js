import { Loader } from 'semantic-ui-react';
import React from 'react';
import styled from 'styled-components';

const ScrollerLoaderWrapper = styled.div`
  position: relative;
  width: 100%;
  margin-top: 5vw;
  margin-bottom: 5vw;
  height: 8vw;
`;

const ScrollerLoader = () => (
  <ScrollerLoaderWrapper>
    <Loader size="medium" active />
  </ScrollerLoaderWrapper>
);

export default ScrollerLoader;
