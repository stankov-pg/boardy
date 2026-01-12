/**
* External dependencies.
*/
import { useRef } from 'react';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import classNames from 'classnames';

/**
* Internal dependencies.
*/
import KanbanListRename from '@/components/kanban-list/kanban-list-rename';
import KanbanTask from '@/components/kanban-task/kanban-task';
import KanbanTaskCreate from '@/components/kanban-task/kanban-task-create';
import ConfirmationModal from '@/components/confirmation-modal/confirmation-modal';
import IconButton from '@/components/icon-button/icon-button';
import Dot from '@/components/dot/dot';
import { HStack, VStack } from '@/components/stack/stack';
import { useKanbanBoard } from '@/hooks/use-kanban-board';
import useKanbanListDragAndDrop from '@/hooks/use-kanban-list-drag-and-drop';

const KanbanList = (props) =>  {
	const { list, tasks } = props;

	const ref = useRef(null);
	const listTasksRef = useRef(null);
	
	const { setData } = useKanbanBoard();
	const { isEntered, isDragging } = useKanbanListDragAndDrop(list, tasks, ref);

	return (
		<div
			ref={ref}
			className={classNames(
				'kanban-list',
				isDragging && 'is-dragging',
				isEntered && 'is-entered',
			)}
		>
			<div className="kanban-list__head">
				<HStack align="center" gap={4}>
					<Dot color={list.labelColor}/>

					<KanbanListRename list={list} />
				</HStack>
		
				<ConfirmationModal 
					confirmButtonText="Delete"
					trigger={
						<IconButton icon={DeleteOutlineIcon} variant="plain" className="kanban-list__button-delete" size="26" />
					}
					description="Are you sure you want to delete this List. All included tasks will be deleted as well."
					onConfirmation={() => {
						setData(prevData => ({
							...prevData,
							lists: prevData.lists.filter(listItem => listItem.id !== list.id),
							tasks: prevData.tasks.filter(task => task.listId !== list.id),
						}));
					}} 
				/>
			</div>
			
			{!!tasks.length && (
				<div className="kanban-list__body">
					<VStack ref={listTasksRef} gap={10} align="stretch">
						{tasks.map(task => (
							<KanbanTask key={task.id} task={task} />
						))}
					</VStack>
				</div>
			)}
			
			<div className="kanban-list__foot">
				<KanbanTaskCreate list={list} listTasksRef={listTasksRef} />
			</div>
		</div>
	)
};

export default KanbanList;