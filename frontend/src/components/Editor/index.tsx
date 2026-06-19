import { Box, Typography } from "@mui/material";

const Editor = () => {
	return (
		<Box
			sx={{
				height: "100%",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				flexDirection: "column",
				gap: 2,
			}}
		>
			<Typography variant="h3">📚</Typography>

			<Typography variant="h5">Select a note</Typography>

			<Typography color="text.secondary">Choose a note from the sidebar or create a new one.</Typography>
		</Box>
	);
};

export default Editor;
