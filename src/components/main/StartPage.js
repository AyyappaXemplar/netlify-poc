import React from 'react';
import Radio from '../forms/Radio';
import { Button } from 'react-bootstrap';
import { withTranslation } from 'react-i18next';


class StartPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = { gender: 'Male', house: true, boat: false }
    this.setGender = this.setGender.bind(this)
    this.toggleHouse = this.toggleHouse.bind(this)
    this.toggleBoat = this.toggleBoat.bind(this)
  }

  setGender(event) { this.setState({ gender: event.target.value }) }
  toggleHouse() { this.setState({ house: !this.state.house }) }
  toggleBoat() { this.setState({ boat: !this.state.boat }) }

  render() {

    return (
      <React.Fragment>
        <Radio label='house' id="house" type="checkbox" selected={this.state.house} onSelect={this.toggleHouse}/>
        <Radio label='boat'  id="boat" type="checkbox" selected={this.state.boat}  onSelect={this.toggleBoat}/>
        <Radio label='Male'  id="gender-male" type="radio" onSelect={this.setGender} selected={this.state.gender === "Male"}/>
        <Radio label='Female' id="gender-female" type="radio" onSelect={this.setGender} selected={this.state.gender === "Female"}/>
        <Button variant="primary">Get Started</Button>
      </React.Fragment>
    );
  }
}

export default withTranslation()(StartPage);
