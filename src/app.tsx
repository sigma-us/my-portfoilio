import React, { Component } from 'react';
// import ExampleWorkBubble from './components/example-bubble'
import { Link } from 'react-router-dom';
import styled from 'styled-components';


const AppC = styled.div`
    position: relative;
    // top 62px;

`
const DarkBackGroundColor = 'rgb(30, 33, 39)';

const TextContainer = styled.div`
    height: 65vh;
    // background-color: ${DarkBackGroundColor};
    font-position: center;
    font-size: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    background-image: url("../images/spacex.jpg");
    background-position: center center;
    background-size: cover;
`

const PostContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    background-color: ${DarkBackGroundColor};
    height: fit-content;
    padding: 60px 0px 60px 0px;
    border: none;

`

const Post = styled.div`
    border-radius: 12px;
    position: relative;
    height: 450px;
    width: 500px;
    margin: 8px;
    background-image: ${params => params.title ? `url("../images/${params.title}.png")` : `url("../images/${params.title}.png")`};
    background-position: center center;
    background-size: cover;

    transition: all 0.3s ease;
    
    &:after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border-radius: 10px;

        background: linear-gradient(135deg, rgba(30, 33, 39, 0.96) 40%, rgba(42, 157, 255, 0.96) 100%);
    }

    box-shadow: 2px 2px 2px 0 rgba(0,0,0,1);

    &:hover {
        box-shadow: 8px 8px 8px 0 rgba(0,0,0,1);
        cursor: pointer;
    }
`

const Title = styled.div`
    position: relative;
    top: 40px;
    left 40px;
    font-size: 40px;
    font-weight: 100;
    letter-spacing: 0.7px;
    color: white;
    z-index: 2;
`
const AboutMeText = styled.div`
    font-weight: 100;
    letter-spacing: 0.7px;
    line-height: 32px;
    padding: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    text-align: left;
    background-color: inherit;

    div {
        width: 800px;
        height: fit-content;
        border: 1px solid rgb(30,33,40);
        border-radius: 8px;
        padding: 32px 32px 96px 32px;
        background-color: rgb(45,45,45);
        color: rgb(255,255,255);
        box-shadow: 2px 2px 2px 0px rgb(0,0,0);
    }

`

const AboutMeHeading = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(30, 33, 40, 1);
    height: 250px;
    font-size: 70px;
    color: white;
    text-align: center;
    font-weight: 200;
    letter-spacing: 0.7px;
`

const linkStyle = {
    color: 'inherit',
    textDecoration: 'none',
}

class App extends Component<any, any> {
    constructor(props: any) {
        super(props)
    }

    componentDidMount() {
        window.scrollTo(0, 0)
    }


    render() {

        return (
            <AppC>
                <TextContainer>
                    🚧🚧
                </TextContainer>
                <PostContainer>
                    <Link to="/checkers" style={linkStyle}>
                        <Post title="example4">
                            <Title>
                                React Checkers
                            </Title>
                        </Post>
                    </Link>
                    <Link to="/3js" style={linkStyle}>
                        <Post title="example3">
                            <Title>
                                Coming Soon
                        </Title>
                        </Post>
                    </Link>
                    {/* <Post></Post>
                    <Post></Post> */}
                </PostContainer>

                <AboutMeHeading>
                    About Me
                </AboutMeHeading>

                <AboutMeText>
                    <div>
                        {`I have 3+ years experience in Full-Stack Web Development and Cloud Architecture. I have been using AWS since the beginning and
                        love to design and build custom solutions to solve problems in the most cost-efficient way possible without sacrificing performance.
                        I have predominantly used Node.js over past 3 years however I am language agnostic and exploring Golang and C++. This website is being
                        hosted on AWS CloudFront with Route 53 for decreased latency and increased availability.`}
                    </div>
                </AboutMeText>
            </AppC>
        )
    }
}

export default App;