import { useState, ReactNode } from 'react';
import { DraggableProvided } from 'react-beautiful-dnd';

interface AccordionProps {
    title: string;
    children: ReactNode;
    provided: DraggableProvided;
    isDragging: boolean;
}

const AccordionDiv: React.FC<AccordionProps> = ({ title, children, provided, isDragging }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={`accordion ${isDragging ? 'dragging' : ''}`}
        >
            <button className="accordion-header" onClick={toggleAccordion}>
                {title}
            </button>
            {isOpen && <div className="accordion-content">{children}</div>}
            <style jsx>{`
        .accordion {
          border: 1px solid #ccc;
          border-radius: 5px;
          margin-bottom: 10px;
          background-color: white;
          transition: background-color 0.2s ease;
        }
        .accordion.dragging {
          background-color: #e0f7fa;
        }
        .accordion-header {
          background-color: #f1f1f1;
          padding: 10px;
          cursor: pointer;
          width: 100%;
          text-align: left;
          border: none;
          outline: none;
          font-size: 16px;
        }
        .accordion-content {
          padding: 10px;
          border-top: 1px solid #ccc;
        }
      `}</style>
        </div>
    );
};

export default AccordionDiv;
