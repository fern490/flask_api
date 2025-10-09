import React, { useState } from 'react';

const PostulacionForm = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    email: '',
    localidad: '',
    edad: '',
    genero: '',
    comentarios: '',
  });
  const [cv, setCv] = useState(null);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = e => {
    setCv(e.target.files[0]);
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }
    if (cv) data.append('cv', cv);

    try {
      const response = await fetch('/api/postulaciones/', {
        method: 'POST',
        body: data,
      });

      if (response.ok) {
        alert('Postulación enviada correctamente');
      } else {
        alert('Error al enviar la postulación');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="nombre" placeholder="Nombre" onChange={handleChange} required />
      <input type="text" name="telefono" placeholder="Teléfono" onChange={handleChange} />
      <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
      <input type="text" name="localidad" placeholder="Localidad" onChange={handleChange} />
      <input type="number" name="edad" placeholder="Edad" onChange={handleChange} />
      <select name="genero" onChange={handleChange}>
        <option value="">Seleccionar género</option>
        <option value="Masculino">Masculino</option>
        <option value="Femenino">Femenino</option>
        <option value="Otro">Otro</option>
        <option value="Prefiero no decir">Prefiero no decir</option>
      </select>
      <textarea name="comentarios" placeholder="Comentarios" onChange={handleChange}></textarea>
      <input type="file" name="cv" accept=".pdf" onChange={handleFileChange} />
      <button type="submit">Enviar</button>
    </form>
  );
};

export default PostulacionForm;
