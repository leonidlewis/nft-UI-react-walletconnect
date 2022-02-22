import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import MuiDialogContent from '@material-ui/core/DialogContent'
import MuiDialogActions from '@material-ui/core/DialogActions'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles((theme) => ({
  dialogpaper: {
    background: '#1f1f1f',
    color: 'white',
  },
  root: {
    margin: 0,
    padding: theme.spacing(2),
    display: 'flex',
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  dialogcontent: {
    padding: theme.spacing(2),
  },
  dialogaction: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))
const DialogTitle = (props: any) => {
  const classes = useStyles()
  const { children, onClose, ...other } = props
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6" style={{ marginLeft: 10 }}>
        {children}
      </Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  )
}
interface DialogProps {
  isOpen: boolean
  close: any
}
const Dialogs: React.FC<DialogProps> = ({ isOpen, close }) => {
  const classes = useStyles()

  return (
    <div>
      <Dialog
        onClose={() => close()}
        aria-labelledby="customized-dialog-title"
        open={isOpen}
        classes={{ paper: classes.dialogpaper }}
      >
        <DialogTitle id="customized-dialog-title" onClose={() => close()}>
          Wallet Information
        </DialogTitle>
        <MuiDialogContent dividers classes={{ root: classes.dialogcontent }}>
          <Typography gutterBottom>
            Italy is my favorite country; in fact, I plan to spend two weeks there next
            year. The spa attendant applied the deep cleaning mask to the gentleman’s
            back.
          </Typography>
          <Typography gutterBottom>
            That is an appealing treasure map that I can't read. The secret ingredient to
            his wonderful life was crime. There is no better feeling than staring at a
            wall with closed eyes.
          </Typography>
          <Typography gutterBottom>
            The stench from the feedlot permeated the car despite having the air
            conditioning on recycled air. Truth in advertising and dinosaurs with
            skateboards have much in common.
          </Typography>
        </MuiDialogContent>
        <MuiDialogActions classes={{ root: classes.dialogaction }}>
          <Button autoFocus onClick={() => close()} color="primary">
            Save changes
          </Button>
        </MuiDialogActions>
      </Dialog>
    </div>
  )
}
export default Dialogs
