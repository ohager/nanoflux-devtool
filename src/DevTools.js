import React, {Component, createFactory} from 'react';
import JsonInspector from 'react-json-inspector';

import './css/JsonInspector.css';
import './css/DevTools.css';


class CustomValueEditor extends Component{

	render(){
		if(this.props.isKey) return null;

		return (
			<input className='json-inspector__selection'
			       size={Math.max(1, this.props.value.length)}
			       spellCheck={false} value={this.props.value}
			       onClick={e => e.stopPropagation()}
			       onFocus={e => e.target.select()}
			       onChange={e => console.log(e.target.value)}/>
		)
	}
}
CustomValueEditor.defaultProps = {
		value : ''
}



var customValueEditor = createFactory(CustomValueEditor);

const DevToolsStateItem  = (props) =>
		(
			<div>
				<JsonInspector data={props.storeState} search={false} interactiveLabel={customValueEditor}/>
			</div>
		)

DevToolsStateItem.propTypes = {
	storeState : React.PropTypes.object
};

class DevTools extends Component {

	constructor() {
		super();
		this.state = { };
	}

	onStoreUpdate(state){
		this.setState( {storeState: state });
	}

	componentWillMount(){
		this.props.storeAdapter.mount(this, this.onStoreUpdate);
	}

	componentWillUnmount(){
		this.props.storeAdapter.unmount();
	}

	renderStateItems(){
		//const stateProps = Object.keys(this.state.storeState);
		//return stateProps.map( (state, index) => <DevToolsStateItem key={index}/>)
		return <DevToolsStateItem storeState={this.state.storeState}/>
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
	storeAdapter : React.PropTypes.object.isRequired
};

export default DevTools;