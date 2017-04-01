
//Use HOC box to import HOCs all in once place so you dont have to import HOCs on every component.
//Not implemented yet, need a way for user to import their own HOCs.
const HOCbox = {
	updateReporterHOC: updateReporterHOC
};

function chainHOC (baseComponent, HOCarray) {
	let HOCchain = baseComponent;
	
	if(HOCarray) {

		HOCchain = HOCarray.reduce((accumulator, currentValue, index, array) => {
			if(typeof currentValue === 'function') return currentValue(accumulator);
			if(HOCbox[currentValue] === null) return accumulator;
			if(!HOCbox[currentValue]) {
				console.warn(`${currentValue} not found in HOCbox. From ${baseComponent.name || baseComponent.displayName}`)
				return accumulator;
			}
			return HOCbox[currentValue](accumulator)
		}, baseComponent)
	}

	return HOCchain 

}


function updateReporterHOC (WrappedComponent) {

	class UpdateReporterHOC extends WrappedComponent {
		constructor(...args) {
			super(...args); 
			this.name = WrappedComponent.displayName || WrappedComponent.name;
		}

		shouldComponentUpdate(nextProps, nextState) {
			let superReturn = null;
			if (super.shouldComponentUpdate) {
				superReturn = super.shouldComponentUpdate(nextProps, nextState);			
				if (superReturn !== true && superReturn !== false ) superReturn = null;
			}
			let report = {
				updateCausers: [],
				STATE: {},
				PROPS: {}
			}
			
			let shouldUpdate = false;
			const name = this.name;

			const compare = (next, current, type) => {

				for (var key in next) {
					if (next[key] == current[key]) {
						report[type][key] = ['Pass: Referance comparison / equality check passed', current[key], next[key]];
					} else {
						if (typeof next[key] !== 'object') {
							report[type][key] = [`Update: Referance comparison / equality check failed`, current[key], next[key]];							
							report.updateCausers.push(`${type} - ${key}`);

							shouldUpdate = true;

						} else {		
							report[type][key] = [`Update: Object referance comparison failed`, current[key], next[key]];
							report.updateCausers.push(`${type} - ${key}`);

							shouldUpdate = true;
						}
					}
				}
			} 

			compare(nextState, this.state, 'STATE');
			compare(nextProps, this.props, 'PROPS');

			let reportContainer = (shouldUpdate) ? [`UPD ${name}`] :
				[`Pass ${name}`];
			reportContainer.push(report);

			if (superReturn !== null) {
				console.log(`${name} SuperReturn Overide ${superReturn}`);
				console.log(reportContainer);
				return superReturn
			}

			console.log(reportContainer);
			
			return shouldUpdate; 
		}

		render() {
			return(
				super.render()
			);
		}
	}

	UpdateReporterHOC.displayName = WrappedComponent.displayName || WrappedComponent.name;

	return UpdateReporterHOC
}

module.exports = {
	chainHOC: chainHOC,
	updateReporterHOC: updateReporterHOC
}

