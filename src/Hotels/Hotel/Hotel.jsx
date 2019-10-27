import React from 'react';

const ShowPrice = ({ price }) => {
    let dolarIcons = [];
    var styles;
    for(var i = 0; i < 4; i++) {
      if (price > i) {
        styles = {margin: '0 .125em'};
      } else {
        styles = {margin: '0 .125em', opacity: '.25'}
      }
      dolarIcons.push(<i className="fas fa-dollar-sign" style={ styles } key={i}></i>)
    }
    return (
      <div className="control">
          <div className="tags">
            <span className="tag is-medium is-info">
              { dolarIcons }
            </span>
          </div>
      </div>
    )
  }

  

  const Hotel = ({hotel}) => {
      const { photo, name, description, city, country, rooms, price } = hotel;
    return (
      <div className="card">
    <div className="card-image">
      <figure className="image is-4by3">
        <img src={ photo } alt={ name } />
      </figure>
    </div>
    <div className="card-content">
      <p className="title is-4">{ name }</p>
      <p>{ description }</p>
      <div className="field is-grouped is-grouped-multiline" style={{marginTop: '1em'}}>
      <div className="control">
        <div className="tags has-addons">
          <span className="tag is-medium is-info"><i className="fas fa-map-marker"></i></span>
          <span className="tag is-medium">{`${ city }, ${ country }`}</span>
        </div>
      </div>
      <div className="control">
        <div className="tags has-addons">
          <span className="tag is-medium is-info"><i className="fas fa-bed"></i></span>
          <span className="tag is-medium">{`${ rooms } Habitaciones`}</span>
        </div>
      </div>
      <ShowPrice price={ price } />
      </div>
    </div>
    <div className="card-footer">
      <a href="#root" className="card-footer-item has-background-primary has-text-white has-text-weight-bold">Reservar</a>
    </div>
  </div>
    )
  }  

export default Hotel;