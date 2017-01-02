import React, { PropTypes } from 'react';
import {
  AppRegistry, AlertIOS,
} from 'react-native';
import { InputGroup, Input, Content, Button, Container, List, ListItem, Icon, Grid, Col } from 'native-base';
import Firebase from 'firebase';

export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: true,
      email: '',
      password: '',
    };
  }

  signup() {
    this.setState({
      loaded: false,
    });
    Firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      AlertIOS.alert(
        errorCode,
        errorMessage
      );
    }).then((user) => { console.log('user', user); });
  }

  goToLogin() {
    this.props.actions.nav.changePage('Login', 'Login');
  }

  render() {
    return (
      <Container>
        <Content>
          <List>
            <ListItem>
              <InputGroup>
                <Icon name="ios-person" style={{ color: '#0A69FE' }} />
                <Input onChangeText={text => this.setState({ email: text })} placeholder="EMAIL" />
              </InputGroup>
            </ListItem>
            <ListItem>
              <InputGroup>
                <Icon name="ios-unlock" style={{ color: '#0A69FE' }} />
                <Input onChangeText={text => this.setState({ password: text })} placeholder="PASSWORD" secureTextEntry />
              </InputGroup>
            </ListItem>
          </List>
          <Grid>
            <Col>
              <Button
                style={{ alignSelf: 'center', marginTop: 20, marginBottom: 20 }}
                success
                onPress={() => this.signup()}
              >
              Signup
              </Button>
            </Col>
            <Col>
              <Button
                style={{ alignSelf: 'center', marginTop: 20, marginBottom: 20 }}
                onPress={() => this.goToLogin()}
              >
              Already have an Account?
              </Button>
            </Col>
          </Grid>
        </Content>
      </Container>
    );
  }
}

AppRegistry.registerComponent('SignUp', () => SignUp);

SignUp.propTypes = {
  actions: PropTypes.object,
};
