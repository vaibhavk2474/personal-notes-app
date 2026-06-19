import { Box, Button, List, ListItemButton, ListItemText, TextField, Typography } from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import MenuBookIcon from "@mui/icons-material/MenuBook";

import { MOCK_NOTES } from "./constants";
import { sidebarStyles } from "./styles";

const Sidebar = () => {
	return (
		<Box sx={sidebarStyles.container}>
			<Box sx={sidebarStyles.header}>
				<Typography variant="h5" sx={sidebarStyles.title}>
					PersonalNotes
				</Typography>
			</Box>

			<Box sx={sidebarStyles.content}>
				<Button fullWidth variant="contained" startIcon={<AddIcon />}>
					New Note
				</Button>

				<TextField size="small" placeholder="Search notes..." fullWidth />

				<Box sx={sidebarStyles.notesSection}>
					<Typography variant="body2" color="text.secondary" gutterBottom>
						NOTES
					</Typography>

					<List disablePadding>
						{MOCK_NOTES.map((note) => (
							<ListItemButton key={note.id} sx={sidebarStyles.noteItem}>
								<MenuBookIcon fontSize="small" sx={{ mr: 1 }} />

								<ListItemText primary={note.title} />
							</ListItemButton>
						))}
					</List>
				</Box>
			</Box>
		</Box>
	);
};

export default Sidebar;
