import styled from "@emotion/styled";
import { css } from '@emotion/react';
import { AppBar as MuiAppBar, Link, Toolbar as MuiToolbar, Typography } from "@material-ui/core";
import NextLink from 'next/link'
import UserAddress from '../UserAddress';
import DataSelector from '../DataSelector';
import Brand from "./Brand";

const AppBar = styled(MuiAppBar)`
  margin-bottom: 8px;
`;

const Toolbar = styled(MuiToolbar)`
  ${({ theme}) => css`
    background-color: ${theme.palette.navbar.main};
    color: ${theme.palette.navbar.contrastText};
    display: flex;
    justify-content: space-between;
    height: 80px;
  `}
`;

const LogoLink = styled(Link)`
  ${({ theme }) => css`
    a, h6 {
      color: ${theme.colors.contrastLightText};
    }
  `};
`;

const ActionBar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  > * {
    padding-left: 20px;
  }
`;

const Navbar = () => (
  <AppBar position='static'>
    <Toolbar>
      <LogoLink href='/'>
        <Brand />
      </LogoLink>
      <ActionBar>
        <NextLink href="/"><a>Marketplace</a></NextLink>
        <NextLink href="/demo"><a>Demo / Admin</a></NextLink>
        <DataSelector />
        <UserAddress />
      </ActionBar>
    </Toolbar>
  </AppBar>
);

export default Navbar;