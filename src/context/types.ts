export type State = {
  initialized: boolean
}

export type LatomicProviderProps = { children: React.ReactNode }

declare global {
  interface Window {
    ethereum: any
    web3: any
    removeListener: any
  }
}
