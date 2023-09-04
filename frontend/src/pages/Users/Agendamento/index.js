import React, { useState } from 'react';


function Agendamento() {
  const [petName, setPetName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [phone, setPhone] = useState('');
  const [tipoServico, setTipoServico] = useState('Banho');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para lidar com o envio do formulário aqui
  };

  const formatPhoneNumber = (e) => {
    // Lógica para formatar o número de telefone aqui
  };

  return (
    <div className="container">
      <h1>Agendamento de Pet Shop</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="petName">Nome do Pet:</label>
        <input
          type="text"
          id="petName"
          name="petName"
          value={petName}
          onChange={(e) => setPetName(e.target.value)}
          required
          
        />

        <label htmlFor="ownerName">Nome do Dono:</label>
        <input
          type="text"
          id="ownerName"
          name="ownerName"
          value={ownerName}
          onChange={(e) => setOwnerName(e.target.value)}
          required
        />

        <label htmlFor="phone">Telefone:</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Digite o telefone com DDD"
          onInput={formatPhoneNumber}
        />

        <label htmlFor="tipo_servico">Tipo de Serviço:</label>
        <select
          id="tipo_servico"
          name="tipo_servico"
          value={tipoServico}
          onChange={(e) => setTipoServico(e.target.value)}
          required
        >
          <option value="Banho">Banho</option>
          <option value="Tosa">Tosa</option>
          <option value="Consulta Veterinária">Consulta Veterinária</option>
        </select>
        <br />

        <label htmlFor="appointmentDate">Data do Agendamento:</label>
        <input
          type="date"
          id="appointmentDate"
          name="appointmentDate"
          value={appointmentDate}
          onChange={(e) => setAppointmentDate(e.target.value)}
          required
        />

        <label htmlFor="appointmentTime">Horário do Agendamento:</label>
        <input
          type="time"
          id="appointmentTime"
          name="appointmentTime"
          value={appointmentTime}
          onChange={(e) => setAppointmentTime(e.target.value)}
          required
        />
        <button type="submit">Agendar</button>
      </form>
      <br />
    </div>
  );
}

export default Agendamento;





// display: flex;
//     flex-direction: column;
//     justify-content: center;
//     align-items: center;