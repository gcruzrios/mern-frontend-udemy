import React, { useEffect, useState } from 'react'
import {
    Link
  } from "react-router-dom";

export default function Nav() {

    const [menu, setMenu] = useState(false);

    useEffect(() => {
        if(localStorage.getItem('token')){
            setMenu(true);
        }
    }, [])

    const logout = ()=>{
        localStorage.clear();
        window.location.href='/'
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-2">
          
            <div className="container">
                <Link  className="navbar-brand" to="/">Inicio</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                {
                    menu?
                
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav  ml-auto">
                        <li className="nav-item ">
                            <Link  className="nav-link" to="/"> <i className="fas fa-user"></i> Bienvenido: {localStorage.getItem('nombre')}</Link>
                        </li>
                        <li className="nav-item">
                            <Link  className="nav-link" to="/" onClick={()=>logout()}> <i className="fas fa-user-times"></i> Salir</Link>
                        </li>
                    </ul>
                </div> 
                :    
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav  ml-auto">
                  
                        <li className="nav-item">
                            <Link  className="nav-link" to="/registro"><i className="fas fa-user-plus"></i> Registrar</Link>
                        </li>
                
                    </ul>
                </div>
                }

            </div>
            
        </nav>
    )
}
