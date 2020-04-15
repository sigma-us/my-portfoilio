import React from 'react';
import ReactDOM from 'react-dom';
import ExampleWork from './example-work'
import { BrowserRouter as Router, Route, Switch, Redirect, } from 'react-router-dom';
// import ScrollToTop from './scroll-to-top'

import Board from './projects/checkers/board';
import * as serviceWorker from './serviceWorker';


const myWork: any = [
    {
        title: "React Checkers",
        image: {
            desc: "example screenshot of react checkers frontend",
            src: "images/example1.png",
            comment: ""
        },
        link: "http://checkers.kconley.com.s3-website-us-east-1.amazonaws.com/"
    }, {
        title: "Coming Soon",
        image: {
            desc: "A serverless portfolio",
            src: "images/example2.png",
            comment: ""
        }

    }, {
        title: "Stay Tuned For Meow",
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

                <Switch>

                    <Route exact path='/'>
                        <ExampleWork work={myWork} />
                    </Route>
                    <Route exact path='/checkers'>
                        <Board />
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
    console.log('module hot')
    console.log(module)
    module.hot.accept();
  }
serviceWorker.unregister();
