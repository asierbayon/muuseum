import { ReactNode, useState } from 'react';
// material
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
  Typography
} from '@material-ui/core';
//
import CopyToClipboard from '../CopyClipboard';

// -----------------------------------------------------------

interface ShareDialog {
  id: string;
  children: ReactNode;
}

export default function ShareDialog({ id, children }: ShareDialog) {
  const [open, setOpen] = useState(false);
  const url = `https://localhost:3000/assets/${id}`; // TODO

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Box onClick={handleClickOpen}>{children}</Box>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth>
        <DialogTitle id="form-dialog-title" disableTypography sx={{ mt: 1 }}>
          <Typography variant="h5">Share this NFT</Typography>
        </DialogTitle>
        <DialogContent>
          <CopyToClipboard value={url} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
