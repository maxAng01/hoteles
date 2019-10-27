import React, {Component} from 'react';
import Hero from '../Hero/Hero';
import Filters from '../Filters/Filters';
import Hotels from '../Hotels/Hotels';
import Moment from 'moment';
import './App.scss';



class App extends Component {
  constructor(props) {
    super(props);

    const today = new Date(); 
    const todayFormated = Moment(today).format("YYYY-MM-DD")
    const nextDateFormated = Moment(today).add(1, 'month').format("YYYY-MM-DD")
  
    this.state = {
      hotels: [],
      hotelsFiltered: [],
      filters: {
        dateFrom: todayFormated,
        dateTo: nextDateFormated,
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
      this.setState({ hotels: myJson
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
    const { filters } = this.state; 
    const { rooms, price, country, dateFrom, dateTo } = filters;

    const hotelsFiltered = this.state.hotels.filter(hotel => {
      return (hotel.rooms <= (rooms !== 'select' ? rooms : hotel.rooms) &&
      hotel.price === (price !== 'select' ? parseInt(price) : hotel.price) &&
      hotel.country === (country !== 'select' ? country : hotel.country) &&
      dateFrom <= Moment(hotel.availabilityFrom).format("YYYY-MM-DD") && dateTo >= Moment(hotel.abailabilityTo).format("YYYY-MM-DD"))
    }) 

    this.setState({
      hotelsFiltered: hotelsFiltered
    })
 }

  render() {
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

