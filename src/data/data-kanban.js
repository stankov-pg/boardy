export const DEFAULT_BOARD = {
	lists: [
		{
			id: 'todo-list-id',
			name: 'To Do',
			labelColor: '#ff3333'
		},
		{
			id: 'done-list-id',
			name: 'Done',
			labelColor: '#008000'
		},
	],
	tasks: [
		{
			listId: 'todo-list-id',
			id: 'task-1', 
			name: 'Task 1' 
		},
		{
			listId: 'done-list-id',
			id: 'task-2', 
			name: 'Task 2' 
		},
	]
};