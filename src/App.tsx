import { useState } from 'react'
import { Container } from '@material-ui/core'
import { useWeb3React } from '@web3-react/core'
import Dialogs from './component/dialog'
import Scanner from './component/scanner'
import Home from './component/home'
import './App.css'

const App = () => {
  const [open, setOpen] = useState(false)

  const { account } = useWeb3React()

  const handleDialog = (str: string) => {
    console.log(str)
    setOpen(true)
  }
  const closeDialog = () => {
    setOpen(false)
  }
  return (
    <div className="App">
      <header className="App-header">
        <Container maxWidth="md">
          {account ? <Home /> : <Scanner handleDialog={handleDialog} />}
        </Container>
      </header>
    </div>
  )
}

export default App
