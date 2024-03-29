import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";

export const bodyFontFamily = ["\"Rubik\"", "Roboto", "\"Helvetica\"", "Arial", "sans-serif"];
export const headerFontFamily = ["\"Karla\"", ...bodyFontFamily];

const theme = createMuiTheme({
    typography: {
        fontFamily: bodyFontFamily.join(","),
        h1: {
            fontFamily: headerFontFamily.join(","),
        },
        h2: {
            fontFamily: headerFontFamily.join(","),
        },
        h3: {
            fontFamily: headerFontFamily.join(","),
            fontWeight: 700,
        },
        h4: {
            fontFamily: headerFontFamily.join(","),
        },
        h5: {
            fontFamily: headerFontFamily.join(","),
        },
        h6: {
            fontFamily: headerFontFamily.join(","),
        },
    },
    palette: {
        primary: {
            main: "#FF7BAC",
        },
        secondary: {
            main: "#F7931E",
        },
        text: {
            primary: "#444545",
        },
    },
    status: {
        danger: "orange",
    },
});

export default responsiveFontSizes(theme);
