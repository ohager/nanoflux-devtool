import React, {Component, createFactory} from 'react';
import JsonInspector from 'react-json-inspector';
import JsonInspectorValueEditor from './JsonInspectorValueEditor'

import './css/JsonInspector.css';
import './css/DevTools.css';


class DevToolsStateItem extends Component {
	render() {
		return (

			<div>
				<JsonInspector data={this.props.storeState || {}} search={false} interactiveLabel={this.props.editorFactory}/>
			</div>
		)
	}
}

class DevTools extends Component {

	constructor() {
		super();
		this.state = {};
	}

	getChildContext(){
		return { storeAdapter: this.props.storeAdapter }
	}

	onStoreUpdate(state) {
		this.setState({storeState: state});
	}

	componentWillMount() {
		this.props.storeAdapter.mount(this, this.onStoreUpdate);
		this.valueEditorFactory = createFactory(JsonInspectorValueEditor);
	}

	componentWillUnmount() {
		this.props.storeAdapter.unmount();
	}

	renderStateItems() {
		//const stateProps = Object.keys(this.state.storeState);
		//return stateProps.map( (state, index) => <DevToolsStateItem key={index}/>)
		return <DevToolsStateItem storeState={this.state.storeState} editorFactory={this.valueEditorFactory}/>
	}

	render() {
		return (
			<div className="devtools-container">
				<h2>Flux DevTools</h2>
				<hr/>
				{ this.renderStateItems() }
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
