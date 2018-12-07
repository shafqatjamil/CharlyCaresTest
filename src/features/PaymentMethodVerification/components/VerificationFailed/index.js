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


import {
    getMembershipData,
  } from '../../../Profile/AccountSettings/selectors';

import closeButton from 'Assets/icons/btn-large-close.svg';

const Icon = styled.img``;

const Wraper = styled.div`

    display: flex;
    align-items: center;

`;

function generateLink(s) {
    if (typeof s !== 'string' || !s) return '';
    var e = {},
      i,
      b = 0,
      c,
      x,
      l = 0,
      a,
      r = '',
      w = String.fromCharCode,
      L = s.length;
    var A = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    for (i = 0; i < 64; i++) {
      e[A.charAt(i)] = i;
    }
    for (x = 0; x < L; x++) {
      c = e[s.charAt(x)];
      b = (b << 6) + c;
      l += 6;
      while (l >= 8) {
        ((a = (b >>> (l -= 8)) & 0xff) || x < L - 2) && (r += w(a));
      }
    }
    return r;
  }

class VerificationFailed extends Component {

    constructor(props){
        super(props);

        this.goToProfile = this.goToProfile.bind(this);
        this.goToPayment = this.goToPayment.bind(this);
    }

    goToProfile()
    {
        this.props.history.push('/profile/settings');
    }

    goToPayment(payment_link)
    {
        const link = generateLink(this.props.membershipData.payment_link);

        window.open(link, '_blank');
    }

    render() {

        return (
            <Grid>
            <CustomRow>
                <CustomColumn padding={'0px 20px'} width={12}>

                    {this.props.desktop && 
                                    
                        <CustomColumn marginbottom="2.4375rem" mobile={16}>
                            <InlineText bold fontSize='22px' fontFamily="Martel">
                                <FormattedMessage id="payment_method_verification.failed.deskop_title" />
                            </InlineText>
                        </CustomColumn>
                    }

                    <CustomColumn mobile={16}>
                        <Wraper>
                            <Icon src={closeButton} onClick={this.goToProfile} />
                            <InlineText fontSize='15px'>
                                <FormattedMessage id="payment_method_verification.failed.title" />
                            </InlineText>
                        </Wraper>
                    </CustomColumn>

                    <CustomColumn mobile={16} padding={'23px 0px 0px 0px'}>
                        <InlineText light fontSize='15px'>
                            <FormattedMessage id="payment_method_verification.failed.text" />
                        </InlineText>
                    </CustomColumn>

                    <CustomColumn mobile={16} padding={'16px 0px 0px 0px'}>
                        <InlineText fontSize='15px'>
                            <FormattedMessage id="payment_method_verification.failed.platform_name" />
                        </InlineText>
                    </CustomColumn>

                    <CustomColumn mobile={16}>
                        <InlineText light fontSize='15px'>
                            <FormattedMessage id="payment_method_verification.failed.phone" />
                        </InlineText>
                    </CustomColumn>

                    <CustomColumn mobile={16}>
                        <InlineText light fontSize='15px'>
                            <FormattedMessage id="payment_method_verification.failed.whats_app" />
                        </InlineText>
                    </CustomColumn>

                    <CustomColumn mobile={16} padding={'16px 0px 0px 0px'}>
                        <InlineText light fontSize='15px'>
                            <FormattedMessage id="payment_method_verification.failed.footer_text" />
                        </InlineText>
                    </CustomColumn>

                    {this.props.desktop && 
                        <CustomColumn mobile={16} padding={'20px 0px 0px 0px'}>
                            <BasicButton
                                onClick={this.goToPayment}
                                outline="#51a7bc"
                                color="#51a7bc"
                                fluid
                            >
                                <FormattedMessage id="payment_method_verification.failed.button_text" />
                            </BasicButton>
                        </CustomColumn>
                    }
                </CustomColumn>
            </CustomRow>
            </Grid>
        );
    }
}

const mapStateToProps = state => ({
    membershipData: getMembershipData(state)
  });
  
  export default connect(
    mapStateToProps
  )(VerificationFailed);
