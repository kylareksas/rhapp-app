import axios from 'axios';
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { NumericFormat } from 'react-number-format';


export default function ListadoEmpleados() {

        const urlBase = 'http://localhost:8080/rhapp/empleados';

        const[empleados, setEmpleados] = useState([]);

        useEffect(() => {
            cargarEmpleados();
        },[]);

        const cargarEmpleados = async () => {
            const resultado = await axios.get(urlBase);
            console.log("Resultado de cargar empleados");
            console.log(resultado.data);
            setEmpleados(resultado.data);
        }

        const eliminarEmpleado = async (id) => {
            const confirmar = window.confirm("¿Está seguro de que desea eliminar este empleado?");
            if(confirmar){
            await axios.delete(`${urlBase}/${id}`);
            }
            cargarEmpleados();
        }

  return (
    <div className='Container'>
        <div className="container text-center" style={{margin: "30px"}}>
         <h3>Sistema de Recursos Humanos</h3>
        </div>

        <table className="table table-striped table-hover align-middle">
            <thead className='table-dark'>
                <tr>
                <th scope="col">ID</th>
                <th scope="col">Empleado</th>
                <th scope="col">Departamento</th>
                <th scope="col">Sueldo</th>
                <th scope="col">Fecha de Incorporacion</th>
                <th scope="col">ID_supervisor</th>
                <th scope="col">Rol</th>
                <th scope="col">Acciones</th>
                </tr>
            </thead>
            <tbody>
                {
                empleados.  map((empleado, indice) => (
                    <tr key={indice}>
                        <th scope="row">{empleado.idEmpleado}</th>
                        <td>{empleado.nombre}</td>
                        <td>{empleado.departamento}</td>
                        <td><NumericFormat value={empleado.sueldo}
                            displayType={'text'}
                            thousandSeparator="," 
                            prefix={'€'}
                            decimalScale={2}
                            fixedDecimalScale/>
                        </td>
                        <td> {format(new Date(empleado.fechaIncorporacion), 'yyyy-MM-dd')} </td>
                        <td>{empleado.id_supervisor}</td>
                        <td>{empleado.rol}</td>
                        <td className='text-center'>
                            <div>
                                <Link to={`/editar/${empleado.idEmpleado}`}
                                className='btn btn-warning btn-sm me-3'>Editar</Link>
                                <button onClick={()=> eliminarEmpleado(empleado.idEmpleado)} className='btn btn-danger btn-sm'> Eliminar </button>
                            </div>
                        </td>
                    </tr>
                ))  
                }              
            </tbody>
            </table>
    </div>
)
}