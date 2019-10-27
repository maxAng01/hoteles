import React, {Component} from 'react';
import DateFilter from './DateFilter/DateFilter';
import OptionsFilter from './OptionsFilter/OptionsFilter';

class Filters extends Component {
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
      payload[event.target.name] = event.target.value
      this.props.onFilterChange(payload)
    }
  
    render() {
        const {dateFrom, dateTo, country, price, rooms} = this.props.filters;
      return (
        <nav className="navbar is-info" style={ {justifyContent: 'center'} }>
        <div className="navbar-item">
          <DateFilter
            date={ dateFrom }
            icon="sign-in-alt" 
            onDateChange={ this.handleDateChange }
            name="dateFrom"
            />
        </div>
        <div className="navbar-item">
          <DateFilter
            date={ dateTo }
            icon="sign-out-alt" 
            onDateChange={ this.handleDateChange }
            name="dateTo"
            />
        </div>
        <div className="navbar-item">
          <OptionsFilter
            options={ [ {value: 'select', name: 'Todos los países'}, {value: 'Argentina', name: 'Argentina'}, {value: 'Brasil', name: 'Brasil'}, {value: 'Chile', name: 'Chile'}, {value: 'Uruguay', name: 'Uruguay'} ] }
            selected={ country }
            icon="globe" 
            onOptionChange={ this.handleOptionChange }
            name="country"
            />
        </div>
        <div className="navbar-item">
          <OptionsFilter
            options={ [ {value: 'select', name: 'Cualquier precio'}, {value: 1, name: '$'}, {value: 2, name: '$$'}, {value: 3, name: '$$$'}, {value: 4, name: '$$$$'} ] }
            selected={ price }
            icon="dollar-sign" 
            onOptionChange={ this.handleOptionChange }
            name="price"
            />
        </div>
        <div className="navbar-item">
          <OptionsFilter
            options={ [ {value: 'select', name: 'Cualquier tamaño'}, {value: 10, name: 'Hotel pequeño'}, {value: 20, name: 'Hotel mediano'}, {value: 30, name: 'Hotel grande'} ] }
            selected={ rooms }
            icon="bed" 
            onOptionChange={ this.handleOptionChange }
            name="rooms"
            />
        </div>
      </nav>
      )
    }
  }

export default Filters;