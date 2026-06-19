import { Box, InputBase, Typography } from "@mui/material";

import type { EditorProps } from "./types";
import { editorStyles } from "./styles";

const Editor = ({ note, onUpdateNote }: EditorProps) => {
	if (!note) {
		return <NoNoteSelected />;
	}

	return (
		<Box>
			<InputBase
				fullWidth
				placeholder="Untitled"
				value={note.title}
				sx={editorStyles.title}
				onChange={(e) =>
					onUpdateNote(note.id, {
						title: e.target.value,
					})
				}
			/>

			<InputBase
				fullWidth
				multiline
				minRows={20}
				placeholder="Start writing..."
				value={note.content}
				sx={editorStyles.content}
				onChange={(e) =>
					onUpdateNote(note.id, {
						content: e.target.value,
					})
				}
			/>
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
