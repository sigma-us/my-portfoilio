import React, { Component } from 'react';
// import ExampleWorkBubble from './components/example-bubble'
import { Link } from 'react-router-dom';
import styled from 'styled-components';


const AppC = styled.div`
    width: 100%

`
const DarkBackGroundColor = 'rgb(30, 33, 39)';

const TextContainer = styled.div`
    position: fixed;
    top: 0px;
    z-index: 1;
    left: 0px;
    width: 100%;
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
const GhostContainer = styled.div`
    width: 100%;
    height: 65vh;
`;

const PostContainer = styled.div`
    position: relative;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    background-color: rgba(30,33,40, 1);
    height: fit-content;
    width: 100%;
    padding: 60px 0px 60px 0px;
    border: none;
    z-index: 2;

`

const Post = styled.div`
    border-radius: 12px;
    position: relative;
    height: 250px;
    width: 500px;
    margin: 8px;
    background-image: ${params => params.title ? `url("../images/${params.title}.png")` : `url("../images/${params.title}.png")`};
    background-position: center center;
    background-size: cover;

    @media(max-width: 991px) {
        width: 300px;
        height: 150px;
    }

    transition: all 0.3s ease;
    
    &:after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border-radius: 10px;

        background: linear-gradient(135deg, rgba(30, 33, 39, 0.96) 40%, rgba(0, 41, 93, 0.96) 100%);
    }

    box-shadow: 2px 2px 2px 0 rgba(0,0,0,1);

    &:hover {
        box-shadow: 8px 8px 8px 0 rgba(0,0,0,1);
        cursor: pointer;
    }

    &:hover div {
        color: white;
    }
`

const Title = styled.div`
    position: relative;
    top: 40px;
    left 40px;
    font-size: 40px;
    font-weight: 100;
    letter-spacing: 0.7px;
    z-index: 2;
    color: rgba(255,255,255,0.8);
    transition: all 0.5s ease;

    @media(max-width: 991px) {
        font-size: 24px;
    }
`;

const AboutMeText = styled.div`
    position: relative;
    font-weight: 100;
    letter-spacing: 0.7px;
    line-height: 32px;
    padding: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    text-align: left;
    background-color: rgb(30,33,40);
    z-index: 4;

    
    div {
        width: 800px;
        height: fit-content;
        border: 1px solid rgb(30,33,40);
        border-radius: 8px;
        padding: 32px 32px 64px 32px;
        background-color: rgb(45,45,45);
        color: rgb(255,255,255);
        box-shadow: 2px 2px 2px 0px rgb(0,0,0);
    }
    @media(max-width: 991px) {
        font-size: 16px;
        line-height: 22px;
        padding: 24px;

        div {
            padding: 16px;
        }
    }

`

const AboutMeHeading = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(30, 33, 40, 1);
    height: 250px;
    font-size: 48px;
    color: white;
    text-align: center;
    font-weight: 200;
    letter-spacing: 0.7px;
    z-index: 2;

    @media(max-width: 991px) {
        font-size: 48px;
        height: 80px;
    }
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
                <GhostContainer></GhostContainer>
                <PostContainer>
                    <Link to="/checkers" style={linkStyle}>
                        <Post title="example4">
                            <Title>
                                Checkers (React.js)
                            </Title>
                        </Post>
                    </Link>
                    <Link to="/3js" style={linkStyle}>
                        <Post title="example3">
                            <Title>
                                ThreeJS (React.js)
                        </Title>
                        </Post>
                    </Link>
                    {/* <Post></Post>
                    <Post></Post> */}
                </PostContainer>

                <AboutMeHeading>
                    Whats Happening
                </AboutMeHeading>

                <AboutMeText>
                    <div>
                        Currently working on upgrading existing infrastructure and CI/CD: 
                        <br/>- move from AWS Codepipeline to CircleCi 
                        <br/>- update terraform config to prevent breaking changes with v4
                        <br/>- launch strapi headless CMS + DevOps automation magic
                        <br/>- update react app and include GatsbyJs with more magic
                        <br/>- have fun
                        {/* {`I have 3+ years experience in Full-Stack Web Development and Cloud Architecture. I have been using AWS since the beginning and
                        love to design and build custom solutions to solve problems in the most cost-efficient way possible without sacrificing performance. (Since building 
                        this site I have come to discover that many frontend javascript frameworks are a bit overkill for many use cases, SSR appears to be ideal for SEO as well as initial page rendering.
                        For businesses and individuals that wish to design for scale I would recommend a blend of SSR with minimal frontend javascript). This website is being
                        hosted on AWS CloudFront with Route 53 for decreased latency and increased availability. There is much I can do to optimize the performance of this website. I am blessed to have an 
                        employer to keep me busy during these times, so this page will remain as it is for now. I will slowly optimize this site as time permits.`} */}
                    </div>
                </AboutMeText>
            </AppC>
        )
    }
}

export default App;