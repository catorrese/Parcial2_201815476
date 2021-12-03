import React, { useEffect, useState } from "react";
import casa from "./imagenes/casa.jpg";
import apto from "./imagenes/apto.jpg";
import living from "./imagenes/living.jpg";

function Espacios() {
  const url =
    "https://gist.githubusercontent.com/josejbocanegra/0067d2b28b009140fee423cfc84e40e6/raw/6e6b11160fbcacb56621b6422684d615dc3a0d33/spaces.json";
  const [espacios, setEspacios] = useState([]);

  const url2 = "https://gist.githubusercontent.com/josejbocanegra/92c90d5f2171739bd4a76d639f1271ea/raw/9effd124c825f7c2a7087d4a50fa4a91c5d34558/rooms.json";
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const requestOptions = {
      method: "GET",
    };
    fetch(url, requestOptions)
      .then((res) => res.json())
      .then((data) => {
       
        setEspacios(data);
      })
      .catch();
  }, []);


  function loadRooms(id){
    const requestOptions = {
        method: "GET",
      };
      fetch(url2, requestOptions)
        .then((res) => res.json())
        .then((data) => {
          let data2=[]
          data.forEach(element => {
              if(element.homeId == id){
                  data2.push(element)
              }
          });
          setRooms(data2);
        })
        .catch();
  }

  const renderEspacios = (espacios, index) => {
    let tipo = apto;
    if (espacios.type == "house") {
      tipo = casa;
    }

    return (
      <div class="col-sm-3">
        <div className="card">
          <img src={tipo} class="card-img-top" />
          <div className="card-body">
            <h4 className="card-title">{espacios.name} </h4>
            <p class="card-text">{espacios.address} </p>
            <a  class="stretched-link" onClick={() => {loadRooms(espacios.id)}}></a>
            <br />
          </div>
        </div>
      </div>
    );
  };

  const renderRooms = (rooms, index) => {

    let tipo = living;
    

    return (
      <div class="col-sm-3">
        <div className="card">
          <img src={tipo} class="card-img-top" />
          <div className="card-body">
            <h4 className="card-title">{rooms.name} </h4>
            <p class="card-text">{rooms.address} </p>
            <a href="#" class="stretched-link"></a>
            <br />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <h3>My spaces</h3>
      <div className="row Cards">{espacios.map(renderEspacios)}</div>
      <h3>My Rooms</h3>
      <div className="row Cards">{rooms.map(renderRooms)}</div>
    </div>
  );
}

export default Espacios;
