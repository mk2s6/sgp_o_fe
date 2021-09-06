export const themeOptions = {
  palette: {
    type: 'light',
    primary: {
      main: '#ffdbcf',
      light: '#feeae6',
      contrastText: 'rgba(0,0,0,0.86)',
    },
    secondary: {
      main: '#feeae6',
    },
    text: {
      primary: 'rgba(0,0,0,0.93)',
      secondary: 'rgba(0,0,0,0.56)',
      disabled: 'rgba(0,0,0,0.38)',
      hint: 'rgba(0,0,0,0.38)',
    },
    background: {
      default: 'rgba(253,253,253,0.86)',
      paper: 'rgba(255,255,255,0.94)',
    },
    divider: 'rgba(0,0,0,0.18)',
  },
  props: {
    MuiTooltip: {
      arrow: true,
    },
  },
};
