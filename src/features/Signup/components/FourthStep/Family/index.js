//@flow

import { FormattedMessage } from 'react-intl';
import { Grid, Header, List } from 'semantic-ui-react';
import AddBtn from 'Components/Buttons/AddBtn';
import BasicButton from 'Components/Buttons/Basic';
import CustomColumn from 'Components/CustomColumn';
import CustomRow from 'Components/CustomRow';
import Layout from 'Components/Layout';
import React, { Component } from 'react';
import uniqid from 'uniqid';
import ButtonWrapper from '../components/ButtonWrapper';

import Child from '../components/Child';
import DateInput from '../components/DateInput';

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

  onAddChild = (e: SyntheticInputEvent<HTMLInputElement>) => {
    const newChild = {
      id: uniqid('id-'),
      birthDate: this.state.selectedBirthDate,
    };
    this.props.setFieldValue('fourthStepFamily.children', [
      ...this.props.values.fourthStepFamily.children,
      newChild,
    ]);
    this.setState(prevState => {
      return {
        selectedBirthDate: '',
      };
    });
  };

  onDateSelect = (e: SyntheticInputEvent<HTMLInputElement>) => {
    this.setState({
      selectedBirthDate: e.target.value,
    });
  };

  render() {
    return (
      <Layout onNavBack={this.props.previous}>
        <CustomRow>
          <CustomColumn width={16}>
            <Grid>
              <Grid.Row>
                <Grid.Column>
                  <Header>
                    <FormattedMessage id="signup.family.fourthStep.header" />
                  </Header>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column as="p">
                  <FormattedMessage id="signup.family.fourthStep.description" />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <List relaxed="very" verticalAlign="middle">
                    {this.renderChildren()}
                  </List>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <AddBtn
                  as="label"
                  htmlFor="birthdate"
                  padding="0 .78571429em"
                  text={
                    <FormattedMessage id="signup.family.fourthStep.addBtn" />
                  }
                >
                  <DateInput
                    value={this.state.selectedBirthDate}
                    onBlur={this.onAddChild}
                    onChange={this.onDateSelect}
                  />
                </AddBtn>
              </Grid.Row>
            </Grid>
          </CustomColumn>
        </CustomRow>

        <ButtonWrapper borderless fixed="bottom">
          <BasicButton primary onClick={this.props.next} fluid>
            <FormattedMessage id="signup.family.fourthStep.btn" />
          </BasicButton>
        </ButtonWrapper>
      </Layout>
    );
  }
}

export default FourthStep;
