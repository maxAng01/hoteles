import React, {Component} from 'react';

class OptionsFilter extends Component {
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

  export default OptionsFilter;