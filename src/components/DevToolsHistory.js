import React, {Component} from 'react';

const DevToolsStateItem = (props) => {
	return	(
		<div className={`devtools-state-item ${props.selected ? 'selected' : ''}`} onClick={() => {props.onClick(props.age, props.state)} }>
			<p>{`${props.action} - age ${props.age}`}</p>
		</div>
	)
};

DevToolsStateItem.propTypes = {
	onClick : React.PropTypes.func.isRequired,
	age : React.PropTypes.number.isRequired,
	state : React.PropTypes.object.isRequired,
	action : React.PropTypes.string.isRequired,
	selected : React.PropTypes.bool
};

class DevToolsHistory extends Component{

	render(){
		const items =  this.props.historyItems.map( (item, index) => <DevToolsStateItem
			key={index}
			age={index}
			onClick={this.props.onSelected}
			state={item.state}
			action={item.action}
			selected={index === this.props.selectedItemIndex } />);

		return (
			<div className="devtools-history">
				{items}
			</div>
		)
	}
}

DevToolsHistory.propTypes = {
	historyItems : React.PropTypes.array.isRequired,
	onSelected : React.PropTypes.func.isRequired,
	selectedItemIndex : React.PropTypes.number
};

DevToolsHistory.defaultProps = {
	selectedItemIndex  : 0
};

export default DevToolsHistory;