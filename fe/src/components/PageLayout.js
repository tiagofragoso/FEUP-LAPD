import React from "react";
import { makeStyles } from "@material-ui/core";
import Navbar from "./Navbar";

const useStyles = makeStyles((theme) => ({
    page: {
        minHeight: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    content: {
        padding: theme.spacing(3, 0),
        width: "70%",
    },
}));

export const PageLayout = ({ children }) => {
    const classes = useStyles();

    return (
        <div className={classes.page}>
            <Navbar />
            <div className={classes.content}>
                {
                    children
                }
            </div>
        </div>
    );

};

export default PageLayout;
