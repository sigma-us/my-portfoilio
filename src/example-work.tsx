import React, {Component} from 'react';
import ExampleWorkBubble from './components/example-bubble'

class ExampleWork extends Component<any, any> {
    render() {
        return (
            <section className="section section--alignCentered section--description">

                {this.props.work.map((example: any, i: string) => {
                    return (
                        <ExampleWorkBubble example={example} key={i}></ExampleWorkBubble>
                    )
                })}

            </section>
        )
    }
}

export default ExampleWork