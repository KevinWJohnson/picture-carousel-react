import React from 'react';
import { Redirect } from 'react-router-dom';
import FieldForm from './FieldForm';


class CreateSlide extends React.Component {

  
  redirectPath = () => {
    const locationState = this.props.location.state;
    const pathname = (
      locationState && locationState.from && locationState.from.pathname
    );
    return pathname || '/carousel/admin/';
  };
  
    render() {
      if ( !this.props.createFormOpen || this.props.cancelForm ) {
        return (
          <Redirect to={this.redirectPath()} />
        );
      } else {
        return (
          <div className="inputForm">
            <h1>Create Picture Input Form</h1>
            <FieldForm
            onSubmit={this.props.onSubmit}
            onChange={this.props.onChange}
            fields={this.props.fields}
            slides={this.props.slides}
            validate={this.props.validate}
            onCancel={this.props.onCancel}
            >
            </FieldForm>
          </div>
        );
      }  
    }
  }
  

export default CreateSlide