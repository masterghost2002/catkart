import styled from "styled-components";
import { DataGrid } from '@mui/x-data-grid';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux';
import { getProducts , deleteProduct} from "../redux/apiCalls";
const Container = styled(motion.div)`
    display:flex;
    flex:5;
    padding:20px;
`
const Image = styled.img`
    width:40px;
    height:40px;
    border-radius:50%;
`
const Name = styled.div`
    margin-left: 10px;
    font-weight:500;
`
const ColumnContainer = styled.div`
    display:flex;
    align-items:center;
`;
const IconButton = styled.button`
    display:flex;
    align-items:center;
    border:none;
    background-color:${props => props.bg ? props.bg : 'transparent'};
    color:${props => props.color ? props.color : 'black'};
    cursor:pointer;
`
const StyledLink = styled(Link)`
    text-decoration: none;
`
export default function ProductList() {
    const products = useSelector((state)=>state.product.products);
    const dispatch = useDispatch();

    useEffect(()=>{
        getProducts(dispatch);
    }, [dispatch]);

    const handleDelete = (id) => {
        deleteProduct(id, dispatch);
    }
    const productListColumn = [
        { field: '_id', headerName: 'ID', flex: 4 },
        {
            field: 'name', headerName: 'Product Name', flex: 4, renderCell: (params) => {
                return (
                    <ColumnContainer>
                        <Image src={params.row.image} />
                        <Name>
                            {params.row.title}
                        </Name>
                    </ColumnContainer>
                )
            }
        },
        { field: 'inStock', headerName: 'Stock', flex: 1 },
        {
            field: 'price', headerName: 'Price', flex: 2, renderCell: (params) => {
                return (
                    <span>
                        {
                            (params.row.price).toLocaleString('en-IN', {
                                style: 'currency',
                                currency: 'INR'
                            })
                        }
                    </span>
                )
            }
        },
        {
            field: 'action', headerName: 'Action', flex: 3, renderCell: (params) => {
                return (
                    <>
                        <IconButton color='red' onClick={() => handleDelete(params.row._id)} >
                            <DeleteOutlineIcon />
                            Delete
                        </IconButton>
                        <StyledLink to={`/product/${params.row._id}`}>
                            <IconButton color='#007fff' >
                                <EditIcon />
                                Edit
                            </IconButton>
                        </StyledLink>
                    </>

                )
            }
        }
    ];
    return (
        <Container
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
            transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
            }}
        >
            <DataGrid
                rows={products}
                getRowId = {row=>row._id}
                columns={productListColumn}
                pageSize={10}
                rowsPerPageOptions={[5]}
                checkboxSelection
            />
        </Container>
    )
}