import { useState, useRef } from 'react';
import { Icon } from '@iconify/react';
import paperPlaneFill from '@iconify-icons/eva/paper-plane-fill';
import externalLinkFill from '@iconify-icons/eva/external-link-fill';
import { experimentalStyled as styled } from '@material-ui/core/styles';
// material
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { Menu, MenuItem, IconButton } from '@material-ui/core';
import ShareDialog from '../dialogs/ShareDialog';

// ------------------------------------------------------

const IconStyle = styled(Icon)(() => ({
  marginRight: 15,
  width: 20,
  height: 20
}));

// ------------------------------------------------------

type AssetOptionsButtonProps = {
  openseaUrl: string;
  id: string;
}

export default function AssetOptionsButton({ openseaUrl, id }: AssetOptionsButtonProps ) {
  const anchorRef = useRef(null);
  const [isOpen, setOpen] = useState<HTMLButtonElement | null >(null);
  const handleClose = () => setOpen(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => setOpen(event.currentTarget);


  return (
    <div>
      <IconButton onClick={handleClick} ref={anchorRef}>
        <MoreHorizIcon />
      </IconButton>
      <Menu
        keepMounted
        anchorEl={anchorRef.current}
        onClose={handleClose}
        open={Boolean(isOpen)}
      >

        <ShareDialog id={id}>
          <MenuItem
            sx={{
              mx: 1,
              borderRadius: '0.5rem',
              typography: 'subtitle2',
              fontWeight: 'fontWeightBold'
            }}
          >
            <IconStyle
              icon={paperPlaneFill}
            />
              Share
          </MenuItem>
        </ShareDialog>

        <a href={openseaUrl} target="_blank">
          <MenuItem
            sx={{
              mx: 1,
              borderRadius: '0.5rem',
              typography: 'subtitle2',
              fontWeight: 'fontWeightBold'
            }}
            onClick={handleClose}
          >
            <IconStyle
              icon={externalLinkFill}
            />
          View on Opensea
        </MenuItem>
        </a>

      </Menu>
    </div >
  )
}
