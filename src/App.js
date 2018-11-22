import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  state = {
    voices: [],
    text: "hello world",
    voice: "",
    display: false
  };

  synth = window.speechSynthesis;

  handleClickLogo = e => {
    e.preventDefault();
    this.setState({
      display: !this.state.display,
      voices: this.synth.getVoices()
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    const voice = this.state.voices.find(
      voice => voice.name === this.state.voice
    );
    const utterThis = new SpeechSynthesisUtterance(this.state.text);
    utterThis.voice = voice;

    this.synth.speak(utterThis);
  };

  handleChangeText = e => {
    e.preventDefault();
    this.setState({
      text: e.currentTarget.value
    });
  };

  handleChangeSelect = e => {
    e.preventDefault();
    this.setState({
      voice: e.currentTarget.value
    });
  };

  render() {
    return (
      <div className="App">
        <section className="container">
          <img
            src={logo}
            className="logo"
            alt="logo"
            style={{ height: this.state.display ? "25vmin" : "50vmin" }}
            onClick={this.handleClickLogo}
          />
          <p>Toncho Speaker</p>
          {this.state.display && (
            <form onSubmit={this.handleSubmit}>
              <input
                type="text"
                placeholder="Text"
                value={this.state.text}
                onChange={this.handleChangeText}
              />
              <select onChange={this.handleChangeSelect}>
                {this.state.voices &&
                  this.state.voices.map(voice => (
                    <option key={voice.name} value={voice.name}>
                      {voice.lang}
                    </option>
                  ))}
              </select>
              <input type="submit" value="Speak!" />
            </form>
          )}
        </section>
      </div>
    );
  }
}

export default App;
