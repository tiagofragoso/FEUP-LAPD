import React from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
    section: {
        marginBottom: theme.spacing(3),
    },
    sectionTitle: {
        textTransform: "uppercase",
        fontWeight: theme.typography.fontWeightBold,
        marginBottom: theme.spacing(2),
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

PageSection.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]).isRequired,
};

export default PageSection;
