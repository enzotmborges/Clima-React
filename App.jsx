import React, { useState } from 'react';

import './App.css';

function App() {
  const [cidade, setCidade] = useState('');
  const [previsao, setPrevisao] = useState(null);
  const chave = '3dfbc6ac607259bf51a123037c07017a';

  const api = async () => {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${chave}`);
      const data = await response.json();
      setPrevisao(data);
    } catch (error) {
      console.error('Erro ao obter previsão do tempo:', error);
    }
  };

  const conversao = (temp) => {
    return (temp - 273.15).toFixed(2); // Convertendo temperatura de Kelvin para Celsius
  };

  return (
    <div className="App">
      <h1>Previsão do Tempo ☁</h1>

      <input
        type="text"
        className="nomedacidade"
        value={cidade}
        onChange={(e) => setCidade(e.target.value)}
        placeholder="Digite o nome da cidade"
      />

      <button onClick={api} className="obter">
        Obter Previsão do Tempo
      </button>

      {previsao && (
        <div className="info">
          <p><b>Data:</b> {new Date().toLocaleDateString('pt-BR')}</p>
          <h3>{previsao.weather[0].description}</h3>
          <p><b>Graus:</b> {conversao(previsao.main.temp)}ºC</p>
          <p><b>Vento:</b> {previsao.wind.speed} m/s</p>
          <p><b>Umidade:</b> {previsao.main.humidity}%</p>
        </div>
      )}
    </div>
  );
}

export default App;
// completei o codigo com gpt porque perdi uma aula, mas esta funcionando normalmente