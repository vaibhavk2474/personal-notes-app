import { useState } from "react";

import Editor from "../../components/Editor";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";

import { useNotes } from "../../hooks/useNotes";

import useNotification from "../../context/Notification/useNotification";

import MainLayout from "../../layouts/MainLayout";
import { useKeyboardShortcuts } from "../../hooks/useKeyboardShortcuts";
import useThemeContext from "../../context/theme/useThemeContext";

const Dashboard = () => {
	const { notes, selectedNote, selectedNoteId, setSelectedNoteId, createNote, updateNote, deleteNote } = useNotes();
	const { sidebarOpen, setSidebarOpen } = useThemeContext();

	const { success, error } = useNotification();

	const [search, setSearch] = useState("");

	const filteredNotes = notes.filter((note) => note.title.toLowerCase().includes(search.toLowerCase()));

	const handleCreateNote = () => {
		createNote();

		success("New note created successfully");
	};

	const handleDeleteNote = (id: string) => {
		deleteNote(id);

		error("Note deleted successfully");
	};

	useKeyboardShortcuts({
		onCreateNote: handleCreateNote,

		onCloseDrawer: () => setSidebarOpen(false),

		isDrawerOpen: sidebarOpen,
	});
	return (
		<MainLayout
			sidebar={
				<Sidebar
					notes={filteredNotes}
					search={search}
					onSearchChange={setSearch}
					selectedNoteId={selectedNoteId}
					onSelectNote={setSelectedNoteId}
					onCreateNote={handleCreateNote}
					onDeleteNote={handleDeleteNote}
				/>
			}
			header={<Header />}
		>
			<Editor note={selectedNote} onUpdateNote={updateNote} />
		</MainLayout>
	);
};

export default Dashboard;
