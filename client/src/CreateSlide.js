import React from 'react';
import FieldForm from './FieldForm';


class CreateSlide extends React.Component {
  

    render() {
        return (
          <div className="inputForm">
            <FieldForm
            location={this.props.location}
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
  

export default CreateSlide