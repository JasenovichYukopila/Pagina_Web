import React, { useEffect, useState } from 'react';
import { FaGlobe } from 'react-icons/fa';
import colors from '../utils/colors';
import toast from 'react-hot-toast';

export default function SelectorIdiomaGoogle() {
  const [idiomaActual, setIdiomaActual] = useState('es');
  const [mostrandoMenu, setMostrandoMenu] = useState(false);
  const [googleListo, setGoogleListo] = useState(false);

  useEffect(() => {
    // Solo cargar el script UNA vez
    if (!window.googleTranslateLoaded) {
      window.googleTranslateLoaded = true;

      // Función de inicialización
      window.googleTranslateElementInit = function() {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: 'es',
            includedLanguages: 'es,en',
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false
          },
          'google_translate_element'
        );
      };

      // Cargar script
      const script = document.createElement('script');
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.body.appendChild(script);
    }

    // Verificar cada segundo si Google Translate está listo
    const interval = setInterval(() => {
      const selectElement = document.querySelector('.goog-te-combo');
      if (selectElement) {
        setGoogleListo(true);
        clearInterval(interval);
      }
    }, 500);

    // Limpiar después de 10 segundos
    const timeout = setTimeout(() => {
      clearInterval(interval);
      if (!googleListo) {
        console.warn('Google Translate no se cargó en 10 segundos');
      }
    }, 10000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [googleListo]);

  const cambiarIdioma = (nuevoIdioma) => {
    if (!googleListo) {
      toast.error('⏳ Esperando que cargue el traductor...');
      return;
    }

    // Buscar el select de Google Translate
    const selectElement = document.querySelector('.goog-te-combo');
    
    if (selectElement) {
      selectElement.value = nuevoIdioma;
      selectElement.dispatchEvent(new Event('change'));
      setIdiomaActual(nuevoIdioma);
      setMostrandoMenu(false);
      toast.success(nuevoIdioma === 'es' ? '🇪🇸 Español' : '🇬🇧 English');
    } else {
      toast.error('⚠️ No se pudo cambiar el idioma. Recarga la página.');
    }
  };

  const idiomas = [
    { codigo: 'es', nombre: 'Español', bandera: '🇪🇸' },
    { codigo: 'en', nombre: 'English', bandera: '🇬🇧' }
  ];

  const idiomaSeleccionado = idiomas.find(i => i.codigo === idiomaActual) || idiomas[0];

  return (
    <>
      {/* Elemento oculto de Google Translate */}
      <div id="google_translate_element" style={{ display: 'none' }} />

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
            transition: "all 0.3s",
            opacity: googleListo ? 1 : 0.5
          }}
          onMouseOver={(e) => {
            if (googleListo) {
              e.currentTarget.style.background = "rgba(255,255,255,0.25)";
            }
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.15)";
          }}
        >
          <FaGlobe />
          {googleListo ? (
            <>{idiomaSeleccionado.bandera} {idiomaSeleccionado.codigo.toUpperCase()}</>
          ) : (
            <>⏳ Cargando...</>
          )}
        </button>

        {mostrandoMenu && googleListo && (
          <>
            {/* Overlay */}
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
    </>
  );
}
