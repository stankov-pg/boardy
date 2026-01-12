/**
 * External dependencies.
 */
import { useContext } from "react";

/**
 * Internal dependencies.
 */
import { KanbanBoardContext } from "@/components/kanban-board/kanban-board.context";

export const useKanbanBoard = () => useContext(KanbanBoardContext);