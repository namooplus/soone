import React from "react";
import { useParams } from "react-router-dom";

import { Container, Header, Title, BackButton, ContentContainer } from "./style";
import BigCard from "../../components/BigCard";

function DetailPage(props) {
    const { id } = useParams();
    
    return (
        <Container>
            <Header>
                <BackButton>&lt;</BackButton>
                <Title>수면</Title>
            </Header>
            <ContentContainer>
                <BigCard title="일별 기록">
                    Content
                </BigCard>
                <BigCard title="이상치">
                    Content
                </BigCard>
            </ContentContainer>
        </Container>
    );
}

export default DetailPage;
