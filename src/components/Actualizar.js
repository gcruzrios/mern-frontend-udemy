import React, {useEffect, useState } from 'react'
import axios from 'axios';
import Swal from 'sweetalert2';

export default function Actualizar(props) {

    const url = 'http://localhost:4000';


    const [nombre, setNombre] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [identificacion, setIdentificacion] = useState('');
    const [puesto, setPuesto] = useState('');
    const [tcontratos, setTcontratos] = useState([]);
    const [contratoSelect, setContratoSelect] = useState('');
    
    useEffect(() => {
        obtenerEmpleado();
        setTcontratos(['Fijo', 'Temporal', 'Practicante']);
        setContratoSelect('Fijo');

    }, [])


    const obtenerEmpleado= async() => {
        
        const id = props.match.params.id;
        const token = localStorage.getItem('token');

        const respuesta = await axios.get(`/empleado/listar-empleado/${id}`,{headers:{token:token}})
      
        console.log(respuesta.data);
        
        setNombre(respuesta.data.nombre);
        setApellidos(respuesta.data.apellidos);
        setIdentificacion(respuesta.data.identificacion);
        setPuesto(respuesta.data.puesto);
        setContratoSelect(respuesta.data.tcontrato);
       
    }

    const editar = async (e) =>{
        e.preventDefault();
        const id = props.match.params.id;
        const token = localStorage.getItem('token');



        const empleado={
            nombre,
            apellidos,
            identificacion,
            puesto,
            tcontrato:contratoSelect,
            
        }

        console.log(empleado);

        const respuesta = await axios.put(`/empleado/actualizar/${id}`, empleado, {headers:{token:token}})
        
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

    return (
        <div className="container col-md-6 mt-4">

            <div className="card">
                <div className="card-header">
                    <h3>Editar</h3>
                    <div className="card-body">

                    <form onSubmit={editar}>
                        <div className="form-group">
                                <label htmlFor="Nombre">Nombre</label>
                                <input type="text"  value={nombre} className="form-control" required placeholder="Nombre" 
                                onChange={(e)=>setNombre(e.target.value)}/>
                        </div> 
                        <div className="form-group">
                                <label htmlFor="Nombre">Apellidos</label>
                                <input type="text"  value={apellidos} className="form-control" required placeholder="Apellidos"
                                onChange={(e)=>setApellidos(e.target.value)} />
                        </div> 
                        <div className="form-group">
                                <label htmlFor="Nombre">Identificacion</label>
                                <input type="text"  value={identificacion} className="form-control" required placeholder="Identificacion"
                                onChange={(e)=>setIdentificacion(e.target.value)}/>
                        </div> 
                        <div className="form-group">
                                <label htmlFor="Nombre">Puesto</label>
                                <input type="text" value={puesto} className="form-control" required placeholder="Puesto"
                                onChange={(e)=>setPuesto(e.target.value)}/>
                        </div> 
                        <div className="form-group">
                                <label htmlFor="Nombre">Tipo de Contrato</label>

                                <select className="form-control" 
                                onChange={(e)=>setContratoSelect(e.target.value)} value={contratoSelect}>
                                    {
                                        tcontratos.map(tcontrato=>(
                                            <option key={tcontrato}>{tcontrato}</option>
                                        ))
                                    }
                                </select>

                                    
                        </div> 
                            <div className="form-group">
                            <button className="btn btn-warning" type="submit">Actualizar</button> 

                            </div>


                        </form>

                    </div>
                </div>
            </div>
        </div>



    )
}
