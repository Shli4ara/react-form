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
        this.onClearState = this.onClearState.bind(this);

        this.state = {
            inputForm: false,
            resultForm: false,
            fioUser: "",
            ageUser: "",
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
        let correctValue;

        switch(type) {
            case 'fioUser':
                correctValue = event.target.value.replace(/[^a-zA-Zа-яА-Я\s-+()]/gi, "").replace(/\s{2,}/g, " ").replace(/^\s+/, "");
            break;
            case 'ageUser':
                correctValue = +event.target.value.replace(/[^0-9]/gi, "").substr(0, 2);
            break;
        }

        const state = this.state;
        state[type] = correctValue;
        this.setState(state);
    }

    inputForm() {
        let disableButton = "";

        if (!this.state.fioUser.length || this.state.ageUser == 0) {
            disableButton = "disable";
        };

        return (
            <div className={"modal-form"}>
                <form>
                    <p>Нам нужны Ваши данные!</p>

                    <input placeholder="Введите ФИО" value={this.state.fioUser} onChange={this.onChangeInput.bind(this, "fioUser")} type="text" />
                    <input placeholder="Введите возраст" value={this.state.ageUser} onChange={this.onChangeInput.bind(this, "ageUser")} type="text" />

                    <button disabled={disableButton} className={disableButton ? "disable" : ""} onClick={this.onShowModal.bind(this, "resultForm")}>Расчет</button>
                </form>
            </div>
        );
    }

    onClearState() {
        this.setState({
            inputForm: false,
            resultForm: false,
            fioUser: "",
            ageUser: "",
        })
    }

    resultForm() {
        if (this.state.inputForm) {
            this.onShowModal("inputForm");
        }

        return (
            <div className={"modal-form result-form"}>
                <p>Тебе {this.state.ageUser*2} лет!</p>

                <button onClick={this.onClearState}>Закрыть</button>
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
