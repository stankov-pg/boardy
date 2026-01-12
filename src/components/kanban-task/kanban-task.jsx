/**
* External dependencies.
*/
import { useRef } from 'react';
import classNames from 'classnames';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

/**
* Internal dependencies.
*/
import KanbanTaskRename from '@/components/kanban-task/kanban-task-rename';
import ConfirmationModal from '@/components/confirmation-modal/confirmation-modal';
import IconButton from '@/components/icon-button/icon-button';
import { HStack } from '@/components/stack/stack';
import useKanbanTaskDragAndDrop from '@/hooks/use-kanban-task-drag-and-drop';
import { useKanbanBoard } from '@/hooks/use-kanban-board';

const KanbanTask = ({ task }) => {
	const { setData } = useKanbanBoard();

	const ref = useRef(null);

	const { isDragging } = useKanbanTaskDragAndDrop(task, ref);

	const handleDelete = (taskId) => {
		setData(prevData => ({
			...prevData,
			tasks: prevData.tasks.filter(task => task.id !== taskId),
		}));
	};
	
	return (
		<div 
			ref={ref}
			className={classNames(
				'kanban-task',
				isDragging && 'is-dragging'
			)}
		>
			<HStack justify="space-between" align="center" gap={10} style={{'width': '100%'}}>
				<KanbanTaskRename task={task} />

				<ConfirmationModal 
					confirmButtonText="Delete"
					trigger={
						<IconButton icon={DeleteOutlineIcon} variant="plain" className="kanban-task__button-delete" size="26" />
					}
					description="Are you sure you want to delete this Task?"
					onConfirmation={() => handleDelete(task.id)} 
				/>
			</HStack>
		</div>
	);
};

export default KanbanTask;