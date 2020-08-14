import React from 'react';
import './App.css';
import { withTranslation } from 'react-i18next';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {color: 'white', appliedColor: 'white'};
  }

  componentDidMount() {
    const { getData } = this.props
    getData()
  }

  render() {
    const { t, data, setState } = this.props;
    const dataDisplay = data ? JSON.stringify(data) : 'No data loaded';

    const handleChange = (event) => this.setState({color: event.target.value});
    const handleSubmit = (event) => this.setState({appliedColor: this.state.color});
    const handleChangeState = (event) => {
      debugger
      setState(event.target.value)
    };

    return (
      <div className="App">
        <header className="App-header">
          <p>This is reading Redux state: "{this.props.state.exampleProperty}". Type in the "App State Demo" box in the bottom of the page to change it</p>

          <div className="internal-state-demo">
            <h2>{t('localized content')}</h2>
            <a href="/?lng=en">English</a>   <a href="/?lng=es">Español</a>
            <p>{t('add content')}</p>
            <p>{t('welcome')}</p>
            <a className="App-link"
               href="https://reactjs.org"
               target="_blank"
               rel="noopener noreferrer">
              {t('learn')}
            </a>
          </div>

          <div className="internal-state-demo">
            <h2>Data loaded with an API call</h2>
            <p>
              Data:&nbsp;
              { data ? <code>{dataDisplay}</code> : dataDisplay }
            </p>
          </div>

          <div style={{display: 'flex'}}>
            <div className="internal-state-demo" style={{ backgroundColor: this.state.appliedColor }}>
              <h2>Component State Demo</h2>
              <p>
                <label>Change the color of this box</label><br/>
                <input type="text" value={this.state.color} onChange={handleChange}/>
              </p>
              <p>
                <input type="Submit" onClick={handleSubmit}/>
              </p>
            </div>
            <div className="internal-state-demo">
              <h2>App State Demo</h2>
              <p>
                <label>Type here. This will change Redux state</label><br/>
                <input type="text" onChange={handleChangeState}/>
              </p>
            </div>
          </div>
        </header>
      </div>
    );
  }
}

export default withTranslation()(App);
