import { AppBar, Link, Toolbar, Typography } from "@material-ui/core";
import UserAddress from '../UserAddress';
import DataSelector from '../DataSelector';

const Navbar = () => (
  <AppBar position='static'>
    <Toolbar>
      <Typography variant="h6">
        BYOD Marketplace 
      </Typography>
      <UserAddress />
      <DataSelector />
    </Toolbar>
  </AppBar>
);

export default Navbar;