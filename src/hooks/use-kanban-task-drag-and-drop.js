/**
 * External dependencies.
 */
import { useState, useEffect } from 'react';
import { draggable, dropTargetForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { combine } from '@atlaskit/pragmatic-drag-and-drop/combine';
import { attachClosestEdge, extractClosestEdge } from '@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge';

/**
 * Internal dependencies.
 */
import { useKanbanBoard } from '@/hooks/use-kanban-board';

/**
 * Use Kanban Task Drag And Drop.
 * 
 * @param { Object } Task 
 * @param { Object } ref
 * @returns { Object }
 */
export default function useKanbanTaskDragAndDrop(task, ref) {
	const { setData } = useKanbanBoard();

	const [isDragging, setIsDragging] = useState(false);

	const taskId = task.id;

	useEffect(() => {
		const element = ref.current;

		if(!element) {
			return;
		}

		return combine (
			draggable({
				element: ref.current,
				getInitialData() {
					return {
						task,
						isTask: true,
					}
				},
				onDragStart: () => setIsDragging(true),
				onDrop() {
					setIsDragging(false);
				},
				onDropTargetChange() {
					setIsDragging(true);
				}
			}),
			dropTargetForElements({
				element: ref.current,
				getData({ input }) {
					return attachClosestEdge(task, {
						element: ref.current,
						input,
						allowedEdges: ['top', 'bottom'],
					});
				},
				onDrag({ source, self }) {
					const closestEdge = extractClosestEdge(self.data);
					const draggedTaskId = source.data.task.id;
					
					setData(prevData => {
						const tasks = [...prevData.tasks];
						const draggedIndex = tasks.findIndex(task => task.id === draggedTaskId);
						const targetIndex = tasks.findIndex(task => task.id === taskId);

						if (draggedIndex === -1 || targetIndex === -1) {
							return prevData;
						}
						
						const [draggedTask] = tasks.splice(draggedIndex, 1);

						const newIndex = closestEdge === 'top' ? targetIndex : targetIndex + 1;
						tasks.splice(newIndex, 0, draggedTask);

						return {
							...prevData,
							tasks,
						};
					});
				},
			})
		)
	}, [task]);
	
	return { isDragging };
}