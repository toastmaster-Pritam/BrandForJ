import React, { useState } from "react";

const TagFilter = ({ tags, selectedTags, onApply, onReset }:any) => {
  const [currentSelection, setCurrentSelection] = useState(selectedTags);

  const handleCheckboxChange = (tag:any) => {
    setCurrentSelection((prevSelection:any) =>
      prevSelection.includes(tag)
        ? prevSelection.filter((t:any) => t !== tag)
        : [...prevSelection, tag]
    );
  };

  return (
    <div className="filter-dropdown">
      <input type="text" placeholder="Search" style={{ width: "100%" }} />
      <div className="tag-options">
        {tags.map((tag:any) => (
          <div key={tag}>
            <input
              type="checkbox"
              checked={currentSelection.includes(tag)}
              onChange={() => handleCheckboxChange(tag)}
            />
            <label>{tag}</label>
          </div>
        ))}
      </div>
      <button onClick={() => onReset()}>Reset</button>
      <button onClick={() => onApply(currentSelection)}>Apply</button>
    </div>
  );
};

export default TagFilter;