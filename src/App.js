import React, {Component} from 'react';
import Moment from 'moment';
import Hero from './Hero/Hero';
//import logo from './logo.svg';
import './App.scss';
//import ReactDOM from 'react-dom';


// const Hero = (props) => {
//   const options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'}
//   const dateFrom = new Date(props.filters.dateFrom).toLocaleDateString('es-AR', options)
//   const dateTo = new Date(props.filters.dateTo).toLocaleDateString('es-AR', options)
//   return(
//     <section className="hero is-primary">
//     <div className="hero-body">
//       <div className="container">
//         <h1 className="title">Hoteles</h1>
//         <h2 className="subtitle">
//           desde el <strong>{ dateFrom }</strong> hasta el <strong>{ dateTo }</strong>
//           { props.filters.country === 'select' ? '' : ` en ${props.filters.country}` }
//           { props.filters.price === 'select' ? '' : ` por ${props.filters.price}` }
//           { props.filters.rooms === 'select' ? '' : ` de hasta ${props.filters.rooms} habitaciones` }
//         </h2>
//       </div>
//     </div>
//   </section>
//   )
// }

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
            <i className={`fas fa-${this.props.icon}`}></i>
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
          options={ [ {value: 'select', name: 'Todos los países'}, {value: 'Argentina', name: 'Argentina'}, {value: 'Brasil', name: 'Brasil'}, {value: 'Chile', name: 'Chile'}, {value: 'Uruguay', name: 'Uruguay'} ] }
          selected={ this.props.filters.country }
          icon="globe" 
          onOptionChange={ this.handleOptionChange }
          name="country"
          />
      </div>
      <div className="navbar-item">
        <OptionsFilter
          options={ [ {value: 'select', name: 'Cualquier precio'}, {value: 1, name: '$'}, {value: 2, name: '$$'}, {value: 3, name: '$$$'}, {value: 4, name: '$$$$'} ] }
          selected={ this.props.filters.price }
          icon="dollar-sign" 
          onOptionChange={ this.handleOptionChange }
          name="price"
          />
      </div>
      <div className="navbar-item">
        <OptionsFilter
          options={ [ {value: 'select', name: 'Cualquier tamaño'}, {value: 10, name: 'Hotel pequeño'}, {value: 20, name: 'Hotel mediano'}, {value: 30, name: 'Hotel grande'} ] }
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

const DataTag = (props) => (
  <div className="control">
    <div className="tags has-addons">
      <span className="tag is-medium is-info"><i className={ props.icon }></i></span>
      <span className="tag is-medium">{props.children}</span>
    </div>
  </div>
)

const ShowPrice = ({price}) => {
  let dolarIcons = [];
  var styles;
  for(var i = 0; i < 4; i++) {
    if(price > i) {
      styles = {margin: '0 .125em'};
    } else {
      styles = {margin: '0 .125em', opacity: '.25'}
    }
    dolarIcons.push(<i className="fas fa-dollar-sign" style={ styles } key={i}></i>)
  }
  //cambiar nombre price arriba
  return (
    <div className="control">
        <div className="tags">
          <span className="tag is-medium is-info">
            {dolarIcons}
          </span>
        </div>
    </div>
  )
}
/*
  <div className="control">
        <div className="tags">
          <span className="tag is-medium is-info">
            <i className="fas fa-dollar-sign" style={{margin: '0 .125em'}}></i>
            <i className="fas fa-dollar-sign" style={{margin: '0 .125em'}}></i>
            <i className="fas fa-dollar-sign" style={{margin: '0 .125em', opacity: '.25'}}></i>
            <i className="fas fa-dollar-sign" style={{margin: '0 .125em', opacity: '.25'}}></i>
          </span>
        </div>
    </div>
*/

const Hotel = ({hotel}) => {
  return ( 
    <div className="card">
  <div className="card-image">
    <figure className="image is-4by3">
      <img src={hotel.photo} alt={hotel.name} />
    </figure>
  </div>
  <div className="card-content">
    <p className="title is-4">{hotel.name}</p>
    <p>{hotel.description}</p>
    <div className="field is-grouped is-grouped-multiline" style={{marginTop: '1em'}}>
    <DataTag icon="fas fa-map-marker">{`${hotel.city}, ${hotel.country}`}</DataTag>
    <DataTag icon="fas fa-bed">{`${hotel.rooms} Habitaciones`}</DataTag>
    <ShowPrice price={hotel.price} />
    </div>
  </div>
  <div className="card-footer">
    <a href="#root" className="card-footer-item has-background-primary has-text-white has-text-weight-bold">Reservar</a>
  </div>
</div>
  )
}
//<PriceTag price={hotel.price} />
//"javascript:alert('No implementamos esto aún :(')"
class Hotels extends React.Component {
  render() {
    const {hotels} = this.props
    return (
      <section className="section" style={ {marginTop: '3em'} }>
        <div className="container">
          <div className="columns is-multiline">
            {hotels.length !== 0 ? (
              hotels.map((hotel) => (
                <div className="column is-one-third" key={hotel.slug}>
                  <Hotel hotel={ hotel } />
                </div>
              ))
              ) : (
              <article className="message is-warning">
                <div className="message-body">
                  No se han encontrado hoteles que coincidan con los parámetros de búsqueda.
                </div>
              </article>
            )}
          </div>
        </div>
      </section>
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
    //this.handleFilter = this.handleFilter.bind(this);
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
      filters: payload,
      
    })
    
  }
/*
  handleFilter () {
    const { filters, hotels} = this.state
   // const hotelsFiltered = hotels.filter(hotel => filters.country ? hotel.country === filters.country : true)
   

   return false})
    this.setState({
      hotelesFiltered: hotelsFiltered
    })
  }*/
  
//   handleFilter(payload){
//    let {dateFrom, dateTo, country, price, rooms} = payload
//    const hotelsFiltered = this.state.hotels.filter(hotel => {
//      return (hotel.rooms <= (rooms !== 'select' ? rooms : hotel.rooms))
//    })
//    return hotelsFiltered
//  }

  render() {
    
    const hotelsFiltered = this.state.hotels.filter(hotel => {
      return (hotel.rooms <= (this.state.filters.rooms !== 'select' ? this.state.filters.rooms : hotel.rooms) &&
      hotel.price === (this.state.filters.price !== 'select' ? parseInt(this.state.filters.price) : hotel.price) &&
      hotel.country === (this.state.filters.country !== 'select' ? this.state.filters.country : hotel.country) &&
      this.state.filters.dateFrom <= hotel.availabilityFrom &&
      this.state.filters.dateTo <= hotel.availabilityTo

      )
    })
    //const hotels = this.state.hotels.filter(hotel => this.state.filters.country ? hotel.country === this.state.filters.country : true )
    console.log(this.state.filters)
    console.log(this.state.hotels)
    console.log(this.state.hotelsFiltered)

    return (
      <div>
        <Hero filters={ this.state.filters } />
        <Filters filters={ this.state.filters } onFilterChange={ this.handleFilterChange }/>
        <Hotels hotels={ hotelsFiltered } />
      </div>
    )
    
  }
}

export default App;




