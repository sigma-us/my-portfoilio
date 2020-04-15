import React from 'react';

class ExampleWorkBubble extends React.Component<any, any> {
    render() {
        const example = this.props.example;
        // const link = this.props.example.link as string;

        return (
            // // <a href={link} target='_blank'>
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
            // </a>
        )
    }
}


export default ExampleWorkBubble;