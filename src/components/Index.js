import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {
    Link
} from "react-router-dom";
import Swal from 'sweetalert2';

export default function Index() {

    
    const [empleados,setEmpleados] = useState([]);
    const [nombre, setNombre] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [identificacion, setIdentificacion] = useState('');
    const [puesto, setPuesto] = useState('');
    const [tcontratos, setTcontratos] = useState([]);
    const [contratoSelect, setContratoSelect] = useState('');


    let Empleados = [];

    const url = 'http://localhost:4000';

    useEffect(() => {

        obtenerEmpleados();
        setTcontratos(['Fijo', 'Temporal', 'Practicante']);
        setContratoSelect('Fijo');

    }, [])


    const obtenerEmpleados= async() => {
        
        const idUsuario = localStorage.getItem('idUsuario');
        const token = localStorage.getItem('token');

        const respuesta = await axios.get(`/empleado/listar-empleados-jefe/${idUsuario}`,{headers:{token:token}})
      
        //console.log(respuesta.data);
        Empleados = respuesta.data;
        //console.log(Empleados.respuesta)
        setEmpleados(respuesta.data);
        //console.log(empleados);
       
    }

    const guardar = async(e) =>{
        e.preventDefault();

        const usuario={
            nombre,
            apellidos,
            identificacion,
            puesto,
            tcontrato:contratoSelect,
            jefe:localStorage.getItem('idUsuario')

        }

        console.log(usuario);

        const token = localStorage.getItem('token');

        const respuesta = await axios.post(`/empleado/crear`,usuario,{headers:{token:token}})
        const mensaje = respuesta.data.mensaje;
        Swal.fire({
            icon: 'success',
            title: mensaje,
            showConfirmButton: false,
            timer: 1000
        })
        setTimeout(()=>{
            window.location.href='/index'
        },1500)
    }

    const eliminar = async (id)=>{
        const token = localStorage.getItem('token');
        const respuesta = await axios.delete(`/empleado/eliminar/${id}`,{headers:{token:token}})

        const mensaje = respuesta.data.mensaje;
        Swal.fire({
            icon: 'success',
            title: mensaje,
            showConfirmButton: false,
            timer: 1500
        })
        obtenerEmpleados();
    }

    const buscar = async (e)=>{

        const idUsuario = localStorage.getItem('idUsuario');
        
        console.log(idUsuario);

        if (e.target.value===''){
            obtenerEmpleados();
        }
        const buscar= e.target.value
        const token = localStorage.getItem('token');
        const respuesta = await axios.get(`/empleado/buscar/${buscar}/${idUsuario}`,{headers:{token:token}})



        setEmpleados(respuesta.data);

    }
    return (
        <>
        <div>
            <header className="py-2 bg-primary text-white">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <h1> <i className="fas fa-pencil-alt"> </i> Empleados </h1>
                        </div>
                    </div>
                </div>
            </header>
        
    
            <nav className="navbar py-4">
                <div className="container">
                    <div className="col-md-3">
                        <Link to="#" className="btn btn-primary btn-block" data-toggle="modal" data-target="#addEmpleado"> <i className="fas fa-plus"></i> Add Empleado</Link>               
                    </div>
                    <div className="col-md-6 ml-auto">
                        <div className="input-group">
                            <input type="search" name="" id="" placeholder="Buscar ..." aria-label="Search" onChange={(e)=>buscar(e)} />
                        </div>
                    </div>
                </div>
            </nav>
            {/* Mostrar Empleados */}
            <section>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-header">
                                    <h4>Empleados de: {localStorage.getItem('nombre')}</h4>
                                </div>
                                
                                <table className="table table-responsive-lg table-striped">
                                    <thead className="thead-dark">
                                        <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Nombre</th>
                                        <th scope="col">Apellidos</th>
                                        <th scope="col">Identificacion</th>
                                        <th scope="col">Puesto</th>
                                        <th scope="col">Tipo de contrato</th>
                                        <th scope="col">Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        //
                                        //console.log(empleados.respuesta)
                                        //console.log(Empleados.length)
                                    }
                                          {
                                             
                                            (empleados.length > 0)&&

                                            empleados.map ((empleado,i)=>(
                                            
                                            //empleados.map((empleado,i)=>(
                                            <tr key={empleado._id}>
                                                <td>{i+1}</td>
                                                <td>{empleado.nombre}</td>
                                                <td>{empleado.apellidos}</td>
                                                <td>{empleado.identificacion}</td>
                                                <td>{empleado.puesto}</td>
                                                <td>{empleado.tcontrato}</td>
                                                <td> 
                                                    <Link to={`/editar/${empleado._id}`} className="btn btn-warning">Editar </Link>
                                                    <button className="btn btn-danger" onClick={()=>eliminar(empleado._id)}>Eliminar</button>
                                                </td>
                                               
                                            </tr>
                                            ))
                                        }   
                                        
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>    
                </div>
                
            </section>

            {/* MODAL */}
            <div className="modal fade" id="addEmpleado">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header bg-primary text-white">
                            <h5 className="modal-title">Add Empleado</h5>
                            <button className="close" data-dismiss="modal">
                                <span>&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={guardar}>
                                <div className="form-group">
                                        <label htmlFor="Nombre">Nombre</label>
                                        <input type="text" name=""  className="form-control" required placeholder="Nombre" 
                                        onChange={(e)=>setNombre(e.target.value)}/>
                                </div> 
                                <div className="form-group">
                                        <label htmlFor="Nombre">Apellidos</label>
                                        <input type="text" name=""  className="form-control" required placeholder="Apellidos"
                                        onChange={(e)=>setApellidos(e.target.value)} />
                                </div> 
                                <div className="form-group">
                                        <label htmlFor="Nombre">Identificacion</label>
                                        <input type="text" name=""  className="form-control" required placeholder="Identificacion"
                                        onChange={(e)=>setIdentificacion(e.target.value)}/>
                                </div> 
                                <div className="form-group">
                                        <label htmlFor="Nombre">Puesto</label>
                                        <input type="text" name=""  className="form-control" required placeholder="Puesto"
                                        onChange={(e)=>setPuesto(e.target.value)}/>
                                </div> 
                                <div className="form-group">
                                        <label htmlFor="Nombre">Tipo de Contrato</label>
                                        <select className="form-control" 
                                        onChange={(e)=>setContratoSelect(e.target.value)}>
                                            {
                                                tcontratos.map(tcontrato=>(
                                                    <option key={tcontrato} value="">{tcontrato}</option>
                                                ))
                                            }
                                        </select>    
                                </div> 
                                 <div className="form-group">
                                    <button className="btn btn-primary" type="submit">Guardar</button> 

                                 </div>


                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div> 
        </>
    )
}
