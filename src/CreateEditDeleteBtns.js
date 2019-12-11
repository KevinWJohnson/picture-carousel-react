import React from 'react';
import {IoMdAdd, IoMdCreate, IoIosTrash} from 'react-icons/io';

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
  <div>
    <button
          name='button-create'
          onClick={handleCreate}
        >
          Create Slide
          <span>  <IoMdAdd /></span>
    </button>
    {/* <div className="divider"></div> */}
    <button
          name='button-edit'
          onClick={handleEdit}
        >
          Edit Slide
          <span>   <IoMdCreate style={{verticalAlign: 'middle'}} /></span>
    </button>
    {/* <div className="divider"></div> */}
    <button
          name='button-delete'
          onClick={handleDelete}
        >
          Delete Slide
          <span>  <IoIosTrash /></span>
    </button>
  </div>
 );
}

export default CreateEditDeleteBtns