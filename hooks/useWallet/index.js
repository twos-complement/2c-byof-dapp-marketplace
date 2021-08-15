import { useCallback, useEffect, useReducer } from 'react';
import Web3modal from 'web3modal';
import { providers } from 'ethers';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { INFURA_ID, NETWORK } from '../../config/constants';
import { getChainData } from '../../util/chains';
import { walletReducer, initialState } from './reducer';

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: INFURA_ID,
    },
  },
};

export const useWallet = () => {
  const [state, dispatch] = useReducer(walletReducer, initialState);
  const { provider, web3Provider, address, chainId } = state;
  let web3Modal;

  if (typeof window !== 'undefined') {
    web3Modal = new Web3modal({
      network: NETWORK,
      cacheProvider: true,
      providerOptions,
      theme: 'dark',
    });
  }

  const connect = useCallback(async function () {
    const provider = await web3Modal.connect();
    const web3Provider = new providers.Web3Provider(provider);
    const signer = web3Provider.getSigner();
    const address = await signer.getAddress();
    const network = await web3Provider.getNetwork();

    dispatch({
      type: 'SET_WEB3_PROVIDER',
      provider,
      web3Provider,
      address,
      chainId: network.chainId,
    });
  }, []);

  const disconnect = useCallback(
    async function () {
      await web3Modal.clearCachedProvider();
      if (provider?.disconnect && typeof provider.disconnect === 'function') {
        await provider.disconnect();
      }
      dispatch({
        type: 'RESET_WEB3_PROVIDER',
      });
    },
    [provider]
  );

  useEffect(() => {
    if (web3Modal.cacheProvider) {
      connect();
    }
  }, [connect]);

  useEffect(() => {
    if (provider?.on) {
      const handleAccountsChanged = (accounts) => {
        console.log('AccountsChanged', accounts);
        dispatch({
          type: 'SET_ADDRESS',
          address: accounts[0],
        });
      };

      const handleChainChanged = (accounts) => {
        console.log('AccountsChanged', accounts);
        dispatch({
          type: 'SET_ADDRESS',
          address: accounts[0],
        });
      };

      const handleDisconnect = (error) => {
        console.log('disconnect', error);
        disconnect();
      }

      provider.on('accountsChanged', handleAccountsChanged);
      provider.on('chainChanged', handleChainChanged);
      provider.on('disconnect', handleDisconnect);

      return () => {
        if (provider.removeListener) {
          provider.removeListener('accountsChanged', handleAccountsChanged);
          provider.removeListener('chainChanged', handleChainChanged);
          provider.removeListener('disconnect', handleDisconnect);
        }
      };
    }
  }, [provider, disconnect]);

  const chainData = chainId ? getChainData(chainId) : null;
  return {
    provider,
    web3Provider,
    address,
    chainId,
    chainData,
    connect,
    disconnect,
  };
};
