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
    background: white;
    color: rgb(30, 33, 39);
    padding: 16px;
    font-size: 24px;
    box-shadow: 0 5px 12px -6px rgba(0,0,0,0.7);
    letter-spacing: 0.7px;
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
        console.log("props", this.props)
    }

    buildNav = (list: NavItem) => {
        console.log(list);
    }


    render() {
        return (
            <Navbar>
                <LeftNav>
                    Kyle Conley
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
    }
}