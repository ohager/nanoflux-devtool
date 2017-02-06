/* eslint-disable */
class BaseStoreAdapter {

	mount(context, updateCallback) {
		throw "mount(context, updateCallback): Implement me!"
	}

	unmount() {
		throw "unmount(): Implement me!"
	}

	getState() {
		throw "getState(): Implement me!"
	}

	setState(value, context){
		throw "getState(): Implement me!"
	}
}

export default BaseStoreAdapter
