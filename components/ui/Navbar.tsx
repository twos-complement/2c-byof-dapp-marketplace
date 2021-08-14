import { AppBar, Link, Toolbar, Typography } from "@material-ui/core";
import UserAddress from '../UserAddress';

const Navbar = () => (
  <AppBar position='static'>
    <Toolbar>
      <Typography variant="h6">
        BYOD Marketplace 
      </Typography>
      <UserAddress />
    </Toolbar>
  </AppBar>
);

export default Navbar;