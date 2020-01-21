import React from 'react';
import FieldForm from './FieldForm';


class CreateSlide extends React.Component {
  
  onCancel = () => {
    //console.log("this.props.location.state", this.props.location.state);
    const locationState = this.props.location.state;
    const pathname = (
      locationState && locationState.from && locationState.from.pathname
    );
    const redirectPath = pathname || '/admin';
    this.props.onCancel(redirectPath);
    console.log("In CreateSlide.js - this.props.location.state", this.props.location.state);
    console.log("In CreateSlide.js - redirectPath", redirectPath);
    console.log("In CreateSlide.js - pathname", pathname);
  };

    render() {
        return (
          <div className="inputForm">
            <FieldForm
            onSubmit={this.props.onSubmit}
            onChange={this.props.onChange}
            fields={this.props.fields}
            slides={this.props.slides}
            validate={this.props.validate}
            onCancel={this.onCancel}
            >
            </FieldForm>
          </div>
        );
    }
  }
  

export default CreateSlide