github: https://github.com/leofab86/update-reporter

npm: https://www.npmjs.com/package/update-reporter

Track and diagnose unecessary renders in React. Also provides chainHOC helper to manage HOCs.

Update Reporter is a higher order component that attaches to any component with lifecycle hooks (so it doesn't work with dumb stateless functional components) and uses the shouldComponentUpdate method to do a shallow comparison of props and state (just like PureComponent class.) It also generates a report in the process to give you details about how the comparison went, what each value of previous and incoming prop and state were, and which comparisons failed and caused the component to update.

* Update Reporter does not hijack the shouldComponentUpdate method, you can still use your own shouldComponentUpdate inside of your components. Update Reporter will return your component's boolean while still generating a report on whether a shallow comparison would have caused an update.

### DEMO: 
https://www.youtube.com/watch?v=sqlMM1Elnp0

### INSTALL:
npm install update-reporter

### SETUP w/ chainHOC helper:

To apply updateReporter along with your own HOCs, setup component as so:

```javascript
import { chainHOC, updateReporterHOC } from 'update-reporter';
import exampleHOC from '../location';

//define component:
class COMPONENT extends React.Component {
	//...
}

//export component through chainHOC helper and provide array of desired HOCs
export default chainHOC(COMPONENT, [updateReporterHOC, exampleHOC]);
```

### SETUP w/o chainHOC helper, updateReporter by itself:

Export desired components with updateReporter function:

```javascript
import { updateReporterHOC } from 'update-reporter';

class COMPONENT extends React.Component {
	//...
}

export default updateReporterHOC(COMPONENT);
```
