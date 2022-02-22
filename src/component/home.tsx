import React, { useEffect, useState } from 'react'
import { Typography, Paper, Button, Grid, Theme } from '@material-ui/core'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { useWeb3React } from '@web3-react/core'
import LinearProgress from '@material-ui/core/LinearProgress'
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

const Home: React.FC = () => {
  const classes = useStyles()
  const { account } = useWeb3React()

  const [progress, setProgress] = useState(0)

  if (progress < 100) return <LinearProgress variant="determinate" value={progress} />

  return (
    <Paper className={classes.paper}>
      <Grid container spacing={3}>
        <Grid item xs={12} className={classes.logoContanier}>
          <Typography gutterBottom className={classes.gradientText}>
            Wallet Address: {account}
          </Typography>
        </Grid>
        {/* <Grid item xs={12}>
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
        </Grid> */}
      </Grid>
    </Paper>
  )
}

export default Home
