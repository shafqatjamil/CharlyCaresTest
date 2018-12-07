import { FormattedMessage } from 'react-intl';
import { Header } from 'semantic-ui-react';
import { Paragraph } from 'Components/Text';
import Wrapper from './components/Wrapper';
import Container from './components/Container';
import React, { Fragment } from 'react';
import Title from './components/Title';
import { Accordion, AccordionItem } from 'react-sanfona';
import styled from 'styled-components';
import addBtnIcon from '../../../assets/icons/add_support_btn.png';
import { Image } from 'semantic-ui-react';
const CustomImage = styled(Image)`
  &&& {
    width: 15px;
    height: 15px;
  }
`;
const ViewContainer = styled.div`
  padding-top: 1rem;
`;
class SupportHomeDesktop extends React.PureComponent {
  render() {
    return (
      <Wrapper>
        <Title>
          <FormattedMessage id= {this.props.title}/>
        </Title>
        <Container>
          <h1 style = {{fontSize : 16,fontWeight : '400'}}>Staat jou vraag hier tussen?</h1>
          <ViewContainer>
          <Accordion>
            {this.props.bookings[0].items.map(item => {
            return (
                
                <AccordionItem style = {{marginBottom : 20}} title= {
                  <div style = {{display: 'flex',flexDirection: 'row'}}>
                    <div style = {{marginTop : 4 }}>
                      <CustomImage src={addBtnIcon} />
                    </div>
                    <div 
                    style = {{fontSize : 15,marginLeft:15,color : 'rgb(53,50,58)'}}>{`${item.title}`}
                    </div>
                  </div>
                }
                  expanded={item === 1}>
                  <div style = {{fontSize : 15,marginLeft : 30,marginTop : 5,marginBottom : 10,color : 'rgb(117,116,121)'}}>
                    {`${item.body}`}
                  </div>
                </AccordionItem>
            );
          })}
          </Accordion>
          </ViewContainer>
        </Container>
      </Wrapper>
    );
  }
}

export default SupportHomeDesktop;
