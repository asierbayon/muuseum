import { useState } from 'react';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Modal } from '@material-ui/core';

// ----------------------------------------------------------------------

const ImgStyle = styled('img')({
  height: '100%',
  maxWidth: '100%',
  borderRadius: '0.5rem'
});

const ImgModalStyle = styled('img')({
  cursor: 'zoom-in',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)'
});

// ----------------------------------------------------------------------

type AssetDetailsImageProps = {
  url: string;
};

export default function AssetDetailsImage({ url }: AssetDetailsImageProps) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <ImgStyle alt="asset" src={url} onClick={handleOpen} />

      <Modal open={open} onClose={handleClose}>
        <ImgModalStyle src={url} alt="large asset" />
      </Modal>
    </>
  );
}
