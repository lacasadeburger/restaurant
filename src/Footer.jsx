import React from 'react';
import navLogo from "../src/assets/Logo.jpeg";

export default function Footer(){
    return(
        <footer className='footer'>
            <p>La Casa de Burger &copy; 2023</p>
            <div className="centered-content">
            <img src={navLogo} alt="logo" className="logoFooter" />
                <p>
                    Direccion: 700,0 m · Av. Diego Ramírez Pastor, 142<br/>
                    telefono: 602 59 72 10<br/>
                    WhatsApp: 602 59 72 10<br/>
                    Pedidos a domicilio, para llevar<br/>
                    para reservaciones llamar al telefono o por whatsapp
                </p>
            </div>
        </footer>
    )
}
