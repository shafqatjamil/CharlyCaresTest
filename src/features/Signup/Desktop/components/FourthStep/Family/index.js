//@flow

import { FormattedMessage } from 'react-intl';
import { Grid, Header, List } from 'semantic-ui-react';
import { Paragraph } from 'Components/Text';
import AddBtn from 'Components/Buttons/AddBtn';
import BasicButton from 'Components/Buttons/Basic';
import DateTime from 'react-datetime';
import DesktopWelcomeLayout from 'Components/DesktopWelcomeLayout';
import NoPadding from 'Components/NoPadding';
import React, { Component, Fragment } from 'react';
import uniqid from 'uniqid';

import Child from '../components/Child';
import styled from 'styled-components';

const Container = styled.div`
  min-width: 34vw;
  z-index: -9999;
`;


type Values = {
  firstStepFamily: {
    name: string,
    lastName: string,
  },
  secondStepFamily: {
    email: string,
    password: string,
  },
  thirdStepFamily: {
    postalCode: string,
    streetNumber: string,
    phone: string,
  },
  fourthStepFamily: {
    children: [
      {
        id: string,
        birthDate: string,
      },
    ],
  },
};

type Props = {
  next: Function,
  values: Values,
  handleChange: Function,
  previous: Function,
  setFieldValue: Function,
  submitForm: Function,
  onErrorReset: Function,
  isLoading: boolean,
  apiErrors?: Object,
};

type State = {
  selectedBirthDate: string,
};

class FourthStep extends Component<Props, State> {
  birthDate: ?HTMLInputElement;

  static defaultProps = {
    next: () => {},
    values: {
      firstStepFamily: {
        name: '',
        lastName: '',
      },
      secondStepFamily: {
        email: '',
        password: '',
        terms: false,
      },
      thirdStepFamily: {
        postalCode: '',
        streetNumber: '',
        landCode: '+31',
        phone: '',
      },
      fourthStepFamily: {
        children: [],
      },
    },
    handleChange: () => {},
    submitForm: () => {},
  };

  state = {
    selectedBirthDate: '',
    pickerOpen: false,
  };

  renderChildren = () => {
    const { fourthStepFamily } = this.props.values;
    return fourthStepFamily.children.map((child, i) => (
      <Child
        key={child.id}
        removeChild={this.removeChild(child.id)}
        date={child.birthDate}
      />
    ));
  };

  removeChild = (id: string) => () => {
    const { fourthStepFamily } = this.props.values;
    const filteredArr = fourthStepFamily.children.filter(
      child => id !== child.id
    );
    this.props.setFieldValue('fourthStepFamily.children', filteredArr);
  };

  onBlur = () => {
    this.setState({ pickerOpen: false });
  };

  onDateSelect = (time: Object) => {
    const newChild = {
      id: uniqid('id-'),
      birthDate: time.format('YYYY-MM-DD'),
    };

    this.setState({ pickerOpen: false }, () => {
      this.props.setFieldValue('fourthStepFamily.children', [
        ...this.props.values.fourthStepFamily.children,
        newChild,
      ]);
    });
  };

  onPickerOpen = () => {
    this.setState(prevState => {
      return {
        ...prevState,
        pickerOpen: !prevState.pickerOpen,
      };
    });
  };

  render() {
    return (
      <Fragment>
        <DesktopWelcomeLayout withLogo>
          <Grid.Row columns={1}>
            <Grid.Column computer={8} mobile={16} tablet={16}>
              <Header as="h3">
                <FormattedMessage id="signup.family.fourthStep.header" />
              </Header>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={1}>
            <Grid.Column computer={8} mobile={16} tablet={16}>
              <Paragraph light fontSize="0.9375rem">
                <FormattedMessage id="signup.family.fourthStep.description" />
              </Paragraph>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={1}>
            <Grid.Column computer={8} mobile={16} tablet={16}>
              <List relaxed="very" verticalAlign="middle">
                {this.renderChildren()}
              </List>
            </Grid.Column>
          </Grid.Row>
          
          <Grid.Row columns={1}>
            <Grid.Column as={NoPadding} computer={8} mobile={16} tablet={16}>
              
              <AddBtn
                as="label"
                htmlFor="birthdate"
                padding="0 .78571429em"
                text={<FormattedMessage id="signup.family.fourthStep.addBtn" />}
                onClick={this.onPickerOpen}
              />
             
              <DateTime
                // className="rdt-relative"
                timeFormat={false}
                onChange={this.onDateSelect}
                onBlur={this.onBlur}
                value={this.state.selectedBirthDate}
                open={this.state.pickerOpen}
                input={false}
              />
            </Grid.Column>
          </Grid.Row>
          <Container>
          <Grid.Row columns={1}>
            <Grid.Column computer={8} mobile={16} tablet={16}>
              <BasicButton primary onClick={this.props.next} fluid>
                <FormattedMessage id="signup.family.fourthStep.btn" />
              </BasicButton>
            </Grid.Column>
          </Grid.Row>
          </Container>
        </DesktopWelcomeLayout>
      </Fragment>
    );
  }
}

export default FourthStep;
