import { useTheme } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

export const useResponsive = () => {
    const theme = useTheme();

    const isMobile = useMediaQuery(
        theme.breakpoints.down("md"),
    );

    return {
        isMobile,
    };
};