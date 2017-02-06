import React, {Component} from 'react';

class JsonInspectorValueEditor extends Component{

	constructor(){
		super();
		this.onBlur= this.onBlur.bind(this);
		this.onChange = this.onChange.bind(this);
	}

	componentWillMount(){
		this.setState({ value: this.props.value });
	}

	onBlur(e) {
		this.context.storeAdapter.setState(this.state.value, this.props);
	}

	onChange(e) {
		// two-way-bitching
		this.setState({value : e.target.value});
	}

	render(){
		if(this.props.isKey) return null;

		return (
			<input className='json-inspector__selection'
			       size={Math.max(1, this.props.value.length)}
			       spellCheck={false}
			       value={this.state.value}
			       onClick={e => e.stopPropagation()}
			       onFocus={e => e.target.select()}
			       onChange={ this.onChange }
			       onBlur={this.onBlur}/>
		)
	}
}

JsonInspectorValueEditor.propTypes = {
	value : React.PropTypes.string
};

JsonInspectorValueEditor.defaultProps = {
	value : ''
};

JsonInspectorValueEditor.contextTypes = {
	storeAdapter: React.PropTypes.object
};

export default JsonInspectorValueEditor;


