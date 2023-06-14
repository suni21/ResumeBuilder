import '../css/resume.css';
import React, { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

// material ui icons
import MenuIcon from '@mui/icons-material/Menu';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
// import ToggleOnOutlinedIcon from '@mui/icons-material/ToggleOnOutlined';
// import { colors } from '@mui/material';


//list of sections
const masterSectionList = [
    { id: "Profile summary", name: "Profile summary" },
    { id: "Academic and Cocurricular Achievements", name: "Academic and Cocurricular Achievements" },
    { id: "Summer Internship Experience", name: "Summer Internship Experience" },
    { id: "Work Experience", name: "Work Experience" },
    { id: "Projects", name: "Projects" },
    { id: "Certifications", name: "Certifications" },
    { id: "Leadership Positions", name: "Leadership Positions" },
    { id: "Extracurricular", name: "Extracurricular" },
    { id: "Education", name: "Education" },
];

const Resume = () => {
    const [sections, setSections] = useState(masterSectionList);
    const [isEditing, setIsEditing] = useState(false);
    const [hasChanges, setHasChanges] = useState(false);
    const [hoveredSection, setHoveredSection] = useState(null);

    const onDragEnd = (result) => {
        if (!result.destination) return; // If not dropped in a valid droppable area

        const { source, destination } = result;
        const newSections = Array.from(sections);
        const [movedSection] = newSections.splice(source.index, 1);
        newSections.splice(destination.index, 0, movedSection);

        setSections(newSections);
        setHasChanges(true);
    };

    // use for editing the setion header
    const handleEdit = (sectionId, newName) => {
        const newSections = sections.map((section) => {
            if (section.id === sectionId) {
                return { ...section, name: newName };
            }
            return section;
        });

        setSections(newSections);
        setHasChanges(true);
    };

    //for switching on and off
    const handleToggle = (sectionId) => {
        const newSections = sections.map((section) => {
            if (section.id === sectionId) {
                return { ...section, active: !section.active };
            }
            return section;
        });

        setSections(newSections);
        setHasChanges(true);
    };
    //show the button after the change is done
    const handleSave = () => {
        // Perform save logic here, e.g., send updated sections to an API
        setHasChanges(false);
    };

    //displaying description of sections
    const handleHoverSection = (sectionId) => {
        setHoveredSection(sectionId);
    };

    const handleLeaveSection = () => {
        setHoveredSection(null);
    };

    return (
        <div>
            <h1>Select Your Sections</h1>
            <DragDropContext onDragEnd={onDragEnd}>

                <Droppable droppableId="sections">
                    {(provided) => (
                        <ul className="section-list" {...provided.droppableProps} ref={provided.innerRef}>

                            {/* map the section and the index */}
                            {sections.map((section, index) => (
                                <Draggable key={section.id} draggableId={section.id} index={index}>

                                    {(provided) => (
                                        <li

                                            className={`section ${isEditing === section.id ? 'editing' : ''}`}
                                            {...provided.draggableProps}
                                            ref={provided.innerRef}
                                        >

                                            <div className="section-header" {...provided.dragHandleProps}>
                                                <MenuIcon fontSize='small' className='section-drag'></MenuIcon>

                                                {/* <InfoOutlinedIcon className='section-description'></InfoOutlinedIcon> */}
                                                <InfoOutlinedIcon fontSize='small' className="section-description"
                                                    
                                                    onMouseEnter={() => handleHoverSection(section.id)}
                                                    onMouseLeave={handleLeaveSection}
                                                    disabled={isEditing}
                                                    
                                                >
                                                </InfoOutlinedIcon>

                                                <span className="section-name">{section.name}</span>

                                                {/* writing icon */}
                                                <CreateOutlinedIcon fontSize='small' className="section-edit"
                                                    onClick={() => setIsEditing(section.id)}
                                                    disabled={isEditing}></CreateOutlinedIcon>

                                                {/* <button
                                                    className="section-toggle"
                                                    onClick={() => handleToggle(section.id)}
                                                    disabled={isEditing}
                                                >
                                                    {section.active ? 'On' : 'Off'}
                                                </button> */}

                                                {/* on/off switch */}
                                                <input
                                                    type="checkbox"
                                                    className="toggle"
                                                    checked={section.active}
                                                    onChange={() => handleToggle(section.id)}
                                                    disabled={isEditing}
                                                    id={`toggle-${section.id}`}
                                                />
                                                <label htmlFor={`toggle-${section.id}`} className="section-toggle-label">
                                                    <span className="toggle-slider"></span>
                                                </label>

                                            </div>
                                            {isEditing === section.id ? (
                                                <div className="edit-section-form">
                                                    <input
                                                        type="text"
                                                        value={section.name}
                                                        onChange={(e) => handleEdit(section.id, e.target.value)}
                                                    />
                                                    <button className="save-button" onClick={() => setIsEditing(false)}>
                                                        Save
                                                    </button>
                                                </div>
                                            ) : null}
                                            {hoveredSection === section.id && (
                                                <div className="section-hover-name">
                                                    <p>{section.name}</p>
                                                </div>
                                            )}
                                        </li>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </ul>
                    )}
                </Droppable>
            </DragDropContext>
            {hasChanges && (
                <button className="save-button" onClick={handleSave}>
                    Save Changes
                </button>
            )}
        </div>
    );
};

export default Resume;



