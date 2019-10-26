import React, {Component} from 'react';
import Moment from 'moment';

class DateFilter extends Component {
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
              <i className={`fas fa-${ this.props.icon }`}></i>
            </span>
          </div>
        </div>
      )
    }
  }

export default DateFilter;