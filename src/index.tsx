import React from 'react';
import ReactDOM from 'react-dom';
import ExampleWork from './example-work'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
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

ReactDOM.render(
    <Router>
        <Switch>

            <Route path='/'>
                <ExampleWork work={myWork} />
            </Route>
            <Route path='/checkers' component={Board}>
                {/* <Board /> */}
            </Route>
            {/* Not Found */}
            <Route component={() => <Redirect to="/" />} />
        </Switch>
    </Router>
    , document.getElementById('main'))
console.log('webpack works index tsx file');


serviceWorker.unregister();
