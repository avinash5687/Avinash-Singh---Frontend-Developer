import React, { Component } from 'react';
import logo from './assets/spacex-logo.png';
import reload from './assets/img/refresh.png';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flights: [],
      isLoaded: false,
      year: false,
      selectedYear: null,
    };
  }

  yearSort = (state) => {
    this.setState({ year: state || !this.state.year });
  };

  componentDidMount() {
    fetch('https://api.spacexdata.com/v3/launches?limit=10')
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          isLoaded: true,
          flights: json,
        });
      });
  }

  handleFilter = () => {
    const { selectedYear } = this.state;
    if (selectedYear) {
      this.setState({ selectedYear: null });
    } else {
      const year = prompt('Enter the year to filter:');
      this.setState({ selectedYear: year });
    }
  };

  render() {
    const { isLoaded, flights, selectedYear } = this.state;

    if (!isLoaded) {
      return <div>Loading....</div>;
    } else {
      const filteredFlights = Object.keys(flights).filter((flight) => {
        return selectedYear
          ? flights[flight].launch_year === selectedYear
          : true;
      });

      return (
        <div className="App">
          <header className="App-header">
            <div className="Page-title">
              <img src={logo} className="logo" alt="space x" />
              <span>LAUNCHES</span>
            </div>
            <a href="/" className="Reload-data">
              Reload Data <span><img src={reload} alt="" /></span>
            </a>
          </header>

          <main className="App-main">
            <div className="Data-holder">
              <div className="Filter-btns">
                <button onClick={this.handleFilter} className="filter">
                  {selectedYear ? 'Remove Filter' : 'Filter by Year'}
                </button>
              </div>

              <ul className="launches">
                {filteredFlights.length > 0 ? (
                  filteredFlights.map((flight) => {
                    return (
                      <li key={flight}>
                        <span className="flight">#{flights[flight].flight_number}</span>
                        <span className="name">{flights[flight].mission_name}</span>
                        <span className="date">{flights[flight].launch_date_local.slice(0, 10)}</span>
                        <span className="rocket">{flights[flight].rocket.rocket_name}</span>
                      </li>
                    );
                  })
                ) : (
                  <li className="no-data">No Data</li>
                )}
              </ul>
            </div>
          </main>

          <footer className="App-footer"></footer>
        </div>
      );
    }
  }
}

export default App;
