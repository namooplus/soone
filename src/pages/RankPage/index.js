import React from "react";
import { useParams } from "react-router-dom";

import { Container, ContentContainer, Row, Rank, Detail } from "./style";
import Header from "../../components/Header";
import BigCard from "../../components/BigCard";
import Tab from "../../components/Tab";

function RankPage(props) {
    const { id } = useParams();

    // Rank data
    const rank = require('../../default/extra/rank.json');

    return (
        <Container>
            <Header user={id}/>
            <ContentContainer>
                <BigCard title="전체 순위">
                    {
                        rank.map((user, index) => (
                            <Row key={index}>
                                <Rank checked={id * 1 === user}>{index + 1}위</Rank>
                                <Detail checked={id * 1 === user}>{user}번</Detail>
                            </Row>
                        ))
                    }
                </BigCard>
            </ContentContainer>
            <Tab id={id} selected={2}/>
        </Container>
    );
}

export default RankPage;
