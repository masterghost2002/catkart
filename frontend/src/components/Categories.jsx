import styled from "styled-components";
import { CategoryItem } from "./CategoryItem";
import { categories } from "../slidetempdata";
import {mobile} from '../responsive';
const Container = styled.div`
    display: flex;
    padding: 20px;
    justify-content: space-between;
    ${mobile({padding:"0px", flexDirection:"column"})};
`

export const Categories = () => {
  return (
    <Container>
        {
            categories.map((item, index)=>
                <CategoryItem key = {index} item = {item}/>
            )
        }
    </Container>
  )
}
