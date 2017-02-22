import React, {Component, createFactory} from 'react';
import _ from 'lodash';
import JsonInspectorValueEditor from './components/JsonInspectorValueEditor';
import DevToolsStateEditor from './components/DevToolsStateEditor';
import DevToolsHistory from './components/DevToolsHistory';

class DevTools extends Component {

	constructor() {
		super();
		this.state = { history: [], selectedHistoryItem: 0 };
		this.onHistoryItemClicked = this.onHistoryItemClicked.bind(this);
	}

	getChildContext(){
		return { storeAdapter: this.props.storeAdapter }
	}

	onStoreUpdate(state, actionName ) {
		let history = this.state.history;
		history.unshift({action: actionName, state:_.cloneDeep(state)});
		this.setState({history: history});
	}

	componentWillMount() {
		this.props.storeAdapter.mount(this, this.onStoreUpdate);
		this.valueEditorFactory = createFactory(JsonInspectorValueEditor);
	}

	componentWillUnmount() {
		this.props.storeAdapter.unmount();
	}

	onHistoryItemClicked(index){
		this.setState({selectedHistoryItem: index});
	}

	render() {

		const currentState = this.state.history[this.state.selectedHistoryItem] || { state: {}};

		return (
			<div className="devtools-container">
				<h2>Flux DevTools</h2>
				<hr/>
				<DevToolsStateEditor state={currentState.state} editorFactory={this.valueEditorFactory}/>
				<hr/>
				<DevToolsHistory historyItems={this.state.history} onSelected={this.onHistoryItemClicked} selectedItemIndex={this.state.selectedHistoryItem}/>
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
