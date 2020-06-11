import React from "react";
import {security} from "../../../../security/secuiry-fe";
import {Form} from "../../common/form/form";
import {minLength, required} from "../../common/form/validations";
import {Input} from "../../common/input/input";

export class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            submitting: false,
            error: false
        };
    };

    onSubmit(e) {
        this.setState({submitting: true, error: false});
        e.preventDefault();
        e.stopPropagation();
        const {username, password} = this.state;
        // userApi.login({username, password}).then((data) =>{
        //     this.props.history.push("/manage")
        // },()=>{
        //     this.setState({error: true, submitting: false})
        // })

        security.login({username, password}).then((data) => {
            this.props.history.push(`/manage`)
        }, () => {
            this.setState({error: true, submitting: false})
        })

    }

    render() {
        let {username, password, submitting, error} = this.state;
        let validations = [
            {"username": [required("User name"), minLength(3, "User name")]},
            {"password": [required("Password"), minLength(3, "Password")]},
        ];

        return (
            <Form
                onSubmit={() => this.onSubmit()}
                formValue={this.state}
                validations={validations}
                render={(getInvalidByKey, invalidPaths) => (
                    <div className="login">
                        <h1>Login</h1>
                        {error && (
                            <div className="error-login">
                                Sai tài khoản hoặc mật khẩu
                            </div>
                        )}


                        <div className="row">
                            <div className="col-md-12">
                                <Input
                                    value={username}
                                    onChange={(e) => this.setState({username: e.target.value})}
                                    type="username"
                                    error={getInvalidByKey("username")}
                                    placeholder="User Name"
                                />
                            </div>

                            <div className="col-md-12">
                                <Input
                                    type="password"
                                    value={password}
                                    onChange={(e) => this.setState({password: e.target.value})}
                                    error={getInvalidByKey("username")}
                                    placeholder="Password"
                                />
                            </div>

                        </div>
                        <button
                            type="submit" className="btn btn-primary"
                        >
                            Login
                        </button>

                    </div>
                )}

            />
        );
    }
}