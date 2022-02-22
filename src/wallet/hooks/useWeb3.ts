import { Web3Provider } from '@ethersproject/providers' // eslint-disable-line
import { Web3ReactContextInterface } from '@web3-react/core/dist/types'
import { useWeb3React } from '@web3-react/core'
import { useEffect, useState } from 'react'
import MetaMaskConnector from '../lib/connector'

export function useActiveWeb3React(): Web3ReactContextInterface<Web3Provider> & {
  chainId?: number
} {
  const context = useWeb3React<Web3Provider>()
  const contextNetwork = useWeb3React<Web3Provider>()
  return context.active ? context : contextNetwork
}

export function useEagerConnect() {
  const { activate, active } = useWeb3React()

  const [tried, setTried] = useState(false)

  useEffect(() => {
    MetaMaskConnector.isAuthorized().then((isAuthorized: boolean) => {
      if (isAuthorized) {
        activate(MetaMaskConnector, undefined, true).catch(() => {
          setTried(true)
        })
      } else {
        setTried(true)
      }
    })
  }, [activate])

  useEffect(() => {
    if (!tried && active) {
      setTried(true)
    }
  }, [tried, active])
}

export function useInactiveListener(suppress: boolean = false) {
  const { active, error, activate } = useWeb3React()
  const [isConnected, setIsConnected] = useState(true)

  useEffect((): any => {
    // eslint-disable-line
    const { ethereum } = window as any
    if (ethereum && ethereum.on && !active && !error && !suppress) {
      const handleConnect = () => {
        console.log("Handling 'connect' event")
        activate(MetaMaskConnector)
      }
      const handleChainChanged = (chainId: string | number) => {
        console.log("Handling 'chainChanged' event with payload", chainId)
        activate(MetaMaskConnector)
      }
      const handleAccountsChanged = (accounts: string[]) => {
        console.log("Handling 'accountsChanged' event with payload", accounts)
        if (accounts.length > 0) {
          activate(MetaMaskConnector)
          setIsConnected(true)
        } else {
          setIsConnected(false)
        }
      }
      const handleNetworkChanged = (networkId: string | number) => {
        console.log("Handling 'networkChanged' event with payload", networkId)
        activate(MetaMaskConnector)
      }

      ethereum.on('connect', handleConnect)
      ethereum.on('chainChanged', handleChainChanged)
      ethereum.on('accountsChanged', handleAccountsChanged)
      ethereum.on('networkChanged', handleNetworkChanged)

      return () => {
        if (ethereum.removeListener) {
          ethereum.removeListener('connect', handleConnect)
          ethereum.removeListener('chainChanged', handleChainChanged)
          ethereum.removeListener('accountsChanged', handleAccountsChanged)
          ethereum.removeListener('networkChanged', handleNetworkChanged)
        }
      }
    }
    return null
  }, [active, error, suppress, activate])

  return { isConnected }
}
