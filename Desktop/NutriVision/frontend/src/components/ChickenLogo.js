import React from 'react';

function ChickenLogo() {
    return (
        <div className="chicken-logo">
            <svg viewBox="0 0 120 120" className="chicken-svg" aria-label="NutriVision chicken logo">
                <defs>
                    <linearGradient id="logoBg" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#fde68a" />
                        <stop offset="55%" stopColor="#fb923c" />
                        <stop offset="100%" stopColor="#f97316" />
                    </linearGradient>
                </defs>

                <rect x="5" y="5" width="110" height="110" rx="28" fill="url(#logoBg)" />

                <path
                    d="M35 74 C30 55, 42 38, 62 38 C82 38, 94 55, 88 76 C84 91, 72 99, 57 98 C45 97, 38 88, 35 74Z"
                    fill="#ffffff"
                    stroke="#111827"
                    strokeWidth="4"
                />

                <path
                    d="M47 39 C43 29, 51 24, 57 32 C61 22, 72 23, 70 36 C78 31, 86 37, 78 45"
                    fill="#ef4444"
                    stroke="#111827"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                <circle cx="67" cy="58" r="4" fill="#111827" />

                <path
                    d="M78 63 L96 70 L78 77 Z"
                    fill="#facc15"
                    stroke="#111827"
                    strokeWidth="4"
                    strokeLinejoin="round"
                />

                <path
                    d="M38 78 C25 78, 22 64, 34 59"
                    fill="none"
                    stroke="#111827"
                    strokeWidth="5"
                    strokeLinecap="round"
                />

                <path
                    d="M31 58 C22 52, 24 39, 35 38 C46 37, 51 48, 45 57"
                    fill="#fef3c7"
                    stroke="#111827"
                    strokeWidth="4"
                />

                <path
                    d="M26 49 C32 43, 37 43, 43 49"
                    fill="none"
                    stroke="#f97316"
                    strokeWidth="4"
                    strokeLinecap="round"
                />

                <path
                    d="M88 49 C98 38, 109 45, 101 58"
                    fill="none"
                    stroke="#111827"
                    strokeWidth="5"
                    strokeLinecap="round"
                />

                <path
                    d="M98 45 C105 41, 110 44, 112 50"
                    fill="none"
                    stroke="#fef3c7"
                    strokeWidth="5"
                    strokeLinecap="round"
                />

                <path
                    d="M51 98 L45 110"
                    stroke="#111827"
                    strokeWidth="4"
                    strokeLinecap="round"
                />

                <path
                    d="M66 98 L72 110"
                    stroke="#111827"
                    strokeWidth="4"
                    strokeLinecap="round"
                />
            </svg>
        </div>
    );
}

export default ChickenLogo;