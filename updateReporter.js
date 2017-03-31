
const HOCbox = {
	updateReporterHOC: updateReporterHOC
};

export function importHOC (name, HOC) {
	if (HOCbox[name]) console.error(`HOC Name ${name} already in use, please assign different name`);
	HOCbox[name] = HOC; 
}

export function chainHOC (baseComponent, HOCarray) {
	let HOCchain = baseComponent;
	
	if(HOCarray) {

		HOCchain = HOCarray.reduce((accumulator, currentValue, index, array) => {
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


export function updateReporterHOC (WrappedComponent) {

	class updateReporterHOC extends WrappedComponent {

		name = WrappedComponent.displayName || WrappedComponent.name;
		static displayName = WrappedComponent.displayName || WrappedComponent.name;

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

	return updateReporterHOC
}
