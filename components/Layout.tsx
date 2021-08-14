import { Box, Grid } from '@material-ui/core';
import { ReactNode } from 'react';
import Navbar from "./ui/Navbar";

type LayoutProps = { children: ReactNode }

const Layout = ({ children }: LayoutProps) => (
  <>
    <Box sx={{ flexGrow: 1 }}>
      <Navbar />
      <Grid container direction="column" alignContent="center">
        {children}
      </Grid>
    </Box>
  </>
)

export default Layout;