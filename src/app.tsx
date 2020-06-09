import React, { Component } from 'react';
import ExampleWorkBubble from './components/example-bubble'
import { Link } from 'react-router-dom';

class App extends Component<any, any> {
    constructor(props: any) {
        super(props)
    }

    componentDidMount() {
        window.scrollTo(0, 0)
    }


    render() {

        return (
            <div>
                <main className="overflow--auto">
                    <h1 className="color--skyBlue section__heading--largest">
                        Kyle Conley
                    </h1>

                    <ul className="section--social">


                        <li className="socialWrapper">
                            <a className="color--skyBlue social"
                                title="LinkedIn Profile"
                                target="_blank"
                                href="https://linkedin.com/in/kyle-conley">
                                <i className="fa fa-linkedin"></i>
                            </a>
                        </li>

                        {/* <!-- Link to GitHub profile --> */}
                        <li className="socialWrapper color--skyBlue">
                            <a className="social color--skyBlue"
                                title="GitHub Profile"
                                target="_blank"
                                href="https://github.com/sigma-us">
                                <i className="fa fa-github"></i>
                            </a>
                        </li>

                        {/* <!-- Link to resume, probably a .pdf --> */}
                        {/* <li className="socialWrapper">
                            <a className="social color--skyBlue"
                                title="Resume"
                                href="#">
                                <i className="fa fa-file-text"></i>
                            </a>
                        </li>  */}
                    </ul>
                </main>

                <section className="background--skyBlue section">
                    <h2 className="color--cloud margin--none section__text--centered">
                        🚧 👷🏻‍♂️🐒 Portfolio Under Construction: 🦍👋🏻 🚧
                    </h2>
                </section>

                <div id='example-work'>
                    <section className="section section--alignCentered section--description">

                        {this.props.work.map((example: any, i: string) => {
                            console.log(example);
                            return (
                                <Link key={i} to={example.path}>

                                    <ExampleWorkBubble
                                        example={example}
                                        key={i} />
                                </Link>
                            )
                        })}

                    </section>
                </div>


                <section className="background--skyBlue section">
                    <h2 className="color--cloud margin--none section__text--centered">
                        About Me
                    </h2>
                </section>

                <section className="section section--alignCentered section--description">
                    <p className="color--darkgrey section__description">
                        I have 3+ years experience in Full-Stack Web Development. I have been using AWS since the beginning and
                        love to build cloud based micro-services. I have predominantly used Node.js the past 3 years however I am
                        language agnostic and my CI/CD pipeline in AWS for this project is written using Golang. I am teaching myself Golang
                        and C++ because I wish to get more familiar with Computer Vision, Artificial Intelligence, and Machine Learning. This website is
                        being hosted with AWS S3 through CloudFront for decreased latency and increased scalability.
                    </p>
                </section>
            </div>
        )
    }
}

export default App;