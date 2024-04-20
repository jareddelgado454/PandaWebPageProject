"use client"

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const MaterialUIContext = ({children}) => {
    const darkTheme = createTheme({
        palette: {
          mode: 'dark',
        },
      });
    return(
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <ThemeProvider theme={darkTheme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </LocalizationProvider>
    )
}

export default MaterialUIContext;