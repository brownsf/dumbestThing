import React, { PropTypes } from 'react';
import { Container, Content, List, ListItem, InputGroup, Input, Icon, Button } from 'native-base';
import { AsyncStorage } from 'react-native';
import Firebase from 'firebase';


export default class Login extends React.Component {

  login = () => {

    const { email, password } = this.state;
    const auth = Firebase.auth().signInWithEmailAndPassword(email.trim(), password.trim());
    auth.then((user) => {
      this.props.actions.auth.login(user);

      return this.props.actions.nav.changePage('Quotes', 'AllTime');
    });
    auth.catch((error) => {
      console.log(error);
    });
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
          <Button onPress={() => { this.login(); }} style={{ alignSelf: 'center', marginTop: 20, marginBottom: 20 }}>
              Login
          </Button>
        </Content>
      </Container>);
  }
}

Login.propTypes = {
  actions: PropTypes.object,
};
