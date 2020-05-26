import React from "react";
import { CircularProgress, makeStyles } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import PropTypes from "prop-types";

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
    center: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
    },
}));

export const PageLayout = ({ children, error, loading }) => {
    const classes = useStyles();

    return (
        <div className={classes.page}>
            <Navbar />
            <div className={classes.content}>
                <div className={classes.center}>
                    { loading && <CircularProgress/> }
                    { error && <Alert severity="error">{error}</Alert>}
                </div>
                { !loading && !error &&
                    children
                }
            </div>
        </div>
    );
};

PageLayout.propTypes = {
    error: PropTypes.any,
    loading: PropTypes.bool,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]),
};

export default PageLayout;
