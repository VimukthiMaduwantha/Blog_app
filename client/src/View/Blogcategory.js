import React, { useEffect, useState } from 'react'
import {
    Box,
    Button,
    Card,
    CardHeader,
    Container,
    Divider,
    Grid,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableFooter,
    TableHead,
    TablePagination,
    TableRow,
    TextField
} from '@mui/material'
import { Formik } from 'formik'
import * as Yup from "yup";
import axios from 'axios';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { toast } from 'react-toastify';
import { useAsyncError } from 'react-router-dom';

function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (event) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </Box>
    );
}

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};

function Blogcategory() {
    const [pageName, setPageName] = useState("Blog Category")
    const [formData, setFormData] = useState({
        categoryID: 1,
        categoryName: ''
    })
    const [categoryID, setCategoryID] = useState(0)
    const [gridData, setGridData] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [updateCategoryID, setUpdateCategoryID] = useState();
    const [isUpdate, setIsUpdate] = useState(false)

    useEffect(() => {
        getLatestCatogryID();
        getAllCategoryDetails();
    }, [])

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - gridData.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    function handleChange(e) {
        const target = e.target;
        const value = target.value;
        setFormData({
            ...formData,
            [e.target.name]: value
        })
    }

    async function uploadCategory() {
        if (!isUpdate) {
            const model = {
                categoryID: categoryID,
                categoryName: formData.categoryName
            }

            axios.post('http://localhost:8080/api/category/addCategory', model).then((res) => {
                if (res.data.message == 'Success') {
                    setFormData({
                        ...formData,
                        categoryName: ''
                    })
                    getLatestCatogryID();
                    getAllCategoryDetails();
                }
            })
        } else {
            const updateModel = {
                id: updateCategoryID,
                categoryName: formData.categoryName,
            }
            console.log("updateModel::>> ", updateModel)
        }
    }

    async function getLatestCatogryID() {
        axios.get('http://localhost:8080/api/category/getCategoryID').then((res) => {
            if (res.data.length) {
                setCategoryID(res.data[0].categoryID + 1)
            }
        })
    }

    async function getAllCategoryDetails() {
        axios.get('http://localhost:8080/api/category/getAllCategoryDetails').then((res) => {
            if (res.data.length > 0) {
                setGridData(res.data)
            } else {
                toast.error("No Record to Display!!")
            }
        })
    }


    function DeleteRecord(id) {
        axios.delete(`http://localhost:8080/api/category/deleteCategoryDetails/${id}`).then((res) => {
            if (res.data.status == 'Success') {
                getAllCategoryDetails();
                toast.success("Successfully Deleted!!");
                getLatestCatogryID();
            }
        })
    }

    function UpdateRowData(rowData) {
        setFormData({
            ...formData,
            categoryName: rowData.categoryName
        })
        setCategoryID(rowData.categoryID);
        setUpdateCategoryID(rowData._id);
        setIsUpdate(true);
    }

    function cardTitle(titleName) {
        return (
            <Grid container spacing={1}>
                <Grid item md={12} xs={12}>
                    {titleName}
                </Grid>
            </Grid>
        )
    }

    return (
        <>
            <Container maxWidth={false}>
                <Formik
                    initialValues={{
                        categoryID: formData.categoryID,
                        categoryName: formData.categoryID
                    }}

                    validationSchema={
                        Yup.object().shape({
                            // categoryName: Yup.required('Factory is required'),
                        })
                    }

                    onSubmit={() => uploadCategory()}
                    enableReinitialize
                >
                    {({
                        errors,
                        handleBlur,
                        handleSubmit,
                        touched
                    }) => (
                        <form onSubmit={handleSubmit}>
                            <Box mt={0}>
                                <Card sx={{ padding: '15px' }}>
                                    <CardHeader
                                        title={cardTitle(pageName)}
                                    />
                                    <Divider />
                                    <br />
                                    <Grid container spacing={2}>
                                        <Grid item md={4} xs={12}>
                                            <TextField
                                                fullWidth
                                                error={Boolean(touched.categoryID && errors.categoryID)}
                                                helperText={touched.categoryID && errors.categoryID}
                                                label="CatagoryID"
                                                name='categoryID'
                                                value={categoryID}
                                                id='categoryID'
                                                onChange={(e) => handleChange(e)}
                                                variant="standard"
                                                size="small"
                                                InputProps={{
                                                    readOnly: 'true'
                                                }}
                                            />
                                        </Grid>

                                        <Grid item md={4} xs={12}>
                                            <TextField
                                                fullWidth
                                                error={Boolean(touched.categoryName && errors.categoryName)}
                                                helperText={touched.categoryName && errors.categoryName}
                                                label="Catagory Name"
                                                name='categoryName'
                                                value={formData.categoryName}
                                                id='categoryName'
                                                onChange={(e) => handleChange(e)}
                                                variant="standard"
                                                size="small"
                                            />
                                        </Grid>
                                    </Grid>

                                    <Box display='flex' justifyContent='flex-end' p={2}>
                                        <Button
                                            variant="contained"
                                            size='small'
                                            type='submit'
                                        >
                                            {isUpdate ? 'Update' : 'Save'}
                                        </Button>
                                    </Box>
                                    <br />
                                    <br />
                                    <TableContainer>
                                        <Table sx={{ minWidth: 500 }} size="small" aria-label="a dense table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell align='center'>CategoryID</TableCell>
                                                    <TableCell align='center'>Category Name</TableCell>
                                                    <TableCell align='center'>Action</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {(rowsPerPage > 0
                                                    ? gridData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                    : gridData
                                                ).map((row) => (
                                                    <TableRow key={row._id}>
                                                        <TableCell align='center'>{row.categoryID}</TableCell>
                                                        <TableCell align='center'>{row.categoryName}</TableCell>
                                                        <TableCell align='center'>
                                                            <IconButton>
                                                                <DeleteIcon sx={{ color: 'black' }} onClick={() => DeleteRecord(row._id)} />
                                                            </IconButton>
                                                            &nbsp;
                                                            <IconButton>
                                                                <CreateIcon sx={{ color: 'black' }} onClick={() => UpdateRowData(row)} />
                                                            </IconButton>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                                {emptyRows > 0 && (
                                                    <TableRow style={{ height: 53 * emptyRows }}>
                                                        <TableCell colSpan={6} />
                                                    </TableRow>
                                                )}
                                            </TableBody>
                                            <TableFooter>
                                                <TableRow>
                                                    <TablePagination
                                                        rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                                        colSpan={3}
                                                        count={gridData.length}
                                                        rowsPerPage={rowsPerPage}
                                                        page={page}
                                                        slotProps={{
                                                            select: {
                                                                inputProps: {
                                                                    'aria-label': 'rows per page',
                                                                },
                                                                native: true,
                                                            },
                                                        }}
                                                        onPageChange={handleChangePage}
                                                        onRowsPerPageChange={handleChangeRowsPerPage}
                                                        ActionsComponent={TablePaginationActions}
                                                    />
                                                </TableRow>
                                            </TableFooter>
                                        </Table>
                                    </TableContainer>
                                </Card>
                            </Box>
                        </form>
                    )}
                </Formik>
            </Container>
        </>
    )
}

export default Blogcategory

