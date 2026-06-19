import Editor from "../../components/Editor";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import MainLayout from "../../layouts/MainLayout";

const Dashboard = () => {
	return (
		<MainLayout sidebar={<Sidebar />} header={<Header />}>
			<Editor />
		</MainLayout>
	);
};

export default Dashboard;
