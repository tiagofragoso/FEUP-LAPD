import React from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    sectionTitle: {
        textTransform: "uppercase",
        fontWeight: theme.typography.fontWeightBold,
    },
}));

export const PageSection = ({ title, children }) => {
    const classes = useStyles();

    return (
        <div>
            <Typography variant="h4" className={classes.sectionTitle}>{title}</Typography>
            {children}
        </div>
    );
};

export default PageSection;
