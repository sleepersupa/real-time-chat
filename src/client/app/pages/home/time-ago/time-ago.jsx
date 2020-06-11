import React from 'react';
import ReactTimeAgo from 'react-time-ago'
import JavascriptTimeAgo from 'javascript-time-ago'

import en from 'javascript-time-ago/locale/en'

JavascriptTimeAgo.addLocale(en)

export class TimeAgo extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {date} = this.props;

        return(
            <div className='time-ago'>
                <ReactTimeAgo date={date}/>
            </div>
        )
    }
}