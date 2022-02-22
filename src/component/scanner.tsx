import React, { useEffect, useState } from 'react'
import { Typography, Paper, Button, Grid, Theme } from '@material-ui/core'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { injected } from '../connectors/NetworkConnector'
import walletconnect from '../assets/img/walletconnect.svg'
import metamask from '../assets/img/metamask.svg'
import { useWeb3React } from '@web3-react/core'
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(3),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      background: '#1f1f1f',
      border: '1px solid black',
      boxShadow: '10px 10px black',
    },
    button: {
      margin: theme.spacing(1),
      color: 'white',
      fontSize: 25,
      width: 'calc(100% - 16px)',
      display: 'flex',
      justifyContent: 'space-around',
    },
    content: {
      color: 'white',
      fontFamily: 'cursive',
      fontSize: 25,
    },
    logoContanier: {
      padding: '40px !important',
    },
    gradientText: {
      background: '-webkit-linear-gradient(right, blue 30%, #f5f3f3  90%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      fontWeight: 900,
    },
  }),
)

interface ScannerProp {
  handleDialog: any
}
const Scanner: React.FC<ScannerProp> = ({ handleDialog }) => {
  const classes = useStyles()
  const { activate, active, account, connector, library } = useWeb3React()
  const [open, setOpen] = useState<boolean>(false)
  const [canLogin, setLogin] = useState(false)

  enum LoginStateOptions {
    None,
    SwitchToMainnet,
    WaitingOnWalletConnect,
    WaitingOnSignature,
    Done,
  }
  const [loginState, setLoginState] = useState<LoginStateOptions>(LoginStateOptions.None)

  const handleClose = () => {
    setOpen(false)
    setTimeout(() => {
      setLoginState(LoginStateOptions.None)
    }, 1000)
  }
  const handleReject = () => {
    setLogin(false)
    handleClose()
  }

  const handleMetamask = async () => {
    console.log('window.ethereum.networkVersion', window.ethereum.networkVersion)
    if (window.ethereum.networkVersion === '1') {
      setLoginState(LoginStateOptions.WaitingOnWalletConnect)

      try {
        await activate(injected, undefined, true)
      } catch (_) {
        handleReject()
      }
    } else {
      setLoginState(LoginStateOptions.WaitingOnWalletConnect)
      await switchNetwork()
    }
  }

  const switchNetwork = async (chainId: string = '0x1') => {
    if (library) {
      await library.jsonRpcFetchFunc('wallet_switchEthereumChain', [{ chainId }])
    }
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId }], // you must have access to the specified account
    })
  }

  return (
    <Paper className={classes.paper}>
      <Grid container spacing={3}>
        <Grid item xs={12} className={classes.logoContanier}>
          <Typography variant="h2" gutterBottom className={classes.gradientText}>
            WALLET
          </Typography>
          <Typography variant="h2" gutterBottom className={classes.gradientText}>
            Scanner
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1" className={classes.content}>
            Today I bought a raincoat and wore it on a sunny day. He had decided to accept
            his fate of accepting his fate. I caught my squirrel rustling through my gym
            bag.
          </Typography>
        </Grid>

        <Grid item md={6} xs={12}>
          <Button
            aria-label="WalletConnect"
            className={classes.button}
            onClick={handleMetamask}
          >
            <img src={metamask} alt="wallet connect" width="80" /> MetaMask
          </Button>
        </Grid>
        <Grid item md={6} xs={12}>
          <Button
            aria-label="metamask"
            className={classes.button}
            onClick={() => handleDialog('wallet')}
          >
            <img src={walletconnect} alt="wallet connect" width="80" /> WalletConnect
          </Button>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default Scanner
