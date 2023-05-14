import styled from "styled-components";
import { motion } from "framer-motion";
import FeaturedInfo from "../components/featuredInfo/FeaturedInfo";
import Chart from "../components/chart/Chart";
import WidgetLg from "../components/widget/WidgetLg";
import WidgetSm from "../components/widget/WidgetSm";
import { useState, useEffect, useMemo } from "react";
import { userRequest } from "../requestMethods";
const Container = styled(motion.div)`
    flex:5;
    margin-bottom:50px;
`
const Widget = styled.div`
    display:flex;
    max-height:60vh;
`

export default function Home(){
    const MONTHS = useMemo(()=>[
        "###",
        "JAN",
        "FEB",
        "MAR",
        "APR",
        "MAY",
        "JUN",
        "JUL",
        "AUG",
        "SEPT",
        "OCT",
        "NOV",
        "DEC"
    ], []);

    const [userStats, setUserStats] = useState([]);
    useEffect(()=>{
        const getStats = async ()=>{
            try {
                const res = await userRequest.get("/user/stats");
                res.data.map((item)=>
                    setUserStats((prev)=>[
                        ...prev,
                        {name:MONTHS[item._id], "Active User":item.total},
                    ])
                );

            } catch (error) {
                console.log(error);
            }
        };
        getStats();
    },[MONTHS]);
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
            <FeaturedInfo/>
            <Chart
                title="User Analytics"
                data = {userStats}
                grid={true}
                xDataKey = "name"
                lineDataKey = "Active User"
            />
            <Widget>
                <WidgetSm/>
                <WidgetLg title="Latest Transactions" limit={10}/>
            </Widget>
        </Container>
    )
}