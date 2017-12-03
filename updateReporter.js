var React = require('react')


module.exports = function updateReporter (options) {
  if(!options) {
    options = {
      render: false,
      mount: false,
      update: true,
      pass: false
    }
  }

  return function updateReporterIIHOC (WrappedComponent) {
    let isClass = false
    try{
      WrappedComponent()
    } catch (e) {
      if(e.toString() === "TypeError: Cannot call a class as a function") {
        isClass = true
      } else {
        console.error(e)
      }
    }

    if(isClass) {
      class UpdateReporterHOC_II extends WrappedComponent {
        constructor (...args) {
          super(...args)
          this.name = WrappedComponent.displayName || WrappedComponent.name
        }


        componentDidMount(){
          if (options.mount) console.log([`MOUNT ${this.name}`, {PROPS:this.props, STATE:this.state}])
          if (super.componentDidMount) super.componentDidMount()
        }


        shouldComponentUpdate(nextProps, nextState) {
          if(!options.update && !options.pass) {
            if(super.shouldComponentUpdate) {
              return super.shouldComponentUpdate(nextProps, nextState)
            } else {
              return true
            }
          }

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
                report[type][key] = ['Pass: Referance comparison passed', current[key], next[key]];
              } else {
                if (typeof next[key] !== 'object') {
                  report[type][key] = [`Update: Referance comparison failed`, current[key], next[key]];
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

          let reportContainer = (shouldUpdate) ? [`UPD ${name}`] : [`Pass ${name}`];
          reportContainer.push(report);

          if (superReturn !== null) {
            console.log(`${name} SuperReturn Overide ${superReturn}`);
            console.log(reportContainer);
            return superReturn
          }

          if (shouldUpdate && options.update) console.log(reportContainer);
          if (!shouldUpdate && options.pass) console.log(reportContainer);

          return shouldUpdate;
        }


        render() {
          if(options.render) console.log([`RNDR ${this.name}`, {STATE:this.state, PROPS:this.props}]);
          return super.render();
        }
      }

      UpdateReporterHOC_II.displayName = WrappedComponent.displayName || WrappedComponent.name;

      return UpdateReporterHOC_II
    }



    //Else it is a functional component
    else {
      class UpdateReporterHOC_PP extends React.Component {
        constructor (...args) {
          super(...args)
          this.name = WrappedComponent.name
        }


        componentDidMount(){
          if (options.mount) console.log([`MOUNT ${this.name}`, {PROPS:this.props}])
          if (super.componentDidMount) super.componentDidMount()
        }


        shouldComponentUpdate(nextProps, nextState) {
          if(!options.update && !options.pass) {
            return true
          }

          let report = {
            updateCausers: [],
            PROPS: {}
          }

          let shouldUpdate = false;
          const name = this.name;

          const compare = (next, current, type) => {

            for (var key in next) {
              if (next[key] == current[key]) {
                report[type][key] = ['Pass: Referance comparison passed', current[key], next[key]];
              } else {
                if (typeof next[key] !== 'object') {
                  report[type][key] = [`Update: Referance comparison failed`, current[key], next[key]];
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

          compare(nextProps, this.props, 'PROPS');

          let reportContainer = (shouldUpdate) ? [`UPD ${name}`] : [`Pass ${name}`];
          reportContainer.push(report);

          if (shouldUpdate && options.update) console.log(reportContainer);
          if (!shouldUpdate && options.pass) console.log(reportContainer);

          return shouldUpdate;
        }

        render() {
          if(options.render) console.log([`RNDR ${this.name}`, {PROPS:this.props}]);
          return React.createElement(WrappedComponent, this.props);
        }
      }

      UpdateReporterHOC_PP.displayName = WrappedComponent.displayName || WrappedComponent.name;

      return UpdateReporterHOC_PP
    }

  }

}
