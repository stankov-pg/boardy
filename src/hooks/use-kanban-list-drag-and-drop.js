/**
 * External dependencies.
 */
import { useState, useEffect } from 'react';
import { draggable, dropTargetForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { combine } from '@atlaskit/pragmatic-drag-and-drop/combine';
import { attachClosestEdge, extractClosestEdge } from '@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge';
import { getReorderDestinationIndex } from '@atlaskit/pragmatic-drag-and-drop-hitbox/util/get-reorder-destination-index';

/**
 * Internal dependencies.
 */
import { useKanbanBoard } from '@/hooks/use-kanban-board';

/**
 * Use Kanban List Drag And Drop.
 * 
 * @param { Object } list 
 * @param { Array } tasks 
 * * @param { Object } ref 
 * @returns { Object }
 */
export default function useKanbanListDragAndDrop(list, tasks, ref) {
	const { data, setData } = useKanbanBoard();

	const [isEntered, setIsEntered] = useState(false);
	const [isDragging, setIsDragging] = useState(false);

	const listId = list.id;

	useEffect(() => {
		return combine(
			draggable({
				element: ref.current,
				getInitialData() {
					return {
						list,
						isTask: false,
					}
				},
				onDragStart: () => setIsDragging(true),
				onDrop: () => setIsDragging(false),
			}),
			dropTargetForElements({
				element: ref.current,
				getData({ input }) {
					return attachClosestEdge(list, {
						element: ref.current,
						input,
						allowedEdges: ['left', 'right'],
					});
				},
				onDrag({ location, source }) {
					if (source.data.isTask) {
						setData(prevData => ({
							...prevData,
							tasks: prevData.tasks.map(task => 
								task.id === source.data.task.id
								? { ...task, listId }
								: task
							),
						}));

						return;
					}

					const sourceIndex = data.lists.findIndex((list) => list.id === source.data.list.id);
					const dropTarget = location.current.dropTargets[0];

					const destinationIndex = getReorderDestinationIndex({
						startIndex: sourceIndex,
						indexOfTarget: data.lists.findIndex((list) => list.id === dropTarget.data.id),
						closestEdgeOfTarget: extractClosestEdge(dropTarget.data),
						axis: 'horizontal',
					});

					if (destinationIndex === sourceIndex) {
						return;
					}

					setData(prevData => {
						const lists = [...prevData.lists];

						if (sourceIndex === -1 || destinationIndex === -1) {
							return prevData;
						}

						const [draggedList] = lists.splice(sourceIndex, 1);

						lists.splice(destinationIndex, 0, draggedList);

						return {
							...prevData,
							lists,
						};
					});
					
				},
				onDragLeave: () => setIsEntered(false),
			})
		)
	}, [list, tasks]);

	return { isEntered, isDragging };
};