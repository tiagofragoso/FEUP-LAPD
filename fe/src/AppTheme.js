import { createMuiTheme } from "@material-ui/core/styles";
import { blue, purple } from "@material-ui/core/colors";

const theme = createMuiTheme({
    palette: {
        primary: blue,
        secondary: purple,
    },
    status: {
        danger: "orange",
    },
});

export default theme;
