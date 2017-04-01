github: https://github.com/leofab86/update-reporter

npm: https://www.npmjs.com/package/update-reporter


Track and diagnose unecessary renders in React. Also provides chainHOC helper to manage HOCs.

DEMO: https://www.youtube.com/watch?v=sqlMM1Elnp0


INSTALL:
npm install update-reporter


SETUP w/ chainHOC helper:

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


SETUP w/o chainHOC helper, updateReporter by itself:

Export desired components with updateReporter function:

```javascript
import { updateReporterHOC } from 'update-reporter';

class COMPONENT extends React.Component {
	//...
}

export default updateReporterHOC(COMPONENT);
```
