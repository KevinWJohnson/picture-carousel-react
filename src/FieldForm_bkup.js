import React from 'react';

const Field = require('./FieldComponent.js');


module.exports = class extends React.Component {


  onFormSubmit = (slide) => {
    this.props.onSubmit(slide);
  };

  onInputChange = ({name, value, error}) => {
    this.props.onChange({name, value, error});
    
  };


  render() {
    return (
      <div>
        <h1>Picture Input Form</h1>

        <form onSubmit={this.onFormSubmit}>
          <Field
            placeholder="Title"
            name="title"
            value={this.props.fields.title}
            onChange={this.onInputChange}
            validate={val => (val ? false : 'Title Required')}
          />

          <br />

          <Field
            placeholder="Author"
            name="author"
            value={this.props.fields.author}
            onChange={this.onInputChange}
            validate={val => (val ? false : 'Author Required')}
          />

          <br />

          <Field
            placeholder="Period"
            name="period"
            value={this.props.fields.period}
            onChange={this.onInputChange}
            validate={val => (val ? false : 'Period Required')}
          />

          <br />

          <Field
            placeholder="ImageUrl"
            name="imageUrl"
            value={this.props.fields.imageUrl}
            onChange={this.onInputChange}
            validate={val => (val ? false : 'ImageUrl Required')}
          />

          <br />

          <Field
            placeholder="Rotate"
            name="rotate"
            value={this.props.fields.rotate}
            onChange={this.onInputChange}
            validate={val => (val ? false : 'Rotate Required')}
          />

          <br />

          <Field
            placeholder="Width"
            name="width"
            value={this.props.fields.width}
            onChange={this.onInputChange}
            validate={val => (val ? false : 'Width Required')}
          />

          <br />

          <Field
            placeholder="Height"
            name="height"
            value={this.props.fields.height}
            onChange={this.onInputChange}
            validate={val => (val ? false : 'Height Required')}
          />

          <br />

          <input type="submit" disabled={this.validate()} />
        </form>

        <div>
          <h3>Picture List</h3>
          <ul>
            {this.props.slides.map(({title, author, period, id, imageUrl, rotate, width, height}) => (
              <li key={id}>
                Title: {title} 
                <br />
                Author: {author} 
                <br />
                Period: {period} 
                <br />
                Id: {id} 
                <br />
                Rotate: {rotate} 
                <br />
                Width: {width} 
                <br />
                Height: {height}
                <br />
                <br />
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
};
