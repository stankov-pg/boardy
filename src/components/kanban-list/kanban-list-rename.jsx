/**
* External dependencies.
*/
import { useState } from 'react';

/**
* Internal dependencies.
*/
import TextInput from '@/components/text-input/text-input';
import { useKanbanBoard } from '@/hooks/use-kanban-board';

const KanbanListRename = ({ list }) => {
	const { setData } = useKanbanBoard();

	const [isRenaming, setIsRenaming] = useState(false);
	const [newTitle, setNewTitle] = useState(list.name);

	const handleRename = () => {
		if (newTitle.trim() === '') {
			setNewTitle(list.name);
		} else {
			setData((prevData) => ({
				...prevData,
				lists: prevData.lists.map((listItem) =>
					listItem.id === list.id
					? { ...listItem, name: newTitle }
					: listItem
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
						autoFocus={true}
						onBlur={handleRename}
						onFocus={(e) => {e.target.select()}}
						onChange={(e) => setNewTitle(e.target.value)}
						onKeyDown={(e) => {
							if (e.key === 'Escape') {
								setIsRenaming(false);
							}
						}}
						style={{ fontWeight: 700 }}
					/>
				</form>
			) : (
				<strong className="kanban-list__title" onClick={() => setIsRenaming(true)}>{list.name}</strong>
			)}
		</>
	);
};

export default KanbanListRename;