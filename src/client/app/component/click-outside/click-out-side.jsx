import React from 'react';
export class ClickOutSide extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount(){
        document.addEventListener('mousedown',this.handleClick,false) ;
    }

    componentWillUnmount(){
        document.removeEventListener('mousedown',this.handleClick,false) ;
    }

    handleClick=(e)=>{
        const {onClickOutSide} = this.props;
        if(this.node.contains(e.target)){
            return ;
        }
        onClickOutSide && onClickOutSide();

    };

    render() {
        const {children} = this.props ;
        return(
            <div
                ref={node => this.node = node}
                className='click-out-side'>
                {children}
            </div>
        )
    }
}