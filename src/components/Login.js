import axios from 'axios';
import React, { useState } from 'react'
import Swal from 'sweetalert2';
export default function Login() {

    const [correo, setCorreo] = useState('');
    const [contrasena, setContrasena] = useState('')

    const url = 'http://localhost:4000';
    const login= async(e) =>{
        e.preventDefault();

        const usuario = {correo, contrasena}
        const respuesta= await axios.post(`/jefe/login`, usuario);
        console.log(respuesta);
        const mensaje = respuesta.data.mensaje;

        if(mensaje !=='Bienvenido'){
            
            
            Swal.fire({
               
                icon: 'error',
                title: mensaje,
                showConfirmButton: false,
                timer: 1500
            })

        }else{
            
            const token = respuesta.data.token;
            const nombre = respuesta.data.nombre;
            const idUsuario = respuesta.data.id;
             
         
            localStorage.setItem('token', token);
            localStorage.setItem('nombre', nombre);
            localStorage.setItem('idUsuario', idUsuario);
            
            window.location.href='/index'
        }

    }

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 mx-auto">
                    <div className="card">
                        <div className="container text-center mt-3">
                            <i className="fas fa-user fa-3x mb-3"></i>
                        </div>
                        <div className="card-header text-center">
                            <h4>Inicio de Sessión Jefe</h4>
                        </div>
                        <div className="card-body">
                            <form onSubmit={ login }>
                                <div className="form-group">
                                    <label htmlFor="correo">Correo</label>
                                    <input type="email" className="form-control" autoFocus name="" id="" required onChange={(e)=>setCorreo(e.target.value)}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="contrasena">Contraseña</label>
                                    <input type="password" className="form-control" name="" id="" required onChange={(e)=>setContrasena(e.target.value)}/>
                                </div>
                                <input type="submit" className="btn btn-primary btn-block" value="Enviar"/>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
