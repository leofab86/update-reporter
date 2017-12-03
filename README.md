github: https://github.com/leofab86/update-reporter

npm: https://www.npmjs.com/package/update-reporter

Track and diagnose unecessary renders in React.

Update Reporter is a higher order component that uses the shouldComponentUpdate method to do a shallow comparison of props and state. It also generates a report in the process to give you details about how the comparison went, what each value of previous and incoming prop and state were, and which values were different causing the component to update.

* Update Reporter does not hijack the shouldComponentUpdate method, you can still use your own shouldComponentUpdate inside of your components. Update Reporter will return your component's boolean while still generating a report on whether a shallow comparison would have caused an update.

* Update Reporter can be used with stateless functional components because it wraps the functional component in a class component and calls shouldComponentUpdate from there.

### INSTALL:
npm install update-reporter

### SETUP:

```javascript
import updateReporter from 'update-reporter';
  
//define component:
class COMPONENT extends React.Component {
	...
}
  
//export component wrapped in updateReporter and providing an optional optionsObject
export default updateReporter(optionsObject)(COMPONENT);
```

### OPTIONS DEFAULTS
```
optionsObject = {
    render: false  //Logs whenever a render for the wrapped component occurs
    mount: false  //Logs whenever the component mounts
    update: true  //Logs whenever the component updates due to state or props change after initial mount
    pass: false  //Logs whenever the component would avoid a render by doing a shallow props / state comparrison (or if it were a PureComponent).
}
```