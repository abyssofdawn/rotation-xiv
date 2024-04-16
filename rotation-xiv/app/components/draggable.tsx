import { ReactNode } from "react";



export const Draggable = (props: {children: ReactNode, dragObject: any, onDragStart?: any, onDragEnd?: any, onDrag?: any, onMouseUp?: any}) => {
    const onDragStarting = (e: React.DragEvent<HTMLDivElement>) => {
        if(!props.onDragStart) return
        // Get the block coordinates

        // Find the offset of the mouse from those coordinates
        const offset = [
            e.clientX, 
            e.clientY
        ];
        // Pass the drag data
        props.onDragStart(props.dragObject, offset);
    };

    const onDragging = (e: React.DragEvent<HTMLDivElement>) => {
        if(!props.onDrag) return
        // Get the block coordinates

        // Find the offset of the mouse from those coordinates
        const offset = [
            e.clientX, 
            e.clientY
        ];
        // Pass the drag data
        props.onDrag(props.dragObject, offset);
    };

    const onDragEnding = (e: React.DragEvent<HTMLDivElement>) => {
        if(!props.onDragEnd) return

        // Find the offset of the mouse from those coordinates
        const offset = [
            e.clientX, 
            e.clientY
        ];
        e.stopPropagation();
        props.onDragEnd(props.dragObject, offset);
    };

    const onMouseReleasing = (e: React.MouseEvent<HTMLDivElement>) => {
        if(!props.onMouseUp) return
        e.stopPropagation();
        props.onMouseUp(props.dragObject);
    }

    return (
        <div draggable={true} onDragStart={onDragStarting} onDragEnd={onDragEnding} onMouseUp={onMouseReleasing} onDrag={onDragging}>
            {props.children}
        </div>
    );
};