import { Box, Typography } from "@mui/material";

import type { EditorProps } from "./types";

const Editor = ({ note }: EditorProps) => {
	if (!note) {
		return <NoNoteSelected />;
	}

	return (
		<Box>
			<Typography variant="h4" gutterBottom>
				{note.title}
			</Typography>

			<Typography>{note.content}</Typography>
		</Box>
	);
};

const NoNoteSelected = () => (
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

export default Editor;
