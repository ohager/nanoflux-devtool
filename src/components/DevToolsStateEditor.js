import React from 'react';
import JsonInspector from 'react-json-inspector';


const DevToolsStateEditor = (props) => (
	<div className="devtools-state-editor">
		<JsonInspector data={props.state || {}} search={false} interactiveLabel={props.editorFactory}/>
	</div>
);

DevToolsStateEditor.propTypes = {
	state : React.PropTypes.object.isRequired,
	editorFactory : React.PropTypes.func.isRequired
};

export default DevToolsStateEditor;