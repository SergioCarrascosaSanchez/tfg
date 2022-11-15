import {extendTheme } from '@mui/joy/styles';
import {createGetCssVar} from '@mui/joy/styles/extendTheme'
const getCssVar = createGetCssVar("joy");

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
      },
      h2:{
        fontFamily: getCssVar('fontFamily-display'),
        fontWeight: getCssVar('fontWeight-xl'),
        fontSize: getCssVar('fontSize-xl3'),
        lineHeight: getCssVar('lineHeight-sm'),
        letterSpacing: getCssVar('letterSpacing-sm'),
        color: getCssVar('palette-text-primary')
      }
    },
  });