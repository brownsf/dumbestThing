import React, { PropTypes } from 'react';
import { Container, Content, Card, CardItem, Text, Button } from 'native-base';
import firebase from 'firebase';

export default class Quotes extends React.Component {
  constructor(props) {
    super(props);
    const ref = firebase.database().ref("quotes");
    this.state = { ref };

    ref.orderByChild("votes").on("child_added", (data) => {
  // This will be called exactly two times (unless there are less than two
  // dinosaurs in the Database).

  // It will also get fired again if one of the first two dinosaurs is
  // removed from the data set, as a new dinosaur will now be the second
  // shortest.
      console.log('snap', data);
      this.props.actions.quote.addQuote(data);
    });
  }
  addQuote = () => {
    return this.props.actions.nav.changePage('Add', 'Add Quotes');
  }
  vote = (quote) => {
    const { text, author, timestamp } = quote.val();
    let { votes } = quote.val();
    if (isNaN(votes)) {
      votes = 1;
    } else {
      votes += 1;
    }

    const postData = {
      text,
      author,
      votes,
      timestamp,
    };

    const user = firebase.auth().currentUser;
    const uid = user.uid;
    const updates = {};
    console.log('postData', postData);
    updates[`/quotes/${quote.key}`] = postData;
    const voterData = {
      quote: quote.key,
      timestamp: firebase.database.ServerValue.TIMESTAMP,
    };
    console.log('voterData', voterData);
    updates[`/user-votes/${uid}`] = voterData;

    firebase.database().ref().update(updates).catch((error) => {
      console.log('error', error)
    });
  }
  render() {
    console.log('props', this.props);
    const list = this.props.quotes.reverse().map((quote, index) => {
      return (
        <CardItem onPress={() => { this.vote(quote); }} button key={index}>
          <Text>{quote.val().text}</Text>
          <Text note>{quote.val().author}</Text>
          <Text note>{quote.val().votes}</Text>
        </CardItem>);
    });

    return (<Container>
      <Content>
        <Button onPress={this.addQuote}>Add</Button>
        <Card>
          {list}
        </Card>
      </Content>
    </Container>);
  }
}

Quotes.propTypes = {
  actions: PropTypes.object,
  quotes: PropTypes.array,
};
