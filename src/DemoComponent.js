import React, {Component} from 'react';
import Nanoflux from 'nanoflux-fusion';

class DemoComponent extends Component
{

	constructor()
	{
		super();
		this.state = {
			text: '',
			flag: false
		}
	}

	componentWillMount(){
		this.subscription = Nanoflux.getFusionStore().subscribe( this, this.setState )
	}

	componentWillUnmount(){
		this.subscription.unsubscribe();
	}

	render()
	{
		return (
			<div>
				<h2>{this.state.text}</h2>
				<h2>{this.state.flag.toString() === 'true' ? 'Is checked, dude' : 'Huuh?'}</h2>
			</div>
		);
	}
}

export default DemoComponent;