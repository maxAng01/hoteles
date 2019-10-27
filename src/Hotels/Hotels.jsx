import React, {Component} from 'react';
import Hotel from './Hotel/Hotel';

class Hotels extends Component {
    render() {
      const { hotels } = this.props
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

export default Hotels;