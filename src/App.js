import React from 'react';
import {useState, useEffect} from 'react'
import './App.css';


function App() {
  const divStyle = {
    width: "100%", 
    minHeight: "100vh",
    // border: "1px solid blue",
    marginTop: "0px",
    // marginBottom: "10px",
    // marginLeft: "10px",
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
  const [serverStatus, setServerStatus] = useState([])
  const [checked, setChecked] = useState(false)
  // console.log (arrBig)
  let b=[]
  function check(arrBig,index, arrStatus) {
    const options ={
      method: "GET",
      mode: "no-cors"
    }
   // console.log(arrBig[index])
    fetch("http://"+arrBig[index], options)
    .then(res =>res.text())
    .then(html =>{
      // Convert the HTML string into a document object
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      //console.log("answer from server ",arrBig[index], doc)
      if(doc){
      arrStatus[index]={
        site: arrBig[index],
        status: true,
        request: 0
      }
     // console.log("TRUE ", arrStatus)
    }
     
    }).catch(e =>{
      //console.log("error from server ", arrBig[index], e)
      if(e)
      {arrStatus[index]={
        site: arrBig[index],
        status: false,
        request: 0
      }

      //console.log("FALSE ", arrStatus)
    }

    })
    // console.log(" some info inside ", arrStatus)
    //setServerStatus([...arrStatus])
    setChecked(true)
    return (arrStatus)
  }

  const checkservers = ()=>{
    setChecked(false)
    let arrStatus=[]
      for( let i=0; i<arrBig.length; i++){
       b=check(arrBig,i,arrStatus)
       
    }
    setServerStatus(...[arrStatus])
    console.log(" server status....", arrStatus, serverStatus, "checked? ", checked, "b? ",b)
    return (arrStatus)
  }

  //  useEffect(() =>{
  //    let a=[]
    // const fechtPooling = setInterval(() => {
    //   checkservers()
    //   //setServerStatus(...[a])
    //    console.log("zzzzzzzzzzzzzzzzzzzzzzzzzzzz")
    
    //   return () => clearInterval(fechtPooling)
    // }, 1000);
  // },[])
  console.log("server status  ",serverStatus)
  return (
    <div className="App" style={divStyle}>
      <button onClick={()=>checkservers()}>Check status</button>
      <div>
          <span>Site name </span> <span>Status </span>
          {/* {serverStatus.lengt>0 && */}
            {serverStatus.map((x,i) =>(
              <div key={i} className="d-flex">
                <span>{x.site} </span> <span>{x.status ? <p>ON</p> : <p>OFF</p>} </span><span>{x.request} </span>
              </div>
            ))
          }  
      </div>
    </div>
  );
}

export default App;
