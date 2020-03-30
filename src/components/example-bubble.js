import React from 'react';

class ExampleWorkBubble extends React.Component {
    render() {
        const example = this.props.example;

        return (
            <div className="section__exampleWrapper">
                <div className="section__example">
                    <img alt={example.image.desc}
                        className="section__exampleImage"
                        src={example.image.src} />

                    <dl className="color--cloud">
                        <dt className="section__exampleTitle section__text--centered ">
                            {example.title}
                        </dt>
                        <dd></dd>
                    </dl>
                </div>
            </div>
        )
    }
}


export default ExampleWorkBubble;