import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import colors from '../utils/colors';

export default function BotonVolver({ ruta = "/home", texto = "Volver" }) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(ruta)}
      style={{
        background: 'none',
        border: 'none',
        color: colors.primary,
        fontSize: '14px',
        fontWeight: '600',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '8px 0',
        marginBottom: '15px',
        transition: 'all 0.3s'
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.color = colors.primaryLight;
        e.currentTarget.style.transform = 'translateX(-5px)';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.color = colors.primary;
        e.currentTarget.style.transform = 'translateX(0)';
      }}
    >
      <FaArrowLeft /> {texto}
    </button>
  );
}
