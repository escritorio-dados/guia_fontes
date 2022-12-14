import { Box, Popover, PopoverOrigin } from '@mui/material';
import { ReactElement, ReactNode, useState } from 'react';

import { CustomIconButton } from '../CustomIconButton';

interface ICPopoverProps {
  icon: ReactElement;
  help: string;
  children: ReactNode;
  anchorOrigin?: PopoverOrigin;
  transformOrigin?: PopoverOrigin;
}

export function CustomPopover({
  children,
  icon,
  help,
  anchorOrigin,
  transformOrigin,
}: ICPopoverProps) {
  const [anchor, setAnchor] = useState<null | HTMLElement>(null);

  return (
    <>
      <CustomIconButton
        action={(event) => setAnchor(event.currentTarget)}
        title={help}
        iconType="custom"
        CustomIcon={icon}
      />

      <Popover
        anchorEl={anchor}
        open={anchor != null}
        onClose={() => setAnchor(null)}
        anchorOrigin={anchorOrigin ?? { horizontal: 'center', vertical: 'bottom' }}
        transformOrigin={
          transformOrigin ?? {
            vertical: 'top',
            horizontal: 'center',
          }
        }
      >
        <Box
          sx={(theme) => ({ border: `1px solid ${theme.palette.divider}`, borderRadius: '5px' })}
        >
          {children}
        </Box>
      </Popover>
    </>
  );
}
