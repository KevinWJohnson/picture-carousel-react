import React from 'react';
import FieldForm from './FieldForm';


class CreateSlide extends React.Component {
    state = {
      editFormOpen: true,
    };
  
    handleEditClick = () => {
      this.openForm();
    };
  
    handleFormClose = () => {
      this.closeForm();
    };
  
    handleSubmit = (timer) => {
      this.props.onFormSubmit(timer);
      this.closeForm();
    };
  
    closeForm = () => {
      this.setState({ editFormOpen: false });
    };
  
    openForm = () => {
      this.setState({ editFormOpen: true });
    };
  
    render() {
      if (this.state.editFormOpen) {
        return (
          <div className="inputForm">
            <FieldForm
            onSubmit={this.props.handleCreateFormSubmit}
            onChange={this.props.onInputChange}
            fields={this.props.fields}
            slides={this.props.slides}
            validate={this.props.validate}
            >
            </FieldForm>
          </div>
        );
      } else {
        return (
          null
        );
      }
    }
  }
  

export default CreateSlide