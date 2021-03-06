import React from 'react';
import Field from './FieldComponent.js';
import './FieldForm.css';


const FieldForm = (props) => {


const onFormSubmit = () => {
  props.onSubmit({
    title: props.fields.title,
    author: props.fields.author,
    period: props.fields.period,
    id: props.fields.id,
    imageUrl: props.fields.imageUrl,
    rotate: props.fields.rotate,
    width: props.fields.width,
    height: props.fields.height,
  });
};

const handleCancel = () => {
  props.onCancel();
};

const onInputChange = ({name, value, error}) => {
  props.onChange({name, value, error});
};

const submitText = props.fields.id ? 'Update' : 'Create';

    return (
      <div>
        {/* <h1>Picture Input Form</h1> */}
        {/* {console.log(JSON.stringify(props.slides, null, 4))} */}

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
          <input type="submit" id="buttonSubmit" value={submitText} disabled={props.validate()} />
          <input type="button" id="buttonCancel" name="cancelForm" value="Cancel" onClick={handleCancel}></input>

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
                ImageUrl: {imageUrl} 
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