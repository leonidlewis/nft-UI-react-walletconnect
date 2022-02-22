import { useEagerConnect, useInactiveListener } from 'hooks/useWeb3'

export default function Web3ReactManager({ children }: { children: JSX.Element }) {
  const { tried } = useEagerConnect()
  useInactiveListener(!tried)
  return children
}
