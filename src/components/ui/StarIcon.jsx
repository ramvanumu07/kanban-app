// src/components/ui/StarIcon.jsx
import React from 'react';

function StarBadgeComponent({ isActive, onClick }) {
    const handleClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (onClick) {
            onClick(e);
        }
    };

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill={isActive ? "#3b82f6" : "none"}
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke={isActive ? "#3b82f6" : "#9ca3af"}
            onClick={handleClick}
            style={{
                cursor: 'pointer',
                width: '100%',
                height: '100%',
                transition: 'stroke 0.2s ease, fill 0.2s ease'
            }}
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
            />
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                stroke={isActive ? "white" : "#9ca3af"}
                d="M9 12.75 11.25 15 15 9.75"
            />
        </svg>
    );
}

export default StarBadgeComponent;