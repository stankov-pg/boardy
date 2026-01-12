/**
* External dependencies.
*/
import { useState } from 'react';

/**
* Internal dependencies.
*/
import TextInput from '@/components/text-input/text-input';
import { useKanbanBoard } from '@/hooks/use-kanban-board';

const KanbanTaskRename = ({ task }) => {
	const [isRenaming, setIsRenaming] = useState(false);
	const [newTitle, setNewTitle] = useState(task.name);
	const { setData } = useKanbanBoard();

	const handleRename = () => {
		if (newTitle.trim() === '') {
			setNewTitle(task.name);
		} else {
			setData((prevData) => ({
				...prevData,
				tasks: prevData.tasks.map((taskItem) =>
					taskItem.id === task.id
					? { ...taskItem, name: newTitle }
					: taskItem
				),
			}));
		} 

		setIsRenaming(false);
	};

	return (
		<>
			{isRenaming ? (
				<form action="?" onSubmit={
					(e) => {
						e.preventDefault();
				
						handleRename();
					}
				}>
					<TextInput
						value={newTitle}
						onBlur={() => handleRename()}
						onChange={(e) => setNewTitle(e.target.value)}
						autoFocus={true}
						onFocus={(e) => {e.target.select()}}
						onKeyDown={
							(e) => {
								if (e.key === 'Escape') {
									setIsRenaming(false);
								}
							}
						}
						style={{ flex: 1 }}
					/>
				</form>
			) : (
				<p 
					className="kanban-task__title" 
					onClick={() => setIsRenaming(true)}
				>
					{task.name}
				</p>
			)}
		</>
	);
};

export default KanbanTaskRename;