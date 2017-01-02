import React, { PropTypes } from 'react';
import { Container, Content, List, ListItem, InputGroup, Input, Button } from 'native-base';
import firebase from 'firebase';

export default class AddQuote extends React.Component {
  add = () => {
    const ref = firebase.database().ref().child('quotes');
    const newPostKey = ref.push().key;
    const { author, quote } = this.state;
    console.log(this.state);
    const newQuote = {
      text: quote,
      author,
      timestamp: firebase.database.ServerValue.TIMESTAMP,
    };

    const updates = {};
    updates[newPostKey] = newQuote;
    const response = ref.update(updates);
    response.then(() => { this.setState(author:'', quote:''); });
  }
  render() {
    return (
      <Container>
        <Content>
          <List>
            <ListItem>
              <InputGroup>
                <Input onChangeText={text => this.setState({ author: text })} inlineLabel label="Author" placeholder="John Doe" />
              </InputGroup>
            </ListItem>
            <ListItem>
              <InputGroup>
                <Input onChangeText={text => this.setState({ quote: text })} multiline inlineLabel label="Quote" />
              </InputGroup>
            </ListItem>
          </List>
          <Button onPress={this.add} style={{ alignSelf: 'center', marginTop: 20, marginBottom: 20 }}>
                  Add
          </Button>
        </Content>
      </Container>
    );
  }
}

AddQuote.propTypes = {
};
