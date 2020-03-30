import React from 'react';
import ExampleWorkBubble from './components/example-bubble'

class ExampleWork extends React.Component {
    render() {
        return (
            <section className="section section--alignCentered section--description">

                {this.props.work.map((example, i) => {
                    return (
                        <ExampleWorkBubble example={example} key={i}></ExampleWorkBubble>
                    )
                })}

            </section>
        )
    }
}

export default ExampleWork