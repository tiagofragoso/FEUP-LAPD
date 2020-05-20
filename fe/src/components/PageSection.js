import React from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    section: {
        marginBottom: theme.spacing(3),
    },
    sectionTitle: {
        textTransform: "uppercase",
        fontWeight: theme.typography.fontWeightBold,
    },
}));

export const PageSection = ({ title, children }) => {
    const classes = useStyles();

    return (
        <div className={classes.section}>
            <Typography variant="h4" className={classes.sectionTitle}>{title}</Typography>
            {children}
        </div>
    );
};

export default PageSection;
