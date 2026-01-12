/**
* External dependencies.
*/
import { useState, useRef } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { v4 as uuidv4 } from 'uuid';

/**
* Internal dependencies.
*/
import Button from '@/components/button/button';
import TextInput from '@/components/text-input/text-input';
import IconButton from '@/components/icon-button/icon-button';
import { HStack, VStack } from '@/components/stack/stack';
import { useKanbanBoard } from '@/hooks/use-kanban-board';
import { generateRandomHexColor } from '@/helpers/generate-random-hex-color';

const KanbanListCreate = (props) => {
	const { listsItemsRef } = props;
	const { setData } = useKanbanBoard();

	const [isFormOpen, setIsFormOpen] = useState(false);
	const [inputValue, setInputValue] = useState('');
	
	const onSubmit = (e) => {
		if (!!inputValue.trim()) {
			setData(prevData => ({
				...prevData,
				lists: [
					...prevData.lists,
					{
						id: `list-${uuidv4()}`,
						name: inputValue.trim(),
						labelColor: generateRandomHexColor(),
					}
				]
			}));

			setTimeout(() => {
				listsItemsRef?.current?.scrollIntoView({
					behavior: "smooth", block: "end", inline: "end"
				});
			}, 0);

			handleClose();
		}

		e.preventDefault();
	};
	
	const handleClose = () => {
		setInputValue('');
		setIsFormOpen(false);
	}
	
	const formRef = useRef();
	
	return (
		<>
			{isFormOpen ? (
				<form 
					className="kanban-list__create"
					ref={formRef} 
					onSubmit={onSubmit} 
				>
					<VStack gap={10}>
						<TextInput 
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
							placeholder="Enter list title"
							autoFocus={true}
						/>
						
						<HStack gap={8}>
							<Button type="submit" variant="primary">Done</Button>

							<Button variant="plain" onClick={handleClose}>Cancel</Button>
						</HStack>
					</VStack>
				</form>
				) : (
					<div style={{ paddingRight: '3px' }}>
						<IconButton 
							variant="primary" 
							size={32}
							iconSize={24}
							onClick={() => setIsFormOpen(true)}
							icon={AddIcon}
						/>
					</div>
				)
			}
		</>
	);
};
	
export default KanbanListCreate;