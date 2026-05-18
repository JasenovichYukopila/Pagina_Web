import React from 'react';
import colors from '../utils/colors';
import BotonVolver from './BotonVolver';

export default function PageContainer({ 
  children, 
  titulo, 
  subtitulo,
  mostrarVolver = true,
  rutaVolver = "/home",
  headerExtra = null 
}) {
  return (
    <div style={{ 
      minHeight: '100vh', 
      background: colors.backgroundGray, 
      padding: '20px' 
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div 
          className="card" 
          style={{ 
            background: colors.background,
            borderRadius: '12px',
            padding: '25px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            marginBottom: '20px'
          }}
        >
          {mostrarVolver && <BotonVolver ruta={rutaVolver} />}
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h1 style={{ 
                margin: 0, 
                color: colors.primary, 
                fontSize: '28px',
                fontWeight: '700'
              }}>
                {titulo}
              </h1>
              {subtitulo && (
                <p style={{ 
                  color: colors.textSecondary, 
                  margin: '5px 0 0', 
                  fontSize: '14px' 
                }}>
                  {subtitulo}
                </p>
              )}
            </div>
            
            {headerExtra && (
              <div>{headerExtra}</div>
            )}
          </div>
        </div>
        
        {/* Contenido */}
        {children}
      </div>
    </div>
  );
}
