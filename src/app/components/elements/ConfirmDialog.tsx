import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Box,
} from '@mui/material';
import React from 'react';
import DeleteSweepOutlinedIcon from '@mui/icons-material/DeleteSweepOutlined';

export default function ConfirmDialog({ handleAgree, id }: any) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAgree2 = () => {
    setOpen(false);
    handleAgree(id);
  };

  return (
    <div>
      <Box onClick={handleClickOpen}>
        <DeleteSweepOutlinedIcon />
      </Box>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Confirm ...'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are u sure to delete this post ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            style={{}}
            autoFocus
            className="text-green-400"
            color="success"
          >
            No
          </Button>
          <Button onClick={handleAgree2} color="error" className="text-red-500">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
