import { useState, useEffect } from 'react';
import Error from './Error';

const Formulario = ({pacientes, setPacientes, paciente, setPaciente}) => {
  const [nombre, setNombre] = useState('');
  const [propietario, setPropietario] = useState('');
  const [email, setEmail] = useState('');
  const [fecha, setFecha] = useState('');
  const [sintomas, setSintomas] = useState('');
  
  const [error, setError] = useState(false);

  useEffect(() => {
    if(Object.keys(paciente).length > 0){
      setNombre(paciente.nombre)
      setPropietario(paciente.propietario)
      setEmail(paciente.email)
      setFecha(paciente.fecha)
      setSintomas(paciente.sintomas)
    }
  }, [paciente])

  const generarId = () => {
    const random = Math.random().toString(36).substr(2);
    const fecha = Date.now().toString(36);
    return random + fecha;
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if([nombre, propietario, email, fecha, sintomas].includes('')){
      setError(true)
      return;
    }

    setError(false);

    const objetoPaciente = {
      nombre,
      propietario,
      email,
      fecha,
      sintomas,
    }

    if(paciente.id){
      objetoPaciente.id = paciente.id
      setPacientes(pacientes.map((pacienteState) => pacienteState.id === paciente.id ? objetoPaciente : pacienteState))
      setPaciente({})
    } else {
      objetoPaciente.id = generarId()
      setPacientes([...pacientes, objetoPaciente]);
    }

    setNombre('')
    setPropietario('')
    setEmail('')
    setFecha('')
    setSintomas('')
  }
  return (
    <div className="md:w-1/2 lg:w-2/5 mx-5 my-10">
        <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>

        <p className="text-lg mt-5 text-center mb-10">Añade Pacientes y {""} <span className="text-indigo-600 font-bold">Administralos</span></p>

        <form className="bg-white rounded-lg shadow-md py-10 px-5 mb-10" onSubmit={handleSubmit}>

          {error && <Error mensaje='Todos los campos son obligatorios' />}
          <div className="mb-5">
            <label htmlFor="mascota" className="block text-gray-700 uppercase font-bold">Nombre Mascota</label>
            <input type="text" className="border-2 w-full p-2 mt-2 rounded-md placeholder-gray-400" placeholder="Nombre de la Mascota" id="mascota" value={ nombre } onChange={ e => setNombre(e.target.value)} />
          </div>

          <div className="mb-5">
            <label htmlFor="propietario" className="block text-gray-700 uppercase font-bold">Nombre Propietario</label>
            <input type="text" className="border-2 w-full p-2 mt-2 rounded-md placeholder-gray-400" placeholder="Nombre del Propietario" id="propietario" value={propietario} onChange={ e => setPropietario(e.target.value)}/>
          </div>

          <div className="mb-5">
            <label htmlFor="email" className="block text-gray-700 uppercase font-bold">Email</label>
            <input type="email" className="border-2 w-full p-2 mt-2 rounded-md placeholder-gray-400" placeholder="Email del Propietario" id="email" value={email} onChange={ e => setEmail(e.target.value)}/>
          </div>

          <div className="mb-5">
            <label htmlFor="alta" className="block text-gray-700 uppercase font-bold">Fecha de Alta</label>
            <input type="date" className="border-2 w-full p-2 mt-2 rounded-md placeholder-gray-400" id="alta" value={fecha} onChange={ e => setFecha(e.target.value)}/>
          </div>

          <div className="mb-5">
            <label htmlFor="sintomas" className="block text-gray-700 uppercase font-bold">Síntomas</label>
            <textarea id="sintomas" className="border-2 w-full p-2 mt-2 rounded-md placeholder-gray-400" placeholder="Describe los Sintomas" value={sintomas} onChange={ e => setSintomas(e.target.value)}/>
          </div>

          <input type="submit" value={paciente.id ? 'Editar Paciente' : 'Agregar Paciente'} className="bg-indigo-600 w-full p-3 text-white rounded-md font-bold uppercase hover:bg-indigo-700 cursor-pointer transition-all"/>
        </form>
    </div>
  )
}

export default Formulario