import React from 'react';
import PropTypes from 'prop-types';

import './Task.css';

const Task = (props) => {
  // const [complete, setComplete] = useState(props.isComplete);
  const buttonClass = props.isComplete ? 'tasks__item__toggle--completed' : '';

  const flipComplete = () => {
    props.completeCallback(props.id);
  };

  const deleteTask = () => {
    props.deleteCallback(props.id);
  };

  return (
    <li className="tasks__item">
      <button
        className={`tasks__item__toggle ${buttonClass}`}
        onClick={flipComplete}
      >
        {props.title}
      </button>
      <button className="tasks__item__remove button" onClick={deleteTask}>
        x
      </button>
    </li>
  );
};

Task.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  isComplete: PropTypes.bool.isRequired,
  completeCallback: PropTypes.func.isRequired,
  deleteCallback: PropTypes.func.isRequired,
};

export default Task;
