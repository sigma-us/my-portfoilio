import React from 'react';
import ReactDOM from 'react-dom';
import App from './app'
import { BrowserRouter as Router, Route, Switch, Redirect, } from 'react-router-dom';
// import ScrollToTop from './scroll-to-top'

import Board from './projects/checkers/board';
import NavBar, { Types } from './components/navbar'
// import Blog from './projects/blog/main';
import * as serviceWorker from './serviceWorker';
interface MyWork {
    title: string,
    path: string,
    image: {
        desc: string,
        src: string,
        comment: string
    },
    link?: string
}

const NavList: any = [
    { title: "Projects", path: "/", type: Types.Link },
    { title: "Services", path: "/services", type: Types.Link },
    { title: "About", path: "/about", type: Types.Link },
    // { title: "Search", type: Types.Input }
]

const myWork: MyWork[] = [
    {
        title: "React Checkers",
        path: "/checkers",
        image: {
            desc: "example screenshot of react checkers frontend",
            src: "images/example1.png",
            comment: ""
        }
    }, {
        title: "Blog",
        path: "/blog",
        image: {
            desc: "A serverless blog",
            src: "images/example2.png",
            comment: ""
        }

    }, {
        title: "Stay Tuned For Meow",
        path: "",
        image: {
            desc: "cat photo",
            src: "images/example3.png",
            comment: ""
        }
    }
]

const render = () => {

ReactDOM.render(
    <Router>
            {/* <ScrollToTop> */}
                <NavBar list={NavList}></NavBar>
                <Switch>

                    <Route exact path='/'>
                        <App work={myWork} />
                    </Route>
                    <Route exact path='/checkers'>
                        <Board />
                    </Route>
                    <Route exact path='/services'>

                    </Route>
                    {/* Not Found */}
                    <Route route="*" component={() => <Redirect to="/" />} />
                </Switch>
            {/* </ScrollToTop> */}
    </Router>
    , document.getElementById('main'));
}

render();

if (module.hot) {
    console.log(module)
    module.hot.accept();
  }
serviceWorker.unregister();
