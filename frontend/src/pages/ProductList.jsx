import { useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { Products } from "../components/Products";
import {mobile} from '../responsive';
const Container = styled.div`
  
`
const Title = styled.h1`
  margin:20px;
`
const FilterContainer = styled.div`
  display:flex;
  justify-content: space-between;
  margin:20px;
`
const Filter = styled.div`
margin: 20px;
${mobile({margin:"0px 20px", display:"flex", flexDirection:"column"})}

`
const FilterText = styled.span`
  font-size: 20px;
  font-weight: 500;
  ${mobile({margin:"0px"})}
`
const Select = styled.select`
  margin-left:10px;
  padding:5px;
  background-color:white;
  border:2px solid black;
  ${mobile({margin:"10px 0px"})}
`
const Option = styled.option`
`
export const ProductList = () => {
  const location = useLocation();
  const categorie = location.pathname.split('/')[2];
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState('newest');


  const handleFilters = (event)=>{
    const value = event.target.value;
    setFilters({
      ...filters,
      [event.target.name]:value,
    });
   
  }
  return (
    <Container>
        <Title>
          Dresses
        </Title>
        <FilterContainer>
          <Filter >
            <FilterText>Filter Products:</FilterText>
            <Select name="color" onChange={handleFilters}>
              <Option disabled selected>
                Color
              </Option>
              <Option value="white">White</Option>
              <Option value="red">Red</Option>
              <Option value="black">Black</Option>
              <Option value="blue">Blue</Option>
              <Option value="yellow">Yellow</Option>
              <Option value="green">Green</Option>
            </Select>
            <Select name="size" onChange={handleFilters}>
              <Option disabled selected>
                Size
              </Option>
              <Option>XS</Option>
              <Option>S</Option>
              <Option>M</Option>
              <Option>L</Option>
              <Option>XL</Option>
              <Option>XXL</Option>
            </Select>
          </Filter>
          <Filter>
          <FilterText>Sort Products:</FilterText>
          <Select onChange={e=>setSort(e.target.value)}>
              <Option selected value='newest'>
                Newest
              </Option>
              <Option value='asc'>Price (lower to higher)</Option>
              <Option value='desc'>Price (higher to lower)</Option>
            </Select>
          </Filter>
        </FilterContainer>
        <Products categorie={categorie} filters={filters} sort = {sort}/>
    </Container>
  )
}
