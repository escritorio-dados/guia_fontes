import { Paper, styled, TableCell, TableRow, TableRowProps } from '@mui/material';

export const TableContainerStyled = styled(Paper)`
  margin: auto;

  border: 2px solid #333;
  border-radius: 5px;

  .table-container {
    min-width: 600px;
  }
`;

export const TableCellHeader = styled(TableCell)`
  background: ${({ theme }) => theme.palette.secondary.main};

  border-bottom: 1px solid #333;

  & + div {
    border-left: 1px solid #333;
  }
`;

export const TableCellData = styled(TableCell)`
  padding: 0.3rem 1rem;
  border-bottom: 1px solid #333;

  & + div {
    border-left: 1px solid #333;
  }
`;

type ITableRowStyled = TableRowProps & { component: string };

export const TableRowStyled = styled(TableRow)<ITableRowStyled>`
  transition: background-color 0.2s;

  &:hover {
    background-color: #aaa;
  }
`;
