import React, { useEffect, useState } from "react";
import casa from './imagenes/casa.jpg';
import apto from './imagenes/apto.jpg';

function Espacios() {

    const url = "https://gist.githubusercontent.com/josejbocanegra/0067d2b28b009140fee423cfc84e40e6/raw/6e6b11160fbcacb56621b6422684d615dc3a0d33/spaces.json";
    const [espacios, setEspacios] = useState([]);
    useEffect(() => {
        const requestOptions = {
            method: "GET",

        };
        fetch(url, requestOptions)
        .then((res) => res.json())
          .then((data) => {
            console.log(data);
            setEspacios(data);
          })
          .catch();
    },[])

    const renderEspacios = (espacios, index) => {
        let tipo = apto
        if (espacios.type == "house"){
            tipo = casa;
        }
        
    
        return (
          /* <div id="cardRegistrar" className="card">
            <div className="container row">
              <div className="col">
                <img
                  scr="https://via.placeholder.com/150"
                  className="rounded float-left"
                  alt=""
                />
              </div>
              <div className="col">
                <h4>{viajes.direccion}</h4>
                <h5>Precio: $ {viajes.precio}</h5>
                <h5>Fecha salida: {viajes.fecha}</h5>
              </div>
              <div className="col justify-content-center">
                <button type="submit" className="btn-primary btn-block btn-lg">
                  Reservar
                </button>
              </div>
            </div>
          </div> */

    <div class="col-sm-3">
        <div className="card">
          <img src={tipo} class="card-img-top" />
          <div className="card-body">
            <h4 className="card-title">{espacios.name} </h4>
            <p class="card-text">{espacios.address} </p>
            <br />
          </div>
          </div>
      </div>

        );
      };

    return (
    <div>
    <h3 >My spaces</h3>
    <div className="row Cards">
    {espacios.map(renderEspacios)}
      </div>
      </div>
   
    );
}

export default Espacios;