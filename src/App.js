import React, { Component } from "react";
import PropTypes from "prop-types";

import logo from './logo.svg';
import './App.css';

class App extends Component {
    static get propTypes() {
        return {
            classPrefix: PropTypes.string.isRequired,
        };
    }
    static get defaultProps() {
        return {
            classPrefix: "app",
        };
    }
    constructor(props) {
        super(props);

        this.onShowModal = this.onShowModal.bind(this);
        this.onChangeInput = this.onChangeInput.bind(this);

        this.state = {
            inputForm: false,
            resultForm: false,
            fioUser: "",
            ageUser: 0,
        }
    }

    onShowModal(type, event) {
        if (event) {
            event.stopPropagation();
            event.preventDefault();
        }

        const state = this.state;
        state[type] = !this.state[type];
        this.setState(state);
    }

    onChangeInput(type, event) {
        const state = this.state;
        state[type] = event.target.value;
        this.setState(state);
    }

    inputForm() {
        return (
            <div className={"modal-form"}>
                <form>
                    <input placeholder="Введите ФИО" value={this.state.fioUser} onChange={this.onChangeInput.bind(this, "fioUser")} type="text" />
                    <input placeholder="Введите возраст" value={this.state.ageUser} onChange={this.onChangeInput.bind(this, "ageUser")} type="number" />

                    <button onClick={this.onShowModal.bind(this, "resultForm")}>Расчет</button>
                </form>
            </div>
        );
    }

    resultForm() {
        if (this.state.inputForm) {
            this.onShowModal("inputForm");
        }

        return (
            <div className={"modal-form"}>
                <p>Тебе {this.state.ageUser*2} лет!</p>

                <button onClick={this.onShowModal.bind(this, "resultForm")}>Закрыть</button>
            </div>
        );
    }

    render() {
        return (
            <>
                <div className={this.props.classPrefix}>
                    <header className="App-header">
                        <img src={logo} className="App-logo" alt="logo" />
                        <button onClick={this.onShowModal.bind(this, "inputForm")}>Открыть форму для ввода</button>
                    </header>
                </div>

                {this.state.inputForm && this.inputForm()}
                {this.state.resultForm && this.resultForm()}
            </>
        );
    }


}

export default App;
