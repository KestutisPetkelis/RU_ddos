import React from 'react';
import {useState, useEffect} from 'react'
import './App.css';


function App() {
  const divStyle = {
    width: "100%", 
    minHeight: "100vh",
    marginTop: "0px",
    padding: "20px",
    backgroundColor: "aliceblue",
  };
  const arr = [
    "rt.com",
    "kremlin.ru",
    "smotrim.ru",
    "tass.ru",
    "tvzvezda.ru",
    "vsoloviev.ru",
    "1tv.ru",
    "vgtrk.ru",
    "zakupki.gov.ru",
    "vesti.ru",
    "online.sberbank.ru",
    "sberbank.ru",
    "vtb.ru",
    "duma.gov.ru",
    "rtr-planeta.com",
    "5-tv.ru",
    "rkn.gov.ru",
    "rg.ru",
    "government.ru",
    "data.gov.ru",
    "mchs.gov.ru",
    "ac.gov.ru",
    "svr.gov.ru",
    "gov.ru",
    "council.gov.ru",
    "premier.gov.ru",
    "minenergo.gov.ru",
    "economy.gov.ru",
    "edu.gov.ru",
    "torgi.gov.ru",
    "chechnya.gov.ru",
    "gosuslugi.ru",
    "epp.genproc.gov.ru",
    "ach.gov.ru",
    "scrf.gov.ru",
    "mil.ru",
  ]
  const arr2 = [
    "gazprom.ru",
    "lukoil.ru",
    "magnit.ru",
    "nornickel.com",
    "surgutneftegas.ru",
    "tatneft.ru",
    "evraz.com/ru",
    "nlmk.com",
    "sibur.ru",
    "severstal.com",
    "metalloinvest.com",
    "nangs.org",
    "rmk-group.ru/ru",
    "tmk-group.ru",
    "ya.ru",
    "polymetalinternational.com/ru",
    "uralkali.com/ru",
    "eurosib.ru",
    "omk.ru",
    // "sberbank.ru",
    // "vtb.ru",
    "gazprombank.ru",
    // "gosuslugi.ru",
    "mos.ru/uslugi",
    // "kremlin.ru",
    // "government.ru",
    // "mil.ru",
    "nalog.gov.ru",
    "customs.gov.ru",
    "pfr.gov.ru",
    // "rkn.gov.ru",
  ]
  const arrBig = arr.concat(arr2)
  const [RUWebsites, setRUWebsites] = useState(arrBig.map((site) => ({
    status: false,
    request: 0,
    site
  })))

  console.log('RUWebsites', RUWebsites)
  
  async function check(arrBig, index) {
    const options = {
      method: "GET",
      mode: "no-cors"
    }
    try {
      const request = await fetch("http://" + arrBig[index], options)
      const html = await request.text()
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      if (doc) {
        setRUWebsites(previousState => ({
          ...previousState, [index]: {
            site: arrBig[index],
            status: true,
            request: previousState[index]?.request + 1
          }
        }))
      }
    } catch (e) {
      setRUWebsites(previousState => ({
        ...previousState, [index]: {
          site: arrBig[index],
          status: false,
          request: previousState[index]?.request
        }
      }))
    }
  }

  const checkservers = () => {
    for (let i = 0; i < arrBig.length; i++) {
      check(arrBig, i)
    }
  }

  useEffect(() => {
    setInterval(() => {
      checkservers()
    }, 100);
  }, [])

  return (
    <div className="App" style={divStyle}>
      <h1>РУССКИЙ ВОЕННЫЙ КОРАБЛЬ, ИДИ НА ХУЙ</h1>
      {/* <button onClick={()=>checkservers()}>Check status</button> */}
      <div>
        <div className='title'>
         <b> <span>Site name </span>  <span> Status </span><span> Requests </span></b>
        </div>
        {/* {serverStatus.lengt>0 && */}
        {arrBig.map((x, i) => (
          <div key={i} className="d-flex">
            <span>{RUWebsites[i]?.site} </span> <span>{RUWebsites[i].status ? <span style={{color:"red"}}>ON</span> : <span style={{color:"blue"}}>OFF</span>} </span><span>{RUWebsites[i]?.request} </span>
          </div>
        ))
        }
      </div>
    </div>
  );
}

export default App;
