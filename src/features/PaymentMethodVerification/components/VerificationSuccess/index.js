import { connect } from 'react-redux';
import { FamilyTabBar } from 'Components/NavigationTabs';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { Image, Grid } from 'semantic-ui-react';
import { InlineText } from 'Components/Text';
import CustomColumn from 'Components/CustomColumn';
import CustomRow from 'Components/CustomRow';
import Divider from 'Components/Divider';
import Layout from 'Components/Layout';
import Loader from 'Components/Loader';
import BasicButton from 'Components/Buttons/Basic';
import React, { Component } from 'react';

import checkButton from 'Assets/icons/icn-check-blue.svg';

const Icon = styled.img`

    padding-right: 10px;

`;

const Wraper = styled.div`

    display: flex;
    align-items: center;

`;

class VerificationSuccess extends Component {

    render() {

        return (
            <Grid>
            <CustomRow>
                <CustomColumn padding={'0px 20px'} width={12}>

                    {this.props.desktop && 
                    
                    <CustomColumn marginBottom="2.4375rem" mobile={16}>
                        <InlineText bold fontSize='22px' fontFamily="Martel">
                            <FormattedMessage id="payment_method_verification.success.deskop_title" />
                        </InlineText>
                    </CustomColumn>
                    }

                    <CustomColumn mobile={16}>
                        <Wraper>
                            <Icon src={checkButton} />
                            <InlineText fontSize='15px'>
                                <FormattedMessage id="payment_method_verification.success.first_title" />
                            </InlineText>
                        </Wraper>
                    </CustomColumn>

                    {this.props.hadPandingBooking &&
                        <CustomColumn mobile={16} padding={'16px 0px 0px 0px'}>
                            <Wraper>
                                <Icon src={checkButton} />
                                <InlineText fontSize='15px'>
                                    <FormattedMessage id="payment_method_verification.success.secound_title" />
                                </InlineText>
                            </Wraper>
                        </CustomColumn>
                    }

                    <CustomColumn mobile={16} padding={'15px 0px 0px 0px'}>
                        <InlineText light fontSize='15px'>
                            <FormattedMessage id="payment_method_verification.success.text" />
                        </InlineText>
                    </CustomColumn>

                    <CustomColumn mobile={16} padding={'16px 0px 0px 0px'}>
                        <InlineText light fontSize='15px'>
                            <FormattedMessage id="payment_method_verification.success.footer_text" />
                        </InlineText>
                    </CustomColumn>

                    {this.props.desktop && 
                        <CustomColumn mobile={16} padding={'20px 0px 0px 0px'}>
                            <BasicButton primary fluid onClick={() => this.props.history.push('/booking')}>
                                <FormattedMessage id="payment_method_verification.success.button_text" />
                            </BasicButton>
                        </CustomColumn>
                    }
                </CustomColumn>
            </CustomRow>
            </Grid>
        );
    }
}

export default VerificationSuccess;
