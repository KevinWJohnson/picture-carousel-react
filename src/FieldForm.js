import React from 'react';

const Field = require('./FieldComponent.js');


module.exports = class extends React.Component {


  onFormSubmit = evt => {
    
  };

  onInputChange = ({name, value, error}) => {
    
  };


  render() {
    return (
      <div>
        <h1>Sign Up Sheet</h1>

        <form onSubmit={this.onFormSubmit}>
          <Field
            placeholder="Title"
            name="title"
            value={this.state.fields.title}
            onChange={this.onInputChange}
            validate={val => (val ? false : 'Title Required')}
          />

          <br />

          <Field
            placeholder="Author"
            name="author"
            value={this.state.fields.author}
            onChange={this.onInputChange}
            validate={val => (val ? false : 'Author Required')}
          />

          <br />

          <Field
            placeholder="Period"
            name="period"
            value={this.state.fields.period}
            onChange={this.onInputChange}
            validate={val => (val ? false : 'Period Required')}
          />

          <br />

          <Field
            placeholder="ImageUrl"
            name="imageUrl"
            value={this.state.fields.imageUrl}
            onChange={this.onInputChange}
            validate={val => (val ? false : 'ImageUrl Required')}
          />

          <br />

          <Field
            placeholder="Rotate"
            name="rotate"
            value={this.state.fields.rotate}
            onChange={this.onInputChange}
            validate={val => (val ? false : 'Rotate Required')}
          />

          <br />

          <Field
            placeholder="Width"
            name="width"
            value={this.state.fields.width}
            onChange={this.onInputChange}
            validate={val => (val ? false : 'Width Required')}
          />

          <br />

          <Field
            placeholder="Height"
            name="height"
            value={this.state.fields.height}
            onChange={this.onInputChange}
            validate={val => (val ? false : 'Height Required')}
          />

          <br />

          <input type="submit" disabled={this.validate()} />
        </form>

        <div>
          <h3>People</h3>
          <ul>
            {this.state.people.map(({name, email}, i) => (
              <li key={i}>
                {name} ({email})
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
};
