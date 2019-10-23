import React, {Component} from 'react';
import Moment from 'moment';

//import logo from './logo.svg';
import './App.scss';
//import ReactDOM from 'react-dom';


const Hero = (props) => {
  const options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'}
  //let dateFrom = props.filters.dateFrom.toLocaleDateString('es-AR',options)
  const dateFrom = new Date(props.filters.dateFrom).toLocaleDateString('es-AR', options)
  const dateTo = new Date(props.filters.dateTo).toLocaleDateString('es-AR', options)
  return(
    <section className="hero is-primary">
    <div className="hero-body">
      <div className="container">
        <h1 className="title">Hoteles</h1>
        <h2 className="subtitle">
          desde el <strong>{ dateFrom }</strong> hasta el <strong>{ dateTo }</strong>
          { props.filters.country ? ` en ${props.filters.country}` : '' }
          { props.filters.price ? ` por ${props.filters.price}` : '' }
          { props.filters.rooms ? ` de hasta ${props.filters.rooms} habitaciones` : '' }
        </h2>
      </div>
    </div>
  </section>
  )
}

class DateFilter extends React.Component {
  constructor(props) {
    super(props);
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  handleDateChange(event) {
    this.props.onDateChange(event)
  }

  render() {
    let date = Moment(this.props.date).format('YYYY-MM-DD');

    return(
      <div className="field">
        <div className="control has-icons-left">
          <input className="input" type="date" onChange={ this.handleDateChange } value={ date } name={ this.props.name }/>
          <span className="icon is-small is-left">
            <i className={`fas ${this.props.icon}`}></i>
          </span>
        </div>
      </div>
    )
  }
}

class OptionsFilter extends React.Component {
  constructor(props) {
    super(props);
    this.handleOptionChange = this.handleOptionChange.bind(this);
  }

  handleOptionChange(event) {
    this.props.onOptionChange(event)
  }

  render() {
    return (
      <div className="field">
        <div className="control has-icons-left">
          <div className="select" style={ {width: '100%'} }>
            <select onChange={ this.handleOptionChange } style={ {width: '100%'} } value={ this.props.selected } name={ this.props.name }>
              { this.props.options.map((option) => (
                <option value={ option.value } name={ option.name } key={ option.name }>{ option.name }</option>
              )) }
            </select>
          </div>
         <div className="icon is-small is-left">
            <i className={`fas fa-${this.props.icon}`}></i>
        </div>
      </div>
    </div>  
    )
  }
}

class Filters extends React.Component {
  constructor(props) {
    super(props);
   
    this.handleOptionChange = this.handleOptionChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  handleOptionChange(event) {
    let payload = this.props.filters
    payload[event.target.name] = event.target.value
  
    this.props.onFilterChange(payload)
  }

  handleDateChange(event) {
    let payload = this.props.filters
    payload[event.target.name] = new Date(event.target.value)
    if(payload.dateFrom.valueOf() >= payload.dateTo.valueOf()) {
      let date = payload.dateFrom.valueOf()
      payload.dateTo = new Date(date.valueOf()+ 86400000)
    }
    this.props.onFilterChange(payload)
  }

  render() {
    return (
      <nav className="navbar is-info" style={ {justifyContent: 'center'} }>
      <div className="navbar-item">
        <DateFilter
          date={ this.props.filters.dateFrom }
          icon="sign-in-alt" 
          onDateChange={ this.handleDateChange }
          name="dateFrom"
          />
      </div>
      <div className="navbar-item">
        <DateFilter
          date={ this.props.filters.dateTo }
          icon="sign-out-alt" 
          onDateChange={ this.handleDateChange }
          name="dateTo"
          />
      </div>
      <div className="navbar-item">
        <OptionsFilter
          options={ [ {value: undefined, name: 'Todos los países'}, {value: 'Argentina', name: 'Argentina'}, {value: 'Brasil', name: 'Brasil'}, {value: 'Chile', name: 'Chile'}, {value: 'Uruguay', name: 'Uruguay'} ] }
          selected={ this.props.filters.country }
          icon="globe" 
          onOptionChange={ this.handleOptionChange }
          name="country"
          />
      </div>
      <div className="navbar-item">
        <OptionsFilter
          options={ [ {value: undefined, name: 'Cualquier precio'}, {value: 1, name: '$'}, {value: 2, name: '$$'}, {value: 3, name: '$$$'}, {value: 4, name: '$$$$'} ] }
          selected={ this.props.filters.price }
          icon="dollar-sign" 
          onOptionChange={ this.handleOptionChange }
          name="price"
          />
      </div>
      <div className="navbar-item">
        <OptionsFilter
          options={ [ {value: undefined, name: 'Cualquier tamaño'}, {value: 10, name: 'Hotel pequeño'}, {value: 20, name: 'Hotel mediano'}, {value: 30, name: 'Hotel grande'} ] }
          selected={ this.props.filters.rooms }
          icon="bed" 
          onOptionChange={ this.handleOptionChange }
          name="rooms"
          />
      </div>
    </nav>
    )
  }
}


//dddd, DD de mmmm de AAAA
class App extends Component {
  constructor(props) {
    super(props);


    let today = new Date();
    //const todayFormated = Moment(today).format('YYYY-MM-DD');
    let dateTo = new Date(today.valueOf() + 86400000);
    //const dateTo = new Date(today.setMonth(today.getMonth()+1));
    //const dateToFormated = Moment(dateTo).format('YYYY-MM-DD');

    this.state = {
      hotels: [],
      filters: {
        dateFrom: today,
        dateTo: dateTo,
        country: undefined,
        price: undefined,
        rooms: undefined
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
      this.setState({ hotels: myJson });
    })
    .catch(error => {
      console.log(error);
    });
  }

  handleFilterChange(payload) {
    this.setState({
      filters: payload
    })
  }
  
  render() {
    console.log(this.state.filters)
    return (
      <div>
        <Hero filters={ this.state.filters } />
        <Filters filters={ this.state.filters } onFilterChange={ this.handleFilterChange }/>
        
      </div>
    )
    
  }
}

export default App;




