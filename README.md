github: https://github.com/leofab86/update-reporter

npm: https://www.npmjs.com/package/update-reporter


Track and diagnose unecessary renders in React. Also provides chainHOC helper to manage HOCs.


INSTALLATION w/ chainHOC helper:

In top level component before using any HOCs, import any of your own HOCs you would like to use and pass them, along with a name string, to update-reporter:

```javascript
import {importHOC} from 'update-reporter';

import exampleHOC from '../location';


importHOC('exampleHOC', exampleHOC);
```



To apply updateReporter and your own HOCs, setup component as so:

```javascript
import { chainHOC } from 'update-reporter';

//define component:
class COMPONENT extends React.Component {
	//...
}


//export component through chainHOC helper and provide array of desired HOCs:
export default chainHOC(COMPONENT, ['updateReporterHOC', 'exampleHOC']);
```


INSTALLATION w/o chainHOC helper, updateReporter by itself:

Export desired components with updateReporter function:

```javascript
import { updateReporterHOC } from 'update-reporter';

class COMPONENT extends React.Component {
	//...
}

export default updateReporterHOC(COMPONENT);
```


DEMO: https://www.youtube.com/edit?o=U&video_id=gMbvwVuDlAM