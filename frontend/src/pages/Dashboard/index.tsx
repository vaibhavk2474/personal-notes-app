import { useState } from "react";
import Editor from "../../components/Editor";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { useNotes } from "../../hooks/useNotes";
import MainLayout from "../../layouts/MainLayout";

const Dashboard = () => {
	const { notes, selectedNote, selectedNoteId, setSelectedNoteId, createNote, updateNote, deleteNote } = useNotes();
	const [search, setSearch] = useState("");

	const filteredNotes = notes.filter((note) => note.title.toLowerCase().includes(search.toLowerCase()));

	return (
		<MainLayout
			sidebar={
				<Sidebar
					notes={filteredNotes}
					search={search}
					onSearchChange={setSearch}
					selectedNoteId={selectedNoteId}
					onSelectNote={setSelectedNoteId}
					onCreateNote={createNote}
					onDeleteNote={deleteNote}
				/>
			}
			header={<Header />}
		>
			<Editor note={selectedNote} onUpdateNote={updateNote} />
		</MainLayout>
	);
};

export default Dashboard;
