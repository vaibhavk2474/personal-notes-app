import { Box } from "@mui/material";

interface Props {
	sidebar: React.ReactNode;
	header: React.ReactNode;
	children: React.ReactNode;
}

const MainLayout = ({ sidebar, header, children }: Props) => {
	return (
		<Box
			sx={{
				display: "flex",
				height: "100vh",
				bgcolor: "background.default",
			}}
		>
			<Box
				sx={{
					width: 300,
					borderRight: 1,
					borderColor: "divider",
					bgcolor: "background.paper",
				}}
			>
				{sidebar}
			</Box>

			<Box
				sx={{
					flex: 1,
					display: "flex",
					flexDirection: "column",
				}}
			>
				<Box
					sx={{
						height: 64,
						borderBottom: 1,
						borderColor: "divider",
						bgcolor: "background.paper",
					}}
				>
					{header}
				</Box>

				<Box
					sx={{
						flex: 1,
						p: 3,
					}}
				>
					{children}
				</Box>
			</Box>
		</Box>
	);
};

export default MainLayout;
