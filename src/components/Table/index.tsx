import React, { useState, useRef } from 'react';
import { Table as MuiTable, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, TablePagination, Button } from '@mui/material';
import { styled } from '@mui/system';

interface Header {
    name: string;
    key: string;
}

interface Action {
    name: string;
    handler: (rowId: number, index?: number) => void;
    isDisabled?: (rowId: number, index?: number) => boolean;
    render?: (rowId: number, index?: number) => React.ReactNode;
}

interface TableProps {
    headers: Header[];
    rows: { [key: string]: any }[];
    actions?: { columns: Action[]; heading: string }[];
    onRowClick?: (row: { [key: string]: any }, rowId: number | string, index?: number) => void;
    onRowDoubleClick?: (row: { [key: string]: any }, rowId: number | string, index?: number) => void;
    config?: {
        striped?: boolean;
        hover?: boolean;
        alignment?: 'left' | 'center' | 'right';
    };
    title?: string;
    subtitle?: string;
    defaultRowsPerPage?: number;
    rowsPerPageOptions?: number[];
    keyExtractor?: string;
}

const StyledTableContainer = styled(TableContainer)({
    maxHeight: '400px',
    '&::-webkit-scrollbar': {
        width: '8px',
        height: '8px',
    },
    '&::-webkit-scrollbar-thumb': {
        backgroundColor: '#888',
        borderRadius: '4px',
    },
    '&::-webkit-scrollbar-thumb:hover': {
        backgroundColor: '#555',
    },
});

const StyledTableCell = styled(TableCell)({
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: '150px', // Adjust as needed
    '&.MuiTableCell-head': {
        zIndex: 0
    }
});

const Table: React.FC<TableProps> = ({ headers, rows, actions, onRowClick, onRowDoubleClick, config, title, subtitle, defaultRowsPerPage = 5, rowsPerPageOptions = [5, 10, 25] , keyExtractor = 'id'}) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage);
    const [selectedRow, setSelectedRow] = useState<string | number | null>(null);
    const clickTimeout = useRef<NodeJS.Timeout | null>(null);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleRowClick = (row: { [key: string]: any }, rowId: number | string, index?: number) => {
        console.log(`Row clicked: ID=${rowId}, Index=${index}`);
        if (clickTimeout.current) {
            clearTimeout(clickTimeout.current);
            clickTimeout.current = null;
        } else {
            clickTimeout.current = setTimeout(() => {
                setSelectedRow(rowId);
                if (onRowClick) {
                    onRowClick(row, rowId, index);
                }
                clickTimeout.current = null;
            }, 300);
        }
    };

    const handleRowDoubleClick = (row: { [key: string]: any }, rowId: number | string, index?: number) => {
        console.log(`Row double-clicked: ID=${rowId}, Index=${index}`);
        if (clickTimeout.current) {
            clearTimeout(clickTimeout.current);
            clickTimeout.current = null;
        }
        if (onRowDoubleClick) {
            onRowDoubleClick(row, rowId, index);
        }
    };

    return (
        <Paper>
            {title && <Typography variant="h6" component="h2" gutterBottom>{title}</Typography>}
            {subtitle && <Typography variant="subtitle1" component="h4" gutterBottom>{subtitle}</Typography>}
            <StyledTableContainer>
                <MuiTable stickyHeader>
                    <TableHead>
                        <TableRow>
                            {headers.map((header, index) => (
                                <StyledTableCell key={index} style={{ fontWeight: 'bold', textAlign: config?.alignment || 'left' }}>{header.name}</StyledTableCell>
                            ))}
                            {actions && actions.map((actionGroup, index) => (
                                <StyledTableCell key={index} style={{ fontWeight: 'bold', textAlign: config?.alignment || 'left' }}>{actionGroup.heading}</StyledTableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                            console.log('Row:', row);
                            return <>
                                <TableRow
                                    key={index}
                                    hover={config?.hover}
                                    style={{
                                        cursor: 'pointer',
                                        backgroundColor: selectedRow === row?.[keyExtractor] ? '#e0e0e0' : config?.striped && index % 2 === 0 ? '#f5f5f5' : 'inherit',
                                    }}
                                    onClick={() => handleRowClick(row, row?.[keyExtractor], index)}
                                    onDoubleClick={() => handleRowDoubleClick(row, row?.[keyExtractor], index)}
                                >
                                    {headers.map((header, cellIndex) => (
                                        <StyledTableCell key={cellIndex} style={{ textAlign: config?.alignment || 'left' }}>{row[header.key]}</StyledTableCell>
                                    ))}
                                    {actions && actions.map((actionGroup, actionGroupIndex) => (
                                        <StyledTableCell key={actionGroupIndex} style={{ textAlign: config?.alignment || 'left' }}>
                                            {actionGroup.columns.map((action, actionIndex) => (
                                                action.render ? action.render(row?.[keyExtractor], index) : (
                                                    <Button
                                                        key={actionIndex}
                                                        onClick={() => action.handler(row?.[keyExtractor], actionGroupIndex)}
                                                        disabled={action.isDisabled ? action.isDisabled(row?.[keyExtractor]) : false}
                                                    >
                                                        {action.name}
                                                    </Button>
                                                )
                                            ))}
                                        </StyledTableCell>
                                    ))}
                                </TableRow>
                            </>
                        })}
                    </TableBody>
                </MuiTable>
            </StyledTableContainer>
            {rows.length > rowsPerPage && (
                <TablePagination
                    rowsPerPageOptions={rowsPerPageOptions}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            )}
        </Paper>
    );
};

export default Table;
