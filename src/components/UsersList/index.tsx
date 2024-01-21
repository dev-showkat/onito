import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useSelector } from 'react-redux';

interface Column {
    id: 'name' | 'age' | 'sex' | 'mobile' | 'issuedIdType' | 'issuedId' | 'address' | 'state' | 'city' | 'country' | 'pincode';
    label: string;
    minWidth?: number;
    align?: 'right';
}

const columns: readonly Column[] = [
    { id: 'name', label: 'Name', minWidth: 50 },
    { id: 'age', label: 'Age', minWidth: 50 },
    { id: 'sex', label: 'Gender', minWidth: 50 },
    { id: 'mobile', label: 'Mobile', minWidth: 50 },
    { id: 'issuedIdType', label: 'Govt ID Type', minWidth: 50 },
    { id: 'issuedId', label: 'Govt Issued Id', minWidth: 50 },
    { id: 'address', label: 'Address', minWidth: 50 },
    { id: 'state', label: 'State', minWidth: 50 },
    { id: 'city', label: 'City', minWidth: 50 },
    { id: 'country', label: 'Country', minWidth: 50 },
    { id: 'pincode', label: 'Pincode', minWidth: 50 },
];

export const UsersList = () => {
    const { users } = useSelector((state: { users: any[] }) => state);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <>
            {
                users.length ? <Paper sx={{ width: '100%', overflow: 'hidden', mt: 3 }} >
                    <TableContainer sx={{ maxHeight: 700 }}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableCell
                                            key={column.id}
                                            align={column.align}
                                            style={{ minWidth: column.minWidth }}
                                        >
                                            {column.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row) => {
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={row.issuedId}>
                                                {columns.map((column) => {
                                                    const value = row[column.id];
                                                    return (
                                                        <TableCell key={column.id} align={column.align}>{value}</TableCell>
                                                    );
                                                })}
                                            </TableRow>
                                        );
                                    })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={users.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper > : null
            }
        </>
    );
}