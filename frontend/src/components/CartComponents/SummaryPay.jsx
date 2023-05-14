import styled from 'styled-components';
import { mobile } from '../../responsive';
import Pay from '../Payment/Pay';
const Summary = styled.div`
    flex:1;
    border:0.5px solid lightgray;
    border-radius: 10px;
    padding:20px;
    height:60vh;
    ${mobile({ marginTop: "10px", borderRadius: '0px', marginBottom: '20px' })};
`
const SummaryTitle = styled.h1`
    font-weight:200;
`
const SummaryItem = styled.div`
    margin: 30px 0px;
    display:flex;
    justify-content:space-between;
    
`
const SummaryItemText = styled.span`
    font-weight: ${props => props.type === "total" && '500'};
    font-size: ${props => props.type === "total" && '24px'};
    
`
const SummaryItemPrice = styled.span`
    
`

export default function SummaryPay({total}) {
    return (
        <Summary>
            <SummaryTitle>Order Summary</SummaryTitle>
            <SummaryItem>
                <SummaryItemText>
                    Subtotal
                </SummaryItemText>
                <SummaryItemPrice>
                    {(total).toLocaleString('en-IN', {
                        style: 'currency',
                        currency: 'INR'
                    })}
                </SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
                <SummaryItemText>
                    Estimated Shipping
                </SummaryItemText>
                <SummaryItemPrice>
                    70
                </SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
                <SummaryItemText>
                    Shipping Discount
                </SummaryItemText>
                <SummaryItemPrice>
                    -70
                </SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
                <SummaryItemText type="total">
                    Total
                </SummaryItemText>
                <SummaryItemPrice>
                    {(total).toLocaleString('en-IN', {
                        style: 'currency',
                        currency: 'INR'
                    })}
                </SummaryItemPrice>
            </SummaryItem>
            {total > 0 && <Pay />}
        </Summary>
    )
}
