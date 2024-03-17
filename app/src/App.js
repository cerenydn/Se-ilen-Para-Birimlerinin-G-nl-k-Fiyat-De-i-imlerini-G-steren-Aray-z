
import './App.css';
import React, { useState } from 'react';
import axios from 'axios';

const CryptoInfo = () => {
  const [symbol, setSymbol] = useState('');
  const [data, setData] = useState({});
  const [error, setError] = useState('');

  const fetchCryptoData = async (url) => {
    try {
      const response = await axios.get(url);
      setData(response.data);
    } catch (error) {
      setError('Veriler alınamadı.');
    }
  };

  const handleSelectChange = (e) => {
    const selectedSymbol = e.target.value;
    setSymbol(selectedSymbol);
    const url = selectedSymbol === 'BTCUSD' ? 'https://api.gemini.com/v2/ticker/BTCUSD' : 'https://api.gemini.com/v2/ticker/ETHUSD';
    fetchCryptoData(url);
  };

  return (
    <div className='all'>

      <div className='navbar'>
        <div className='logo'>kripto.com </div>
        

        <input className='searchBox' placeholder='sitede arama yap ?' type='text' onChange={handleSelectChange}/> 
        <input className='signBox' placeholder='giriş yap/kayıt ol' type='text' onChange={handleSelectChange}/>
      </div>
      <h3>Kripto Para Birimlerinin Günlük Fiyat Bilgileri</h3>
      <select className='select' onChange={handleSelectChange}>
        <option value="">seçiniz</option>
        <option value="BTCUSD">BTCUSD</option>
        <option value="ETHUSD">ETHUSD</option>
      </select>
      
      {error && <p>{error}</p>}
      {symbol && (
        <div>
          <div className='box'> 
          <strong><p className='sembol'>{data.symbol}</p></strong>
          <p>Açılış: {data.open}</p>
          <p>Yüksek: {data.high}</p>
          <p>Düşük: {data.low}</p>
          <p>Kapanış: {data.close}</p>
          <p>Alış Teklifi: {data.ask}</p>
          <p>Satış Teklifi: {data.bid}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CryptoInfo;
