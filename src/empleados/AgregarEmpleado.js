import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function AgregarEmpleado() {
let navegacion = useNavigate();

    const [empleado, setEmpleado]=useState({
        nombre:"",
        departamento:"",
        sueldo:"",
        fechaIncorporacion:"",
        id_supervisor:"",
        rol:""
    })

    const{nombre, departamento, sueldo, fechaIncorporacion,id_supervisor,rol}=empleado

    const onInputChange = (e) => {
        //spread operator ... (expandir los atributos de nuestro objeto Empleado)
        setEmpleado({...empleado, [e.target.name]: e.target.value})
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        const urlBase = 'http://localhost:8080/rhapp/empleados';
        await axios.post(urlBase, empleado);
        //redirigimos a la página de inicio
        navegacion("/");
    }

  return (
    <div className='container'>
        <div className='container' text-center style={{margin: "30px"}}>
                <h3>Agregar Empleado</h3>
        </div>
        <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
                <label htmlFor="nombre" className="form-label">Nombre</label>
                <input type="text" className="form-control" id="nombre" 
                name='nombre' required={true} value={nombre} onChange={(e) => onInputChange(e)}/>
            </div>
            <div className="mb-3">
                <label htmlFor="departamento" className="form-label">Departamento</label>
                <input type="text" className="form-control" 
                id="departamento" name='departamento' value={departamento} onChange={(e) => onInputChange(e)}/>
            </div>
            <div className="mb-3">
                <label htmlFor="sueldo" className="form-label">Sueldo</label>
                <input type="text" className="form-control" 
                id="sueldo" name='sueldo' value={sueldo} onChange={(e) => onInputChange(e)}/>
            </div>
            <div className="mb-3">
                <label htmlFor="fechaIncorporacion" className="form-label">Fecha de Incorporación</label>
                <input type="date" className="form-control" 
                id="fechaIncorporacion" name='fechaIncorporacion' required={true} value={fechaIncorporacion} onChange={(e) => onInputChange(e)}/>
            </div>
            <div className="mb-3">
                <label htmlFor="id_supervisor" className="form-label">id_supervisor</label>
                <input type="text" className="form-control" 
                id="id_supervisor" name='id_supervisor' value={id_supervisor} onChange={(e) => onInputChange(e)}/>
            </div>
            <div className="mb-3">
                <label htmlFor="rol" className="form-label">Rol</label>
                <input type="text" className="form-control" 
                id="rol" name='rol' value={rol} onChange={(e) => onInputChange(e)}/>
            </div>
            <div className='text-center'>
            <button type="submit" className="btn btn-warning btn-sm me-3">Agregar</button>
            <a href="/" className='btn btn-danger btn-sm'>Volver</a>
            </div>
        </form>
        
    </div>
  )
}
