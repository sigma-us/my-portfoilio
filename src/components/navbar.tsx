import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';


const Navbar = styled.div`
    position: fixed;
    z-index: 999999999;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: calc(100vw - 32px);
    height: 30px;
    background-color: white;
    color: rgb(30, 33, 39);
    padding: 16px;
    font-size: 24px;
    box-shadow: 0 5px 12px -6px rgba(0,0,0,0.7);
    letter-spacing: 0.7px;
    transition: background-color 1s ease-out, color 1s ease;

    &.transparent {
        background-color: transparent;
        box-shadow: none;
        color: rgb(245, 245, 245);
    }
`;

const MobileNav = styled.div`
    position: fixed;
    z-index: 999999999999;
    width: 96px;
    height: 96px;
    color: white;
    background: gray;
    font-size: 90px;
`;


const linkStyle = {
    color: 'inherit',
    textDecoration: 'none',
    padding: '8px',
    margin: '0px',
}

const RightNav = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 16px;
`

const LeftNav = styled.div`
    color: inherit;
    text-decoration: none;
`

export enum Types {
    Input = "Input",
    Link = "Link",
    Logo = "Logo"
}

interface NavItem {
    title: string,
    path?: string,
    type: Types
}

interface NavProps {
    list: NavItem[]
}

export default class NavBar extends Component<NavProps, any> {
    constructor(props: NavProps) {
        super(props);
        this.state = {
            scrollPosition: 0,
            mobileNav: false,
        }
    }

    componentDidMount() {
        window.addEventListener('scroll', this.listenToScroll);
        window.addEventListener('resize', this.resizeListener);
        if (Math.abs(window.screenX) < 700) {
            this.setState({
                mobileNav: true
            })
        }
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.listenToScroll);
        window.removeEventListener('resize', this.resizeListener);

    }

    resizeListener = () => {
        if (window.screenX > -700) {
            this.setState({
                mobileNav: true
            })
        } else {
            this.setState({
                mobileNav: false
            })
        }
    }

    listenToScroll = () => {
        const winScroll =
            document.body.scrollTop || document.documentElement.scrollTop;

        const height =
            document.documentElement.scrollHeight -
            document.documentElement.clientHeight;

        const scrolled = winScroll / height;

        this.setState({
            scrollPosition: scrolled,
        });

    }


    render() {

        // if (this.state.mobileNav == false) {
        if (true) {

            return (
                <Navbar className={this.state.scrollPosition > 0.00 ? "transparent" : "white"}>
                    <LeftNav>
                        <Link to="/" style={linkStyle}>
                            Kyle Conley
                    </Link>
                    </LeftNav>
                    <RightNav>
                        {this.props.list.map((item: NavItem, i: number) => {
                            return (
                                <Link key={i} to={item.path || ''} style={linkStyle}>
                                    {/* <div> */}
                                    {item.title}
                                    {/* </div> */}
                                </Link>
                            )
                        })}
                        <a className="color--skyBlue social"
                            title="LinkedIn Profile"
                            target="_blank"
                            style={linkStyle}
                            href="https://linkedin.com/in/kyle-conley">
                            <i className="fa fa-linkedin"></i>
                        </a>

                        <a className="social color--skyBlue"
                            title="GitHub Profile"
                            target="_blank"
                            style={linkStyle}
                            href="https://github.com/sigma-us">
                            <i className="fa fa-github"></i>
                        </a>
                    </RightNav>
                </Navbar>
            )
        } else {
            return (
                <MobileNav>
                    <i className="fa fa-bars" aria-hidden="true"></i>
                </MobileNav>
            )
        }

    }
}