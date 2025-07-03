
import './App.css';
import { useState,useRef, useEffect,useMemo, useCallback } from 'react';

const API_URL = "https://api.exchangerate-api.com/v4/latest/";

function App() {
  const[amount,setAmount]=useState(1);
  const[fromCurrency,setFromCurrency]=useState("USD");
  const[toCurrency,setToCurrency]=useState("INR");
  const[exchangeRates,setExchangeRates]=useState({});
  const[convertedAmount,setConvertedAmount]=useState(null);

  const inputRef=useRef();

  useEffect(()=>{
    fetch(`${API_URL}${fromCurrency}`)
    .then((res)=>res.json())
    .then((data)=>setExchangeRates(data.rates))
    .catch((err)=>console.log("failed to fetch",err));
  },[fromCurrency]);
useEffect(()=>{
  inputRef.current.focus();
},[]);
const avlCurrency=useMemo(()=>
  Object.keys(exchangeRates),
  [exchangeRates]
  
);
const convert=useCallback(()=>{
  if(exchangeRates[toCurrency]){
    const rate=exchangeRates[toCurrency];
    setConvertedAmount((amount*rate).toFixed(2));
  }
},[amount,toCurrency,exchangeRates]);

  
  return (
    <div className="app">
      <h1>Currency Converter</h1>
      <div className="conveter">
        <input type="number"ref={inputRef} value={amount}
        onChange={(e)=>setAmount(e.target.value)}/>
        <select value={fromCurrency}
        onChange={(e)=>setFromCurrency(e.target.value)}>
          {avlCurrency.map((cur)=>(
            <option key={cur} value={cur}> {cur}</option>
          ))}
        </select>
        <span>to</span>
        <select value={toCurrency}
        onChange={(e)=>setToCurrency(e.target.value)}>
          {avlCurrency.map((cur)=>(
            <option key={cur} value={cur}> {cur}</option>
          ))}
        </select>
        <button onClick={convert}>convert</button>
        {convertedAmount && (
          <h2>
            {amount} {fromCurrency}= {convertedAmount} {toCurrency}
          </h2>
        )}
      </div>
    </div>
  );
}

export default App;
