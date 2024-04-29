import { ReactNode } from 'react';

export const Draggable = (props: {
  children: ReactNode;
  dragObject: any;
  onDragStart?: any;
  onDragEnd?: any;
  onDrag?: any;
  onMouseUp?: any;
}) => {
  const onDragStarting = (e: React.DragEvent<HTMLDivElement>) => {
    if (!props.onDragStart) return;
    // Get the block coordinates
    let currenttargetrect = e.currentTarget.getBoundingClientRect();
    const offset = [
      e.clientX - currenttargetrect.left,
      e.clientY - currenttargetrect.top,
    ];
    // Pass the drag data
    props.onDragStart(props.dragObject, e, offset);
  };

  const onDragging = (e: React.DragEvent<HTMLDivElement>) => {
    if (!props.onDrag) return;
    // Get the block coordinates
    let currenttargetrect = e.currentTarget.getBoundingClientRect();
    // Find the  of the mouse from those coordinates
    // Pass the drag data
    props.onDrag(props.dragObject, e);
  };

  const onDragEnding = (e: React.DragEvent<HTMLDivElement>) => {
    if (!props.onDragEnd) return;
    let currenttargetrect = e.currentTarget.getBoundingClientRect();
    // Find the  of the mouse from those coordinates
    e.stopPropagation();
    props.onDragEnd(props.dragObject, e);
  };

  const onMouseReleasing = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!props.onMouseUp) return;
    e.stopPropagation();
    props.onMouseUp(props.dragObject);
  };

  return (
    <div
      draggable={true}
      onDragStart={onDragStarting}
      onDragEnd={onDragEnding}
      onMouseUp={onMouseReleasing}
      onDrag={onDragging}
    >
      {props.children}
    </div>
  );
};
