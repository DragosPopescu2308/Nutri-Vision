import React from 'react';
import '../styles/AnimatedLogo.css';

function AnimatedLogo() {
    return (
        <div className="animated-logo-container">
            <svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg">
                {/* Corp piept de pui */}
                <ellipse cx="100" cy="100" rx="45" ry="60" fill="#ffe0b2" stroke="#e0a96d" strokeWidth="4"/>
                {/* Piept - detalii */}
                <ellipse cx="100" cy="120" rx="25" ry="35" fill="#fff3e0" opacity="0.7"/>
                {/* Cap */}
                <ellipse cx="100" cy="55" rx="22" ry="28" fill="#ffe0b2" stroke="#e0a96d" strokeWidth="3"/>
                {/* Ochi */}
                <ellipse cx="92" cy="55" rx="3" ry="5" fill="#333"/>
                <ellipse cx="108" cy="55" rx="3" ry="5" fill="#333"/>
                {/* Zâmbet */}
                <path d="M92 68 Q100 75 108 68" stroke="#e57373" strokeWidth="3" fill="none"/>
                {/* Sprâncene */}
                <path d="M88 48 Q92 45 96 48" stroke="#333" strokeWidth="2" fill="none"/>
                <path d="M104 48 Q108 45 112 48" stroke="#333" strokeWidth="2" fill="none"/>
                {/* Cioc */}
                <polygon points="98,62 102,62 100,68" fill="#ffb300"/>
                {/* Braț stânga */}
                <g className="chicken-arm left-arm">
                    <ellipse cx="45" cy="90" rx="18" ry="10" fill="#ffe0b2" stroke="#e0a96d" strokeWidth="3"/>
                    <ellipse cx="30" cy="70" rx="10" ry="18" fill="#ffe0b2" stroke="#e0a96d" strokeWidth="3" transform="rotate(-20 30 70)"/>
                    {/* Pumn */}
                    <ellipse cx="22" cy="52" rx="7" ry="10" fill="#ffe0b2" stroke="#e0a96d" strokeWidth="2"/>
                    {/* Mușchi */}
                    <ellipse cx="55" cy="80" rx="7" ry="12" fill="#fff3e0" opacity="0.7" transform="rotate(-20 55 80)"/>
                </g>
                {/* Braț dreapta */}
                <g className="chicken-arm right-arm">
                    <ellipse cx="155" cy="90" rx="18" ry="10" fill="#ffe0b2" stroke="#e0a96d" strokeWidth="3"/>
                    <ellipse cx="170" cy="70" rx="10" ry="18" fill="#ffe0b2" stroke="#e0a96d" strokeWidth="3" transform="rotate(20 170 70)"/>
                    {/* Pumn */}
                    <ellipse cx="178" cy="52" rx="7" ry="10" fill="#ffe0b2" stroke="#e0a96d" strokeWidth="2"/>
                    {/* Mușchi */}
                    <ellipse cx="145" cy="80" rx="7" ry="12" fill="#fff3e0" opacity="0.7" transform="rotate(20 145 80)"/>
                </g>
                {/* Piept - linie de forță */}
                <path d="M100 130 Q100 140 110 135" stroke="#e0a96d" strokeWidth="3" fill="none"/>
            </svg>
        </div>
    );
}

export default AnimatedLogo;
