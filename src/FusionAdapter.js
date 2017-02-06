import Nanoflux from 'nanoflux-fusion';
import BaseStoreAdapter from './BaseStoreAdapter';
import _ from 'lodash';

const DevToolsNamespace = 'DevTools';

Nanoflux.createFusionator({
	setState: (prevState, args) => {
		const newValue = args[0];
		const {keypath} = args[1]; // context
		let cloned = _.cloneDeep(prevState);
		_.set(cloned, keypath, newValue );
		return cloned;
	}
}, {}, DevToolsNamespace);

const setStateActor = Nanoflux.getFusionActor('setState', DevToolsNamespace);

class FusionAdapter extends BaseStoreAdapter {

	mount(context, updateCallback) {
		this.fusionStore = Nanoflux.getFusionStore();
		this.listener = this.fusionStore.subscribe(context, updateCallback);
		console.log("Fusion Adapter mounted");
	}

	unmount() {
		this.listener.unsubscribe();
		console.log("Fusion Adapter unmounted");
	}

	getState() {
		return this.fusionStore.getState();
	}

	setState(newValue, context){
		setStateActor(newValue, context);
	}
}

export default FusionAdapter;
