import React from 'react';

const Hero = ({filters}) => {
    const {dateFrom, dateTo, country, price, rooms} = filters;
    const options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'}
    const date_From = new Date(dateFrom).toLocaleDateString('es-AR', options)
    const date_To = new Date(dateTo).toLocaleDateString('es-AR', options)
    return(
      <section className="hero is-primary">
      <div className="hero-body">
        <div className="container">
          <h1 className="title">Hoteles</h1>
          <h2 className="subtitle">
            desde el <strong>{ date_From }</strong> hasta el <strong>{ date_To }</strong>
            { country === 'select' ? '' : ` en ${country}` }
            { price === 'select' ? '' : ` por ${price}` }
            { rooms === 'select' ? '' : ` de hasta ${rooms} habitaciones` }
          </h2>
        </div>
      </div>
    </section>
    )
  }

export default Hero;