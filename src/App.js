import React, {Component} from 'react';
import logo from './logo.svg';
import './css/App.css';
import DevTools from './DevTools'
import FusionAdapter from './FusionAdapter'
import FusionActors from './FusionActors'

class App extends Component {
	constructor(){
		super();
		this.onTextChange = this.onTextChange.bind(this);
	}

	onTextChange(event){
		FusionActors.setText(event.target.value);
	}

	onToggle(event){
		FusionActors.setCheckbox(event.target.checked);
	}

	render() {
		return (
			<div className="App">
				<DevTools storeAdapter={new FusionAdapter()}/>
				<div className="App-header">
					<img src={logo} className="App-logo" alt="logo"/>
					<h2>Welcome to React</h2>
				</div>
				<p className="App-intro">
					To get started, edit <code>src/App.js</code> and save to reload.
				</p>
				<div className="App-container">
					<input type="text" onChange={this.onTextChange} />
					<input type="checkbox" onChange={this.onToggle} />
				</div>
			</div>
		);
	}
}

export default App;
