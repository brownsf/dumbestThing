import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Icon } from 'native-base';
import firebase from 'firebase';
import SignUp from '../component/signup';
import Login from '../component/login';
import QuoteContain from '../component/quotesContain';
import AddQuote from '../component/add';

import * as navActionCreators from '../actions/navigation';
import * as authActionCreators from '../actions/auth';
import * as quoteActionCreators from '../actions/quotes';


class Main extends Component {
  componentDidMount() {
    const user = firebase.auth().currentUser;
    console.log('user', user);
    this.props.actions.auth.login(user);

    return this.props.actions.nav.changePage('Quotes', 'AllTime');
  }

  componentWillReceiveProps(nextProps) {
    console.log('nextProps', nextProps);
  }
  getPageComponent = (page) => {
    switch (page) {
      case 'SignUp':
        return <SignUp {...this.props} />;
      case 'Login':
        return <Login {...this.props} />;
      case 'Add':
        return <AddQuote {...this.props} />;
      case "AllTime":
        return <QuoteContain type="AllTime" {...this.props} />;
      default:
        if (this.props.loggedIn) {
          return <QuoteContain type="AllTime" {...this.props} />;
        }
        return <SignUp {...this.props} />;
    }
  }
  render() {
    const { title, page } = this.props;
    const currentPage = this.getPageComponent(page);
    return (
      <Container>
        <Header>
          <Button transparent>
            <Icon name="ios-arrow-back" />
          </Button>
          <Title>{title}</Title>
        </Header>

        <Content>
          { currentPage }
        </Content>

        <Footer>
          <FooterTab>
            <Button transparent>
              <Icon name="ios-home" />
            </Button><Button transparent>
              <Icon name="ios-call" />
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    title: state.navigation.title,
    page: state.navigation.page,
    loggedIn: state.auth.loggedIn,
    quotes: state.quotes.quotes,
  };
}

Main.propTypes = {
  title: PropTypes.string,
  page: PropTypes.string,
  loggedIn: PropTypes.bool,
  actions: PropTypes.object,
};

export default connect(mapStateToProps, dispatch => ({
  actions: {
    nav: bindActionCreators(navActionCreators, dispatch),
    auth: bindActionCreators(authActionCreators, dispatch),
    quote: bindActionCreators(quoteActionCreators, dispatch),
  },
}))(Main);
