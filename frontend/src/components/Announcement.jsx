import styled from "styled-components";
const Container = styled.div`
    padding:10px;
    background-color: red;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    font-weight: 500;
    text-align:center;
`
export const Announcement = () => {
  return (
    <Container id='announcement'>
        In early beta testing only few features are working
    </Container>
  )
}
