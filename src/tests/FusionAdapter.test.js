import Nanoflux from 'nanoflux-fusion';
import FusionAdapter from '../FusionAdapter';



describe('FusionAdapter', () => {

	beforeEach(() =>  {
		Nanoflux.reset();
		Nanoflux.createFusionator({
				test : () => ({a:'foo'})
			}, {a:null})
		}
	);

	afterAll(()=> Nanoflux.reset());

	it('FusionAdapter mounts correctly, i.e. listens to Nanoflux', () => {
		const adapter = new FusionAdapter();
		adapter.mount(this, (state) => {
			expect(state.a).toEqual('foo');
		});

		const actor = Nanoflux.getFusionActor('test');
		actor();
	});

	it('FusionAdapter unmounts correctly, i.e. stops listening', () => {
		const adapter = new FusionAdapter();
		const callback = jest.fn();
		adapter.mount(this, callback);
		adapter.unmount(this, callback);
		const actor = Nanoflux.getFusionActor('test');
		actor();
		expect(callback).not.toHaveBeenCalled();
	});

	it('FusionAdapter.getState', () => {
		const adapter = new FusionAdapter();
		adapter.mount(this, ()=>{});

		const actor = Nanoflux.getFusionActor('test');
		actor();
		const state = adapter.getState();
		expect(state.a).toEqual('foo');
	});


	it('FusionAdapter.setState', () => {
		const adapter = new FusionAdapter();
		const callback = jest.fn();
		adapter.mount(this, callback);

		const actor = Nanoflux.getFusionActor('test');
		actor();
		const newValue = 'bar';
		const context = {
			keypath:'a'
		};
		adapter.setState(newValue, context);
		const state = adapter.getState();
		//expect(callback).toHaveBeenCalledWith({a:'bar'})

	});
});
