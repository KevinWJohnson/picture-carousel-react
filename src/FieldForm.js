import React from 'react';

import Field from './FieldComponent.js';

//const Field = require('./FieldComponent.js');


const FieldForm = (props) => {


const onFormSubmit = (slide) => {
  props.onSubmit(slide);
};

const onInputChange = ({name, value, error}) => {
  props.onChange({name, value, error});
};


    return (
      <div>
        <h1>Picture Input Form</h1>

        <form onSubmit={onFormSubmit}>

          <Field
            placeholder="Title"
            name="title"
            value={props.fields.title}
            onChange={onInputChange}
            validate={val => (val ? false : 'Title Required')}
          />

          <Field
            placeholder="Author"
            name="author"
            value={props.fields.author}
            onChange={onInputChange}
            validate={val => (val ? false : 'Author Required')}
          />
        
          <Field
            placeholder="Period"
            name="period"
            value={props.fields.period}
            onChange={onInputChange}
            validate={val => (val ? false : 'Period Required')}
          />
        
          <Field
            placeholder="ImageUrl"
            name="imageUrl"
            value={props.fields.imageUrl}
            onChange={onInputChange}
            validate={val => (val ? false : 'ImageUrl Required')}
          />

          <Field
            placeholder="Rotate"
            name="rotate"
            value={props.fields.rotate}
            onChange={onInputChange}
            validate={val => (val ? false : 'Rotate Required')}
          />
        
          <Field
            placeholder="Width"
            name="width"
            value={props.fields.width}
            onChange={onInputChange}
            validate={val => (val ? false : 'Width Required')}
          />
      
          <Field
            placeholder="Height"
            name="height"
            value={props.fields.height}
            onChange={onInputChange}
            validate={val => (val ? false : 'Height Required')}
          />
           
          <br />

          <input type="submit" disabled={props.validate()} />
        </form>

        <div>
          <h3>Picture List</h3>
          <ul>
            {props.slides.map(({title, author, period, id, imageUrl, rotate, width, height}) => (
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

export default FieldForm