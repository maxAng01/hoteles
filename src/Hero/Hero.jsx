import React from 'react';

const Hero = ({filters}) => {
    const options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'}
    const dateFrom = new Date(filters.dateFrom).toLocaleDateString('es-AR', options)
    const dateTo = new Date(filters.dateTo).toLocaleDateString('es-AR', options)
    return(
      <section className="hero is-primary">
      <div className="hero-body">
        <div className="container">
          <h1 className="title">Hoteles</h1>
          <h2 className="subtitle">
            desde el <strong>{ dateFrom }</strong> hasta el <strong>{ dateTo }</strong>
            { filters.country === 'select' ? '' : ` en ${filters.country}` }
            { filters.price === 'select' ? '' : ` por ${filters.price}` }
            { filters.rooms === 'select' ? '' : ` de hasta ${filters.rooms} habitaciones` }
          </h2>
        </div>
      </div>
    </section>
    )
  }

export default Hero;