import React from "react";
import { useParams } from "react-router-dom";

import { getScoreGraphData } from "../../util/GraphDataGenerator";
import { getActivityData, getChatData, getExerciseData, getMealData, getMedicineData, getSleepData, getTitleData, getToiletData } from "../../util/DataParser";

import { Container, ContentContainer, Row, Title, Description, Column, Message } from "./style";
import Header from "../../components/Header";
import SmallCard from "../../components/SmallCard";
import BigCard from "../../components/BigCard";
import Tab from "../../components/Tab";
import { IoMdHappy, IoMdSad } from "react-icons/io";

import RadarChartComp from "../../graph/RadarChartComp";
import { generateActivityMessage, generateExerciseMessage, generateMealMessage, generateMedicineMessage, generateSleepMessage, generateToiletMessage } from "../../util/MessageGenerator";

function SummaryPage(props) {
    const { id } = useParams();

    const goDetail = (type) => props.history.push(`/${id}/detail/${type}`); 

    // Graph
    const scoreGraphData = getScoreGraphData(id);

    // Habit score
    const sleepScore = getSleepData(id).summary.score.toFixed(0);
    const mealScore = getMealData(id).summary.score.toFixed(0);
    const toiletScore = getToiletData(id).summary.score.toFixed(0);
    const exerciseScore = getExerciseData(id).summary.score.toFixed(0);
    const medicineScore = getMedicineData(id).summary.score.toFixed(0);
    const activityScore = getActivityData(id).summary[0].ac_score.toFixed(0);

    // Habit message
    const sleepMessage = generateSleepMessage(id);
    const mealMessage = generateMealMessage(id);
    const toiletMessage = generateToiletMessage(id);
    const exerciseMessage = generateExerciseMessage(id);
    const medicineMessage = generateMedicineMessage(id);
    const activityMessage = generateActivityMessage(id);

    // Title
    const titleData = getTitleData(id);

    // Chat
    const chatSummaryData = getChatData(id).summary;

    return (
        <Container>
            <Header user={id}/>
            <ContentContainer>
                <RadarChartComp data={scoreGraphData}/>
                <SmallCard title="??????" score={sleepScore} message={sleepMessage} onClick={() => goDetail('sleep')}/>
                <SmallCard title="??????" score={mealScore} message={mealMessage} onClick={() => goDetail('meal')}/>
                <SmallCard title="??????" score={toiletScore} message={toiletMessage} onClick={() => goDetail('toilet')}/>
                <SmallCard title="??????" score={exerciseScore} message={exerciseMessage} onClick={() => goDetail('exercise')}/>
                <SmallCard title="??? ??????" score={medicineScore} message={medicineMessage} onClick={() => goDetail('medicine')}/>
                <SmallCard title="??????" score={activityScore} message={activityMessage} onClick={() => goDetail('activity')}/>
                <BigCard title="?????????">
                    {
                        titleData.map((title, index) => (
                            <Row key={index}>
                                <Title>{title[0]}</Title>
                                <Description>{title[1]}</Description>
                            </Row>
                        ))
                    }
                </BigCard>
                <BigCard title="???????????? ??????" onClick={() => props.history.push(`/${id}/chat`)}>
                    <Column>
                        {chatSummaryData.dis_sc >= 0.5 ? <IoMdHappy size="3rem"/> : <IoMdSad size="3rem"/>}
                        <Message>{chatSummaryData.summ || `????????? ?????? ????????? ????????? ????????????????????? ????????? ?????? ?????????????????? ??? ?????????????`}</Message>
                    </Column>
                </BigCard>
            </ContentContainer>
            <Tab id={id} selected={0}/>
        </Container>
    );
}

export default SummaryPage;
