import { Box, Button, List, ListItemButton, ListItemText, TextField, Typography, IconButton } from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

import { sidebarStyles } from "./styles";
import type { SidebarProps } from "./types";

const Sidebar = ({ notes, selectedNoteId, onSelectNote, search, onSearchChange, onCreateNote, onDeleteNote }: SidebarProps) => {
	return (
		<Box sx={sidebarStyles.container}>
			<Box sx={sidebarStyles.header}>
				<Typography variant="h5" sx={sidebarStyles.title}>
					PersonalNotes
				</Typography>
			</Box>

			<Box sx={sidebarStyles.content}>
				<Button fullWidth variant="contained" startIcon={<AddIcon />} onClick={onCreateNote}>
					New Note
				</Button>

				<TextField size="small" placeholder="Search notes..." fullWidth value={search} onChange={(e) => onSearchChange(e.target.value)} />

				<Box sx={sidebarStyles.notesSection}>
					<Typography variant="body2" color="text.secondary" gutterBottom>
						NOTES
					</Typography>

					{notes.length === 0 && (
						<Box>
							<Typography variant="body2" color="text.secondary" sx={sidebarStyles.noNotes}>
								No notes found
							</Typography>
						</Box>
					)}

					{notes.length !== 0 && (
						<List disablePadding>
							{notes.map((note) => (
								<ListItemButton key={note.id} selected={selectedNoteId === note.id} onClick={() => onSelectNote(note.id)} sx={sidebarStyles.noteItem}>
									<MenuBookIcon fontSize="small" sx={{ mr: 1 }} />

									<ListItemText primary={note.title} />

									<IconButton
										size="small"
										sx={sidebarStyles.deleteButton}
										onClick={(e) => {
											e.stopPropagation();

											onDeleteNote(note.id);
										}}
									>
										<DeleteOutlinedIcon fontSize="small" />
									</IconButton>
								</ListItemButton>
							))}
						</List>
					)}
				</Box>
			</Box>
		</Box>
	);
};

export default Sidebar;
