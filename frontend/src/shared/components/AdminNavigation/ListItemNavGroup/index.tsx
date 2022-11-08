import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { ListItem, ListItemText, Collapse, List } from '@mui/material';
import { ReactNode, useCallback, useState } from 'react';

import { useKeepStates } from '#shared/hooks/keepStates';

interface IListItemNavGroupProps {
  text: string;
  children: ReactNode;
}

export function ListItemNavGroup({ text, children }: IListItemNavGroupProps) {
  const { getState, updateState } = useKeepStates();

  const [open, setOpen] = useState(
    getState<boolean>({ category: 'nav_bar', key: text, defaultValue: false }),
  );

  const handleClick = useCallback(() => {
    updateState({ category: 'nav_bar', key: text, value: !open, localStorage: true });

    setOpen(!open);
  }, [open, text, updateState]);

  return (
    <>
      <ListItem button onClick={handleClick}>
        <ListItemText primary={text} />

        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {children}
        </List>
      </Collapse>
    </>
  );
}
