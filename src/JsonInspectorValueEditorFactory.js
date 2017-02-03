import React, {Component, createFactory} from 'react';

class JsonInspectorValueEditor extends Component{

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
JsonInspectorValueEditor.defaultProps = {
	value : ''
};

export default createFactory(JsonInspectorValueEditor);
