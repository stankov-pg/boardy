/**
* External dependencies.
*/
import { useState, useRef, useLayoutEffect } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { v4 as uuidv4 } from 'uuid';

/**
* Internal dependencies.
*/
import Button from '@/components/button/button';
import TextInput from '@/components/text-input/text-input';
import { HStack, VStack } from '@/components/stack/stack';
import { useKanbanBoard } from '@/hooks/use-kanban-board';

const KanbanTaskCreate = (props) =>  {
	const { list, listTasksRef } = props;
	const { setData } = useKanbanBoard();

	const [isFormOpen, setIsFormOpen] = useState(false);
	const [inputValue, setInputValue] = useState('');

	const onSubmit = (e) => {
		e.preventDefault();

		if (inputValue.trim()) {
			setData(prevData => ({
				...prevData,
				tasks: [
					...prevData.tasks,
					{
						listId: list.id,
						id: `task-${uuidv4()}`, 
						name: inputValue.trim(),
					},
				]
			}));

			setInputValue('');
			inputRef.current.focus();
			setIsFormOpen(true);

			setTimeout(() => {
				listTasksRef?.current?.scrollIntoView({
					behavior: 'smooth',
					block: 'end',
				});
			}, 0);

			return;
		};

		handleClose();
	};

	const handleClose = () => {
		setInputValue('');
		setIsFormOpen(false);
	}

	const inputRef = useRef();

	return (
		<>
			{isFormOpen ? (
				<form 
					onSubmit={onSubmit}
				>
					<VStack gap={10}>
						<TextInput 
							ref={inputRef}
							value={inputValue} 
							onChange={(e) => setInputValue(e.target.value)}
							onBlur={() => {
								if (!inputValue.trim()) {
									setIsFormOpen(false);
								}
							}}
							onKeyDown={(e) => {
								if(e.key === 'Escape') {
									handleClose();
								}
							}}
							placeholder="Enter task title"
							autoFocus={true}
						/>
						
						<HStack gap={8}>
							<Button type="submit" variant="primary">Done</Button>

							<Button 
								variant="plain" 
								onClick={() => {
									handleClose();
								}}
							>
								Cancel
							</Button>
						</HStack>
					</VStack>
				</form>
				) : (
					<Button width="100%" variant="plain" onClick={() => setIsFormOpen(true)}>
						<AddIcon />

						Add Task
					</Button>
				)
			}
		</>
	)
};

export default KanbanTaskCreate;