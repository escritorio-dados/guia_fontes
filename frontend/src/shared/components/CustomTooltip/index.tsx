import { Tooltip } from '@mui/material';

import { TextEllipsis } from '#shared/styledComponents/common';

interface ICustomTooltip {
  title: string | JSX.Element;
  children: string | JSX.Element;
}

export function CustomTooltip({ title, children }: ICustomTooltip) {
  return (
    <>
      <Tooltip
        arrow
        componentsProps={{
          tooltip: {
            sx: {
              color: '#fff',
              backgroundColor: '#032860',
              border: `1px solid #fff`,
            },
          },
        }}
        title={title}
      >
        {typeof children === 'string' ? <TextEllipsis>{children}</TextEllipsis> : children}
      </Tooltip>
    </>
  );
}
