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
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    right: 0px;
    // bottom: 0px;
    z-index: 999;
    height: 60px;
    color: black;
    background: white;
    font-size: 96px;
    text-align: center;
    padding: 8px;
    transition: all 500ms linear;

    &.transparent {
        background-color: transparent;
        box-shadow: none;
        color: rgb(245, 245, 245);
    }

    div, i {
        padding: 16px;
        font-size: 36px;
    }

    i:hover {
        cursor: pointer;
    }
`;

const MobileMenu = styled.div`
    position: fixed;
    z-index: 99999;
    top: 0px;
    right: 0px;
    width: 0px;
    height: 0%;
    background-color: rgba(255, 255, 255, 0.8);
    transition: width 0.1s ease, background-color 0.1s ease, visibility 0.1s ease, font-size 0.1s ease, height 100ms ease;
    // transition: all 500ms ease;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: flex-start;
    font-size: 36px;
    visibility: hidden;

    

    &.visible {
        i {
            font-size: 36px;
            height: 36px;
        }

        width: 100%;
        height: 100%;
        background-color: rgba(255, 255, 255, 1);
        visibility: visible;

        a {
            padding: 16px 24px 16px 0px !important;
        }
        
    }

    &.hidden {
        i {
            font-size: 8px;
            height: 8px;
            visibility: hidden;
        }

        visibility: hidden;
        width: 0px;
        font-size: 0px;
    }
    
    i {
        width: calc(100% - 32px);
        height: 0px;
        color: black;
        font-size: 0px;
        text-align: right;
        padding: 16px 24px 16px 16px;
        transition: all 100ms ease;
    }
    a {
        text-align: right;
        width: 100%;

        padding-right: 32px !important;
    }
    

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
            visible: false
        }
        this.toggleMenu = this.toggleMenu.bind(this);
    }

    componentDidMount() {
        window.addEventListener('scroll', this.listenToScroll);
        window.addEventListener('resize', this.resizeListener);
        if (Math.abs(window.innerWidth) < 991) {
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
        if (window.innerWidth < 991) {
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

    toggleMenu() {
        this.setState({
            visible: !this.state.visible
        })
    }


    render() {

        if (this.state.mobileNav === false) {
            // if (true) {

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
                            rel="noopener noreferrer"
                            target="_blank"
                            style={linkStyle}
                            href="https://linkedin.com/in/kyle-conley">
                            <i className="fa fa-linkedin"></i>
                        </a>

                        <a className="social color--skyBlue"
                            title="GitHub Profile"
                            rel="noopener noreferrer"
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
                <div>
                    <MobileNav className={this.state.scrollPosition > 0.00 ? "transparent" : "white"}>
                        <div>
                            <Link to="/" style={linkStyle}>
                                KC
                            </Link>
                        </div>
                        <i className="fa fa-bars"
                            aria-hidden="true"
                            onClick={this.toggleMenu}></i>
                    </MobileNav>
                    <MobileMenu className={this.state.visible ? "visible" : "hidden"}>
                        <i className="fa fa-close"
                            aria-hidden="true"
                            onClick={this.toggleMenu}></i>
                        <Link to="/" style={linkStyle} onClick={this.toggleMenu}>Home</Link>
                        <Link to="/checkers" style={linkStyle} onClick={this.toggleMenu}>Checkers</Link>
                        <Link to="/3js" style={linkStyle} onClick={this.toggleMenu}>ThreeJS</Link>
                    </MobileMenu>
                </div >
            )
        }

    }
}