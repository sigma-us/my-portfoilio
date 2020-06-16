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
                        I have 3+ years experience in Full-Stack Web Development and Cloud Architecture. I have been using AWS since the beginning and
                        love to design and build custom solutions to solve problems in the most cost-efficient way possible without sacrificing performance. 
                        I have predominantly used Node.js over past 3 years however I am language agnostic and exploring Golang and C++. This website is being 
                        hosted on AWS CloudFront with Route 53 for decreased latency and increased availability.
                    </p>
                </section>
            </div>
        )
    }
}

export default App;