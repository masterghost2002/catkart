import styled from "styled-components";
import FeaturedItem from "./FeaturedItem";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { ArrowUpward } from "@mui/icons-material";
import { useState, useEffect } from 'react';
import { userRequest } from "../../requestMethods";
const Container = styled.div`
  width:100%;
  display:flex;
  justify-content:space-between;
  margin-top:20px;
`


export default function FeaturedInfo() {
  const [revanue, setRevanue] = useState([{total: 0}, {total:0}]);
  const [percentage, setPercentage] = useState(0);
  useEffect(() => {
    const getIncome = async () => {
      try {
        const res = await userRequest.get("orders/income");
        setRevanue(res.data);
        setPercentage(Math.floor((res.data[1].income * 100) / res.data[0].income - 100));
      } catch (error) {
        console.log(error);
      }
    }
    getIncome();
  }, []);

  return (
    <Container>
     {revanue &&  <FeaturedItem
        title= "Revanue"
        moneyAmount={revanue[1].income}
        currencySign= {"\u20B9"}
        moneyRate={percentage}
        arrowType={percentage>0  ? <ArrowUpward sx={{ fontSize: "20px", color: "green" }} /> : <ArrowDownwardIcon sx={{ fontSize: "20px", color: 'red' }} />}
      />}
    </Container>
  )
}
