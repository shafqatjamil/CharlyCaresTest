import { connect } from 'react-redux';
import { Loader } from 'semantic-ui-react';
import Confirmation from 'Components/Confirmation';
import Layout from 'Components/Layout';
import React from 'react';

import { getMessages, getUserId } from './selectors';
import { onSendMessage } from './actions';
import API from './api';
import CallBtn from './components/CallBtn';
import InfiniteScroll from './components/InfiniteScroll';
import Message from './components/Message';
import Messages from './components/Messages';
import NavTitle from './components/NavTitle';
import pusher from '../../pusher';
import SendMessageSection from './components/SendMessageSection';

import styled from 'styled-components';

const InputContainer = styled.div`
  position: sticky;
  bottom: 1rem;
  align-self: flex-end;
`;

class Chat extends React.Component {
  state = {
    newMessage: '',
    messages: [],
    page: 1,
    lastPage: 3,
    perPage: 5,
    hasMore: true,
  };

  messagesDiv = React.createRef();

  componentDidMount() {
    this.subscribeToChannel();
  }

  componentWillUnmount() {
    pusher.disconnect();
  }

  scrollToBottom = () => {
    const scrollHeight = this.messagesDiv.current.scrollHeight;
    this.messagesDiv.current.scrollTop = scrollHeight;
  };

  updateMessages = ({ message }) => {
    this.setState(
      prevState => {
        if (message.receiver_id === this.props.match.params.userId) {
          return {
            ...prevState,
            messages: [message, ...prevState.messages],
          };
        }
        return null;
      },
      () => {
        this.scrollToBottom();
      }
    );
  };

  updateMessagesStatus = () => {};

  subscribeToChannel() {
    const channel = pusher.subscribe(`chat-${this.props.userId}`);
    channel.bind('App\\Events\\MessageCreated', this.updateMessages);
    channel.bind('App\\Events\\MessageRead', data => {
      console.log('MESSAGE READ', data);
    });
    pusher.connection.bind('connected', () => {
      console.log('connected');
    });
    pusher.connection.bind('disconnected', () => {
      console.log('disconnected');
    });
    pusher.connection.bind('error', err => {
      console.log(err);
    });
  }

  onNewMessageChange = e => {
    this.setState({
      newMessage: e.target.value,
    });
  };

  onMessageSend = () => {
    if (!this.state.newMessage) return;
    const data = {
      message: this.state.newMessage,
      receiver_id: this.props.match.params.userId,
    };
    const newMessage = {
      id: new Date(),
      created_at: new Date(),
      receiver_id: this.props.user_id,
      user_id: this.props.match.params.userId,
      message: this.state.newMessage,
    };
    this.setState(
      prevState => {
        return {
          ...prevState,
          newMessage: '',
          messages: [newMessage, ...prevState.messages],
        };
      },
      () => {
        this.scrollToBottom();
        this.props.sendMessage(data);
      }
    );
  };

  renderMessages() {
    if (this.state.messages.length > 0) {
      const reversedMessages = [...this.state.messages].sort((a, b) => {
        if (new Date(a.created_at) > new Date(b.created_at)) {
          return 1;
        } else {
          return -1;
        }
      });
      return reversedMessages.map(m => {
        if (m.receiver_id == this.props.match.params.userId || m.receiver_id == undefined) {
          return (
            <Message
              key={m.id}
              createdAt={m.created_at}
              me
              message={m.message}
              status = {m.viewed_at == null ? 1 : 3}
            />
          );
        }
        return (
          <Message
            key={m.id}
            createdAt={m.created_at}
            you
            message={m.message}
            status = {m.viewed_at == null ? 1 : 3}
          />
        );
      });
    }
    return [];
  }

  getNextPage = () => {
    if (this.state.fetching) {
      return;
    }

    this.setState(
      {
        fetching: true,
      },
      () => {
        API.getMessagesPage(
          this.props.match.params.userId,
          this.state.perPage,
          this.state.page
        ).then(({ data }) => {
          this.setState(prevState => {
            if (
              data.data.messages.last_page === this.state.page ||
              data.data.messages.total === 0
            ) {
              return {
                ...prevState,
                messages: [...prevState.messages, ...data.data.messages.data],
                hasMore: false,
                fetching: false,
              };
            }

            return {
              ...prevState,
              messages: [...prevState.messages, ...data.data.messages.data],
              lastPage: data.data.messages.last_page,
              page: prevState.page + 1,
              fetching: false,
            };
          });
        });
      }
    );
  };

  navigateToBooking = () => {
    this.props.history.push('/booking/create');
  };

  render() {
    const { location } = this.props;

    return (
      <Layout
        navBorder
        onNavBack={this.props.history.goBack}
        navRightComponent={() => (
          <CallBtn phone={location.state && location.state.phone} />
        )}
        navTitle={
          <NavTitle
            name={location.state && location.state.name}
            img={location.state && location.state.img}
          />
        }
      >
        <Messages innerRef={this.messagesDiv}>
          {this.state.lastPage ? (
            <InfiniteScroll
              pageStart={0}
              isReverse
              useWindow={false}
              threshold={500}
              loadMore={this.getNextPage}
              hasMore={this.state.hasMore}
              loader={
                <div
                  key={0}
                  style={{
                    position: 'relative',
                    width: '100%',
                    marginTop: '15vw',
                    marginBottom: '5vw',
                  }}
                >
                  <Loader size="medium" active />
                </div>
              }
            >
              {this.renderMessages()}
            </InfiniteScroll>
          ) : null}
        </Messages>
        <InputContainer>
          <Confirmation>
            <SendMessageSection
              onNewMessageChange={this.onNewMessageChange}
              newMessage={this.state.newMessage}
              onMessageSend={this.onMessageSend}
              navigateToBooking={this.navigateToBooking}
            />
          </Confirmation>
        </InputContainer>
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  messages: getMessages(state),
  userId: getUserId(state),
});

const mapDispatchToProps = dispatch => ({
  sendMessage: data => dispatch(onSendMessage(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chat);
