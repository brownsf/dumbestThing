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
      console.log('snap', data.val());
      this.props.actions.quote.addQuote(data.val());
    });
  }
  addQuote = () => {
    return this.props.actions.nav.changePage('Add', 'Add Quotes');
  }
  render() {
    console.log('props', this.props);
    const list = this.props.quotes.map((quote, index) => {
      return (
        <CardItem key={index}>
          <Text>{quote.text}</Text>
          <Text note>{quote.author}</Text>
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
