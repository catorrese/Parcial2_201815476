import React, { useEffect, useState } from "react";
import casa from "./imagenes/casa.jpg";
import apto from "./imagenes/apto.jpg";
import living from "./imagenes/living.jpg";
import kitchen from "./imagenes/kitchen.jpg";
import dining from "./imagenes/dining.jpg";
import { FormattedMessage } from "react-intl";
import * as d3 from "d3";

function Espacios() {
  const canvas = d3.select("#canvas");
  const url =
    "https://gist.githubusercontent.com/josejbocanegra/0067d2b28b009140fee423cfc84e40e6/raw/6e6b11160fbcacb56621b6422684d615dc3a0d33/spaces.json";
  const [espacios, setEspacios] = useState([]);
  let painted = false;
  const url2 =
    "https://gist.githubusercontent.com/josejbocanegra/92c90d5f2171739bd4a76d639f1271ea/raw/9effd124c825f7c2a7087d4a50fa4a91c5d34558/rooms.json";
  const [rooms, setRooms] = useState([]);

  const [dispositivos, setDispositivos] = useState([]);

  const [chart, setChart] = useState([]);
  const [chart2, setChart2] = useState([]);

  useEffect(() => {
    if (!navigator.onLine) {
      if (localStorage.getItem("Espacios") === null) {
        setEspacios([]);
      } else {
        setEspacios(localStorage.getItem("Espacios"));
      }
    } else {
      const requestOptions = {
        method: "GET",
      };
      fetch(url, requestOptions)
        .then((res) => res.json())
        .then((data) => {
          setEspacios(data);
          localStorage.setItem("Espacios", data);
        })
        .catch();
    }
  }, []);

  function loadRooms(id) {
    if (!navigator.onLine) {
      if (localStorage.getItem("Rooms") === null) {
        setRooms([]);
      } else {
        setRooms(localStorage.getItem("Rooms"));
      }
    } else {
      const requestOptions = {
        method: "GET",
      };
      fetch(url2, requestOptions)
        .then((res) => res.json())
        .then((data) => {
          let data2 = [];
          let data3 = [];
          let objeto = [];
          let data4 = [];
          let objeto2 = [];
          data.forEach((element) => {
            if (element.homeId == id) {
              data2.push(element);
              /* objeto[element.name] = element.powerUsage.value;  */
              objeto.push(element.name);
              objeto2.push(element.powerUsage.value)
            }
          });
          data3.push(objeto);
          data4.push(objeto2);
          setRooms(data2);
          setChart(data3);
          setChart2(data4);
          localStorage.setItem("Rooms", data2);
        })
        .catch();
    }
  }

  const renderEspacios = (espacios, index) => {
    let tipo = apto;
    if (espacios.type === "house") {
      tipo = casa;
    }

    return (
      <div className="col-sm-3">
        <div className="card">
          <img src={tipo} className="card-img-top" height="240px" />
          <div className="card-body">
            <h4 className="card-title">{espacios.name} </h4>
            <p className="card-text">{espacios.address} </p>
            <a
              className="stretched-link"
              onClick={() => {
                loadRooms(espacios.id);
              }}
            ></a>
            <br />
          </div>
        </div>
      </div>
    );
  };

  const renderRooms = (rooms, index) => {
    if (chart2.length != 0 && !painted){
      if(navigator.onLine){
        renderPieChart(chart2[0]);
        painted = true;
      }
      
    }
    
    let tipo = living;
    switch (rooms.name) {
      case "Kitchen":
        tipo = kitchen;
        break;
      case "Dinner room":
        tipo = dining;
        break;
      default:
        break;
    }

    return (
      <div className="col-sm-4">
        <div className="card">
          <img src={tipo} className="card-img-top" height="240px" />
          <div className="card-body">
            <h4 className="card-title">{rooms.name} </h4>
            <p className="card-text">{rooms.address} </p>
            <a
              className="stretched-link"
              onClick={() => {
                setDispositivos(rooms.devices);
              }}
            ></a>
            <br />
          </div>
        </div>
      </div>
    );
  };

  const renderDispositivos = (dispositivos, index) => {
    let valor = dispositivos.desired.value;
    if (valor === false) {
      valor = "false";
    }
    return (
      <tr>
        <th scope="row">{index + 1}</th>
        <td>{dispositivos.id}</td>
        <td>{dispositivos.name}</td>
        <td>{valor}</td>
      </tr>
    );
  };

  function renderPieChart(data){
    
    var svg = d3.select("svg"),
        width = svg.attr("width"),
        height = svg.attr("height"),
        radius = Math.min(width, height) / 2,
        g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")

    var color = d3.scaleOrdinal(['#4daf4a','#377eb8','#ff7f00','#984ea3','#e41a1c']);

    // Generate the pie
    var pie = d3.pie();

    // Generate the arcs
    var arc = d3.arc()
                .innerRadius(0)
                .outerRadius(radius -20);

    //Generate groups
    var arcs = g.selectAll("arc")
                .data(pie(data))
                .enter()
                .append("g")
                .attr("class", "arc").on("mouseover", function (d) {
                  
        
               });

    //Draw arc paths
    arcs.append("path")
        .attr("fill", function(d, i) {
            return color(i);
        })
        .attr("d", arc);

       var tooltip = d3.select("body")
        .append("div")
        .style("position", "absolute")
        .style("z-index", "10")
        .style("visibility", "hidden")
        .style("background", "#000")
        .text("a simple tooltip");

        svg.append("g")
        .attr("transform", "translate(" + (width / 2 - 105) + "," + 15 + ")")
        .append("text")
        .text("Power usage (kwH) - Today")
        .attr("class", "title")
  }

  return (
    <div>
      <h3>
        <FormattedMessage id="Spaces" />
      </h3>
      <div className="row Cards">{espacios.map(renderEspacios)}</div>
      <h3>
        <FormattedMessage id="Rooms" />
      </h3>
      <div className="row">
        <div className="col-sm-6">
          <div className="row Cards">{rooms.map(renderRooms)}</div>
        </div>
        <div className="col-sm-6">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">ID</th>
                <th scope="col">
                  <FormattedMessage id="Device" />
                </th>
                <th scope="col">
                  <FormattedMessage id="Value" />
                </th>
              </tr>
            </thead>
            <tbody>{dispositivos.map(renderDispositivos)}</tbody>
          </table>
        </div>
      </div>
      <div className="col-sm-12 svg-container">
      <h3>
        <FormattedMessage id="Stats" />
      </h3>
        <svg className="graf" width="500" height="400"> </svg>
        </div>
    </div>
  );
}

export default Espacios;
