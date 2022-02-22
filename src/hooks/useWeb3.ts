import { Web3Provider } from '@ethersproject/providers' // eslint-disable-line
import { Web3ReactContextInterface } from '@web3-react/core/dist/types'
import { useWeb3React } from '@web3-react/core'
import { useEffect, useState } from 'react'
import { injected } from '../connectors/NetworkConnector'

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
    injected.isAuthorized().then((isAuthorized: boolean) => {
      if (isAuthorized) {
        activate(injected, undefined, true).catch(() => {
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

  return { tried }
}

export function useInactiveListener(suppress: boolean = false) {
  const { active, error, activate, connector } = useWeb3React()
  const [isConnected, setIsConnected] = useState(true)

  /* eslint-disable */
  useEffect((): any => {
    /* eslint-enable */

    const { ethereum } = window as any
    if (ethereum && ethereum.on && !active && !error && !suppress) {
      const handleConnect = () => {
        console.log("Handling 'connect' event")
        activate(injected)
      }
      const handleChainChanged = (chainId: string | number) => {
        console.log("Handling 'chainChanged' event with payload", chainId)
        activate(injected)
      }
      const handleAccountsChanged = (accounts: string[]) => {
        console.log("Handling 'accountsChanged' event with payload", accounts)
        if (accounts.length > 0) {
          activate(injected)
          setIsConnected(true)
        } else {
          setIsConnected(false)
        }
      }
      const handleNetworkChanged = (networkId: string | number) => {
        console.log("Handling 'networkChanged' event with payload", networkId)
        activate(injected)
      }

      const handleDisconnect = () => {
        console.log('Disconnecting')
        localStorage.removeItem('Address')
        localStorage.removeItem('FBIdToken')
        localStorage.removeItem('UserID')
      }
      connector?.on('Web3ReactDeactivate', handleDisconnect)
      ethereum.on('connect', handleConnect)
      ethereum.on('chainChanged', handleChainChanged)
      ethereum.on('accountsChanged', handleAccountsChanged)
      ethereum.on('networkChanged', handleNetworkChanged)
      ethereum.on('disconnect', handleDisconnect)

      return () => {
        if (ethereum.removeListener) {
          ethereum.removeListener('connect', handleConnect)
          ethereum.removeListener('chainChanged', handleChainChanged)
          ethereum.removeListener('accountsChanged', handleAccountsChanged)
          ethereum.removeListener('networkChanged', handleNetworkChanged)
        }
      }
    }
  }, [active, error, suppress, activate])

  return { isConnected }
}
