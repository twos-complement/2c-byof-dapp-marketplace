import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Button } from "@material-ui/core";
import { useRouter } from "next/dist/client/router";
import Brand from "../components/ui/Brand";
import { useWallet } from "../hooks/useWallet";

const Container = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: center;
    align-items: center;

    hr {
      margin-top: 15px;
      border: none;
      border-bottom: 1px solid ${theme.colors.purple100};
    }
  `}
`;

const Dialog = styled.div`
  ${({ theme }) => css`
    display: grid;
    grid-template-rows: repeat(3, 1fr);
    grid-gap: 20px; 
    padding: 80px;
    background: linear-gradient(108.46deg, rgba(255, 255, 255, 0.264) 0%, rgba(255, 255, 255, 0.066) 100%);
    backdrop-filter: blur(80px);
    border-radius: 20px;
  `}
`;

const LinkButton = styled.a`
  ${({ theme }) => css`
    display: block;
    text-align: center;
    > a {
      color: ${theme.colors.contrastLightText};
    }
  `}
`;

const Home = () => {
  const { web3Provider, address, connect } = useWallet();
  const router = useRouter();

  const handleConnect = async () => {
    await connect();
    router.push('/');
  }

  return (
    <Container>
      <Dialog>
        <Brand />
        <div>
          <Button variant="contained" color="primary" fullWidth onClick={handleConnect}>
            Log in with Wallet
          </Button>
          <hr />
        </div>
        <LinkButton>
          Login as Guest
        </LinkButton>
      </Dialog>
    </Container>
  )
};
 

export default Home;
