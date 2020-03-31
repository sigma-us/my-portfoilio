import React from 'react';
import ReactDOM from 'react-dom';
import ExampleWork from './example-work'

const myWork: any = [
    {
        title: "Work Example",
        image: {
            desc: "example screenshot of project code",
            src: "images/example1.png",
            comment: ""
        }

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

ReactDOM.render(<ExampleWork work={myWork}/>, document.getElementById('example-work'))

console.log('webpack works index js file');