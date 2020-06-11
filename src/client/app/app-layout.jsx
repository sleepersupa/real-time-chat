import React from 'react';
import {Input} from "./common/input/input";
import {responsive} from "./common/responsive/responsive";
import {MenuBarIcon} from "./common/icons/icons";
import {menus} from "./app-commons";
import classnames from 'classnames';
import {ClickOutSide} from "./component/click-outside/click-out-side";
import {cartState} from "../../security/services/cart-state";

export class AppLayout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            windowHeight : null
        };
    }
    componentDidMount(){
        $('.app-layout').height($(window).height());
    }
    render() {
        const {children , history} = this.props ;
        let isMobile = responsive.lt("sm");
        return(
            <div className='app-layout'>
                {isMobile ? <MobileHeader /> : (
                    <div className="layout-header">
                        <div className="head-panel flex-row">
                            <img className='logo-image' src="/assets/heart.png" alt="logo"/>
                        </div>
                    </div>
                )}


                {children}
            </div>
        )
    }
}

class MobileHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show : false
        };
    }

    render() {
        const {show} = this.state;
        const {history} = this.props;

        return(
            <div className='layout-header mobile-header'>
                <div className="left">
                    <img className='logo-image' src="/assets/heart.png" alt="logo"/>
                </div>

                <div
                    onClick={() => this.setState({ show : !show})}
                    className="right">
                    <MenuBarIcon
                    />
                </div>

                <ClickOutSide
                    onClickOutSide={() => this.setState({ show : false })}
                >
                    <div className={classnames("menu-side" , show && "show")}>
                        {menus.map((item, index) =>(
                            <a key={index}  href={item.path || ""}>
                                <div
                                    onClick={() => history.push(item.path || "/")}
                                    className='menu'>
                                    {item.label}
                                </div>
                            </a>
                        ))}
                    </div>
                </ClickOutSide>

            </div>
        )
    }
}