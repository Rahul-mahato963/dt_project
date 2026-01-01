import React, { useState } from 'react';

const TaskItem = ({ task, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || '');
  const [completed, setCompleted] = useState(task.completed);

  const handleUpdate = () => {
    onUpdate(task._id, { title, description, completed });
    setIsEditing(false);
  };

  return (
    <div className={`task-item ${completed ? 'completed' : ''}`}>
      <div className="task-checkbox">
        <input
          type="checkbox"
          checked={completed}
          onChange={(e) => setCompleted(e.target.checked)}
          disabled={isEditing}
        />
      </div>
      
      <div className="task-content">
        {isEditing ? (
          <>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="edit-input"
            />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="edit-textarea"
              rows={2}
            />
          </>
        ) : (
          <>
            <h3>{task.title}</h3>
            {task.description && <p>{task.description}</p>}
            <span className="task-date">
              {new Date(task.createdAt).toLocaleDateString()}
            </span>
          </>
        )}
      </div>

      <div className="task-actions">
        {!isEditing ? (
          <>
            <button 
              onClick={() => setIsEditing(true)}
              className="btn btn-secondary  bg-green-400 h-10 w-10"
              title="Edit"
            >
              ✏️
            </button>
            <button 
              onClick={() => onDelete(task._id)}
              className="btn btn-danger bg-red-500 h-10 w-10"
              title="Delete"
            >
              🗑️
            </button>
          </>
        ) : (
          <>
            <button 
              onClick={handleUpdate}
              className="btn btn-primary"
            >
              Save
            </button>
            <button 
              onClick={() => setIsEditing(false)}
              className="btn btn-secondary"
            >
              Cancel
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TaskItem;
