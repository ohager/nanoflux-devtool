import Nanoflux from 'nanoflux-fusion';

// define fusionator(s)
Nanoflux.createFusionator({
	setText: (prevState, args) => ({text: args[0]}),
	setCheckbox: (prevState, args) => ({flag: args[0]})
}, {text: ''});

// export actions
export default {
	setText: Nanoflux.getFusionActor('setText'),
	setCheckbox: Nanoflux.getFusionActor('setCheckbox')
}
