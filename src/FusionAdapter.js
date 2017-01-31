import Nanoflux from 'nanoflux-fusion/src/nanoflux-fusion';
import BaseStoreAdapter from './BaseStoreAdapter';

class FusionAdapter extends BaseStoreAdapter {

	mount(context, updateCallback) {
		this.listener = Nanoflux.getFusionStore().subscribe(context, updateCallback);
		console.log("Fusion Store mounted");
	}

	unmount() {
		this.listener.unsubscribe();
		console.log("Fusion Store unmounted");
	}

	getState() {
		return Nanoflux.getFusionStore().getState()
	}

}

export default FusionAdapter;
