import React, {Component} from 'react';

import './css/DevTools.css';

const DevToolsStateItem  = (props) =>
		(
			<div>
				<p>{JSON.stringify(props.storeState)}</p>
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