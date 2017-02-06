import React, {Component, createFactory} from 'react';
import _ from 'lodash';
import JsonInspector from 'react-json-inspector';
import JsonInspectorValueEditor from './JsonInspectorValueEditor'

import './css/JsonInspector.css';
import './css/DevTools.css';

const DevToolsStateEditor = (props) => (
	<div className="devtools-state-editor">
		<JsonInspector data={props.state || {}} search={false} interactiveLabel={props.editorFactory}/>
	</div>
);

DevToolsStateEditor.propTypes = {
	state : React.PropTypes.object.isRequired,
	editorFactory : React.PropTypes.func.isRequired
};

const DevToolsStateItem = (props) => {
	return	(
		<div className={`devtools-state-item ${props.selected ? 'selected' : ''}`} onClick={() => {props.onClick(props.age, props.state)} }>
			<p>{`State - age ${props.age}`}</p>
		</div>
	)
};

DevToolsStateItem.propTypes = {
	onClick : React.PropTypes.func.isRequired,
	age : React.PropTypes.number.isRequired,
	state : React.PropTypes.object.isRequired,
	selected : React.PropTypes.bool
};

class DevTools extends Component {

	constructor() {
		super();
		this.state = { history: [], currentStateIndex: 0 };
		this.onHistoryItemClicked = this.onHistoryItemClicked.bind(this);
	}

	getChildContext(){
		return { storeAdapter: this.props.storeAdapter }
	}

	onStoreUpdate(state) {
		let history = this.state.history;
		history.unshift(_.cloneDeep(state));
		this.setState({history: history});
	}

	componentWillMount() {
		this.props.storeAdapter.mount(this, this.onStoreUpdate);
		this.valueEditorFactory = createFactory(JsonInspectorValueEditor);
	}

	componentWillUnmount() {
		this.props.storeAdapter.unmount();
	}

	onHistoryItemClicked(index, state) {
		this.setState({currentStateIndex : index}); // can I use reference?! Why not? Need to see!
	}

	renderHistory() {
		const items =  _.map(this.state.history, (state, index) => <DevToolsStateItem
			key={index}
			age={index}
			onClick={this.onHistoryItemClicked}
			state={state}
			selected={index === this.state.currentStateIndex} />);

		return ( <div className="devtools-history">{items}</div> )
	}

	render() {

		const currentState = this.state.history[this.state.currentStateIndex] || {};

		return (
			<div className="devtools-container">
				<h2>Flux DevTools</h2>
				<hr/>
				<DevToolsStateEditor state={currentState} editorFactory={this.valueEditorFactory}/>
				<hr/>
				{this.renderHistory()}
			</div>
		);
	}
}

DevTools.propTypes = {
	storeAdapter: React.PropTypes.object.isRequired
};

DevTools.childContextTypes = {
	storeAdapter: React.PropTypes.object
};

export default DevTools;
