import React, {Component} from 'react';
import Hero from '../Hero/Hero';
import Filters from '../Filters/Filters';
import Hotels from '../Hotels/Hotels';
import './App.scss';


class App extends Component {
  constructor(props) {
    super(props);

   const today = new Date(); 
   const dateTo = new Date(today.valueOf() + 86400000);  
  
    this.state = {
      hotels: [],
      hotelsFiltered: [],
      filters: {
        dateFrom: today,
        dateTo: dateTo,
        country: "select",
        price: 'select',
        rooms: 'select'
      }
    }

    this.handleFilterChange = this.handleFilterChange.bind(this);
  }


  componentDidMount() {
    fetch('https://wt-8a099f3e7c73b2d17f4e018b6cfd6131-0.sandbox.auth0-extend.com/acamica')
    .then(function(response) {
      return response.json();
    })
    .then(myJson => {
      this.setState({ hotels: myJson, 
      });
      this.filterOptions();
    })
    .catch(error => {
      console.log(error);
    });
  }

  handleFilterChange(payload) {
    this.setState({
      filters: payload,
    })
    this.filterOptions();
  }


  filterOptions(){
    const hotelsFiltered = this.state.hotels.filter(hotel => {
      return (hotel.rooms <= (this.state.filters.rooms !== 'select' ? this.state.filters.rooms : hotel.rooms) &&
      hotel.price === (this.state.filters.price !== 'select' ? parseInt(this.state.filters.price) : hotel.price) &&
      hotel.country === (this.state.filters.country !== 'select' ? this.state.filters.country : hotel.country) &&
      this.state.filters.dateFrom >= hotel.availabilityFrom &&
      this.state.filters.dateTo <= hotel.availabilityTo
    )
  })
    this.setState({
      hotelsFiltered: hotelsFiltered
    })
 }

  render() {
    
    //console.log(this.state.filters.dateFrom);


    //console.log(this.state.hotelsFiltered)

    return (
      <div>
        <Hero filters={ this.state.filters } />
        <Filters filters={ this.state.filters } onFilterChange={ this.handleFilterChange }/>
        <Hotels hotels={ this.state.hotelsFiltered } />
      </div>
    )

  }
}

export default App;

