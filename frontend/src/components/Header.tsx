import React from 'react';
import './Header.css';

const Header: React.FC = () => {
    return (
        <header className="header">
            <div className="container">
                <div className="header-content">
                    <div className="logo-section">
                        <h1 className="logo">
                            <span className="logo-icon">🚀</span>
                            MINICORE
                        </h1>
                        <p className="tagline">Sistema de Comisiones</p>
                    </div>
                    

                </div>
            </div>
        </header>
    );
};

export default Header;