import {extendTheme } from '@mui/joy/styles';

export const customTheme = extendTheme({
    colorSchemes: {
      light: {
        palette: {
          text: {
            primary: 'rgb(33, 53, 71)',
          },
        },
      },
    },
    
    fontSize: {
      lg: '20px',
    },
  
    fontWeight:{
      lg:'400'
    },
    typography: {
      p: {
        fontFamily: '"Inter var", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Roboto, sans-serif',
        fontSize: 'var(--joy-fontSize-lg)',
        fontSynthesis:"none",
        lineHeight: '24px',
        letterSpacing: 'var(--joy-letterSpacing-xs)',
        color: 'var(--joy-palette-text-primary)',
        fontWeight: 'var(--joy-fontWeight-lg)',
      }
    },
  });