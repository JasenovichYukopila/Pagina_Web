import React, { useState, useEffect } from 'react';
import { FaGlobe } from 'react-icons/fa';
import colors from '../utils/colors';

export default function SelectorIdioma() {
  const [idiomaActual, setIdiomaActual] = useState('es');
  const [mostrandoMenu, setMostrandoMenu] = useState(false);

  useEffect(() => {
    // Detectar cambio de idioma de Google Translate
    const interval = setInterval(() => {
      const frame = document.querySelector('iframe.goog-te-banner-frame');
      if (frame) {
        try {
          const innerDoc = frame.contentDocument || frame.contentWindow.document;
          const select = innerDoc.querySelector('.goog-te-combo');
          if (select && select.value !== idiomaActual) {
            setIdiomaActual(select.value || 'es');
          }
        } catch (e) {
          // Ignorar errores de cross-origin
        }
      }
    }, 500);

    return () => clearInterval(interval);
  }, [idiomaActual]);

  const cambiarIdioma = (nuevoIdioma) => {
    // Buscar el iframe de Google Translate
    const frames = document.getElementsByTagName('iframe');
    
    for (let i = 0; i < frames.length; i++) {
      if (frames[i].className === 'goog-te-banner-frame') {
        try {
          const innerDoc = frames[i].contentDocument || frames[i].contentWindow.document;
          const selectElement = innerDoc.querySelector('.goog-te-combo');
          
          if (selectElement) {
            selectElement.value = nuevoIdioma;
            selectElement.dispatchEvent(new Event('change'));
            setIdiomaActual(nuevoIdioma);
            setMostrandoMenu(false);
            return;
          }
        } catch (e) {
          console.error('Error al cambiar idioma:', e);
        }
      }
    }

    // Fallback: intentar con el elemento visible
    const visibleSelect = document.querySelector('.goog-te-combo');
    if (visibleSelect) {
      visibleSelect.value = nuevoIdioma;
      visibleSelect.dispatchEvent(new Event('change'));
      setIdiomaActual(nuevoIdioma);
      setMostrandoMenu(false);
    }
  };

  const idiomas = [
    { codigo: 'es', nombre: 'Español', bandera: '🇪🇸' },
    { codigo: 'en', nombre: 'English', bandera: '🇬🇧' }
  ];

  const idiomaSeleccionado = idiomas.find(i => i.codigo === idiomaActual) || idiomas[0];

  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={() => setMostrandoMenu(!mostrandoMenu)}
        style={{
          background: "rgba(255,255,255,0.15)",
          backdropFilter: "blur(10px)",
          border: "none",
          borderRadius: "12px",
          padding: "12px 16px",
          color: "white",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          fontSize: "14px",
          fontWeight: "600",
          transition: "all 0.3s"
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.background = "rgba(255,255,255,0.25)";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.background = "rgba(255,255,255,0.15)";
        }}
      >
        <FaGlobe />
        {idiomaSeleccionado.bandera} {idiomaSeleccionado.codigo.toUpperCase()}
      </button>

      {mostrandoMenu && (
        <>
          {/* Overlay para cerrar al hacer click fuera */}
          <div
            onClick={() => setMostrandoMenu(false)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 9
            }}
          />

          {/* Dropdown */}
          <div
            style={{
              position: 'absolute',
              top: '60px',
              right: 0,
              background: 'white',
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              overflow: 'hidden',
              zIndex: 10,
              minWidth: '180px'
            }}
          >
            {idiomas.map((idioma) => (
              <button
                key={idioma.codigo}
                onClick={() => cambiarIdioma(idioma.codigo)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: 'none',
                  background: idiomaActual === idioma.codigo ? colors.backgroundGray : 'white',
                  cursor: 'pointer',
                  textAlign: 'left',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: colors.textPrimary,
                  transition: 'all 0.3s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}
                onMouseOver={(e) => {
                  if (idiomaActual !== idioma.codigo) {
                    e.currentTarget.style.background = colors.backgroundGray;
                  }
                }}
                onMouseOut={(e) => {
                  if (idiomaActual !== idioma.codigo) {
                    e.currentTarget.style.background = 'white';
                  }
                }}
              >
                <span style={{ fontSize: '20px' }}>{idioma.bandera}</span>
                {idioma.nombre}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
