/**
 * External dependencies.
 */
import { useRef } from 'react';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';

/**
 * Internal dependencies.
 */
import { DEFAULT_BOARD } from '@/data/data-kanban.js';
import KanbanListCreate from '@/components/kanban-list/kanban-list-create';
import KanbanBoard from '@/components/kanban-board/kanban-board';
import KanbanList from '@/components/kanban-list/kanban-list';
import Wrapper from '@/components/wrapper/wrapper';
import { HStack } from '@/components/stack/stack';
import useLocalStorage from '@/hooks/use-local-storage';
import { KanbanBoardContext } from '@/components/kanban-board/kanban-board.context';

const Home = () => {
	const [data, setData] = useLocalStorage('kanban-board', DEFAULT_BOARD);

	const listsItemsRef = useRef(null);

	return (
		<Wrapper>
			<KanbanBoard>
				<KanbanBoardContext.Provider value={{data, setData}}>
					<div className="kanban-board__head">
						<HStack gap={10} align="center">
							<DashboardCustomizeIcon />
							
							<h3>My Board</h3>
						</HStack>
					</div>
					
					<div className="kanban-board__body">
						<div ref={listsItemsRef} className="kanban-board__body-inner">
							<HStack gap={20} wrap={false}>
								{data.lists.map(list => (
									<KanbanList 
										key={list.id} 
										list={list} 
										tasks={
											data.tasks.filter(
												task => task.listId === list.id
											)
										} 
									/>
								))}

								<KanbanListCreate listsItemsRef={listsItemsRef} />
							</HStack>
						</div>
					</div>
				</KanbanBoardContext.Provider>
			</KanbanBoard>
		</Wrapper>
	);
}

export default Home;
