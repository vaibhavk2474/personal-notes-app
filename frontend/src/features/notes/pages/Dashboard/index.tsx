import { useState } from "react";

import Editor from "../../components/Editor";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";

import { useNotes } from "../../hooks/useNotes";

import useNotification from "../../../../context/notifications/useNotification";

import MainLayout from "../../../../shared/layouts/MainLayout";
import { useKeyboardShortcuts } from "../../../../shared/hooks/useKeyboardShortcuts";
import useThemeContext from "../../../../context/theme/useThemeContext";
import { useAuth } from "../../../auth/context/useAuth";

const Dashboard = () => {
	const { user } = useAuth();

	if (!user) {
		return null;
	}

	return <NotesDashboard userId={user.id} />;
};

const NotesDashboard = ({ userId }: { userId: string }) => {
	const { notes, selectedNote, selectedNoteId, setSelectedNoteId, createNote, updateNote, deleteNote } = useNotes(userId);
	const { sidebarOpen, setSidebarOpen } = useThemeContext();

	const { success } = useNotification();

	const [search, setSearch] = useState("");

	const filteredNotes = notes.filter((note) => note.title.toLowerCase().includes(search.toLowerCase()));

	const handleCreateNote = () => {
		createNote();

		success("New note created successfully");
	};

	const handleDeleteNote = (id: string) => {
		deleteNote(id);

		success("Note deleted successfully");
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
