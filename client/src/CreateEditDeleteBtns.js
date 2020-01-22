import React from 'react';
import {IoMdAdd, IoMdCreate, IoIosTrash} from 'react-icons/io';
import './CreateEditDeleteBtns.css';
//import { Redirect } from 'react-router-dom';

const CreateEditDeleteBtns = (props) => {

  const handleCreate = () => {
    props.onCreate();
  };

  const handleEdit = () => {
    props.onEdit();
  };

  const handleDelete = () => {
    props.onDelete();
  };

  return (
  <div id='outer-cedBtns'>
    <div className='inner-cedBtns'>
      <button
            id='buttonCreate'
            name='button-create'
            onClick={handleCreate}
          >
            Create Slide
            <span>  <IoMdAdd /></span>
      </button>
    </div>
    {/* <div className="divider"></div> */}
    <div className='inner-cedBtns'>
      <button
            id='buttonEdit'
            name='button-edit'
            onClick={handleEdit}
          >
            Edit Slide
            <span>   <IoMdCreate style={{verticalAlign: 'middle'}} /></span>
      </button>
    </div>
    {/* <div className="divider"></div> */}
    <div className='inner-cedBtns'>
      <button
            id='buttonDelete'
            name='button-delete'
            onClick={handleDelete}
          >
            Delete Slide
            <span>  <IoIosTrash /></span>
      </button>
    </div>
  </div>
 );
}

export default CreateEditDeleteBtns