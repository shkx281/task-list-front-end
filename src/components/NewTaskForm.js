import React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';

const defaultTask = {
  title: '',
  isComplete: false,
  description: '',
};

const TaskForm = (props) => {
  const [formData, setFormData] = useState(defaultTask);

  const onFormChange = (event) => {
    const stateName = event.target.name;
    const inputValue = event.target.value;

    const newFormData = { ...formData };
    newFormData[stateName] = inputValue;

    setFormData(newFormData);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    props.addTask(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Title</label>
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={onFormChange}
      />
      <label htmlFor="description">Description</label>
      <input
        type="text"
        name="description"
        value={formData.description}
        onChange={onFormChange}
      />
      <input type="submit" value="Add Task" />
    </form>
  );
};

TaskForm.propTypes = {
  addTask: PropTypes.func.isRequired,
};

export default TaskForm;
