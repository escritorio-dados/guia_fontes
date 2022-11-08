import { ListItem, ListItemText, ListItemProps } from '@mui/material';
import { Link } from 'react-router-dom';

type IListItemNavProps = ListItemProps & {
  to: string;
  text: string;
  nested?: boolean;
};

export function ListItemNav({ text, to, nested }: IListItemNavProps) {
  return (
    <>
      <ListItem
        button
        sx={{
          paddingLeft: nested === true ? '2rem' : '1rem',
        }}
        component={Link}
        to={to}
      >
        <ListItemText primary={text} />
      </ListItem>
    </>
  );
}
