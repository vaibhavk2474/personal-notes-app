import Editor from "../../components/Editor";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { useNotes } from "../../hooks/useNotes";
import MainLayout from "../../layouts/MainLayout";

const Dashboard = () => {
	const { notes, selectedNote, selectedNoteId, setSelectedNoteId } = useNotes();

	return (
		<MainLayout sidebar={<Sidebar notes={notes} selectedNoteId={selectedNoteId} onSelectNote={setSelectedNoteId} />} header={<Header />}>
			<Editor note={selectedNote} />
		</MainLayout>
	);
};

export default Dashboard;
