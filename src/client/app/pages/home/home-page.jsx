import React from 'react';
import {Input} from "../../common/input/input";
import {messageApi} from "../../../api/message/message-api";
import {TextAreaForm} from "../../common/input-form/text-area-form/text-area-form";
import {TimeAgo} from "./time-ago/time-ago";
import moment from "moment";

export class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: "",
            messages: null
        };
        this.socket = io();
        messageApi.getMessages("5ecbfc084fe2d412d261accb").then(data => {
            this.setState({messages: data}, this.scrollToBottom)
        })
    }


    componentDidMount() {
        this.socket.on("chat message", (data) => {
            this.setState({messages: this.state.messages.concat(data)}, this.scrollToBottom)
        })
    }

    scrollToBottom = () => {
        $(".room-chat").animate({scrollTop: $('.room-chat').prop("scrollHeight")}, 500);
    }

    onSend() {
        this.socket.emit('chat message', {message: this.state.message, userId: 123, name: "Huy Duc Bui"});
        setTimeout(() => {
            this.setState({message: ""}, this.scrollToBottom)
        })
    }

    render() {
        const {messages} = this.state;
        let randomHue = () => Math.floor(Math.random() * 180);
        return (
            <div className='home-page'>
                <div className="room-chat">
                    {messages && messages.map((message, index) => {
                        return (
                            <div key={index} className='message'>
                                <span className="status"></span>
                                <img style={{"filter": `hue-rotate(${randomHue()}deg)`}} src="/uploads/avatar.png"
                                     className="avatar" alt=""/>
                                <span className="name">Huy Duc Bui</span>
                                <p className="text">
                                    {message.text}
                                </p>
                                <TimeAgo
                                    date={moment(message.created).toDate()}
                                />
                            </div>
                        )
                    })}
                </div>


                <div className="actions">
                    <TextAreaForm
                        type="text"
                        value={this.state.message}
                        onChange={(e) => this.setState({message: e.target.value})}
                        placeholder="Message"
                        onKeyDown={(e) => {
                            if (e.keyCode === 13) {
                                this.onSend();

                            }
                        }}
                    />
                    <i
                        onClick={(e) => {
                            this.onSend();
                        }}
                        className="fas fa-paper-plane"></i>
                </div>


            </div>
        )
    }
}