import { InjectedConnector } from '@web3-react/injected-connector'
import {
  MAIN_NET_ID,
  RINKEBY_NETWORK_ID,
  KOVAN_NETWORK_ID,
  GETH_NETWORK_ID,
} from '../constants/network.id'

const MetaMaskConnector = new InjectedConnector({
  supportedChainIds: [MAIN_NET_ID, RINKEBY_NETWORK_ID, KOVAN_NETWORK_ID, GETH_NETWORK_ID],
})

export default MetaMaskConnector
