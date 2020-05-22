import React, { useEffect } from "react";
import { makeStyles, Box, Grid, Typography, Link, Icon } from "@material-ui/core";
import { loadCSS } from "fg-loadcss";
import PropTypes from "prop-types";

import PopularityIcon from "../components/PopularityIcon";
import { calculatePopularityRatios } from "../utils/popularityRatios";

const useStyles = makeStyles((theme) => ({
    photo: {
        "& img": {
            borderRadius: theme.shape.borderRadius,
        },
    },
    title: {
        fontWeight: theme.typography.fontWeightBold,
    },
    titleLink: {
        marginLeft: theme.spacing(1),
        color: theme.palette.text.primary,
    },
    headerDetails: {
        height: "100%",
        width: "100%",
    },
    link: {
        textDecoration: "none",
    },
    popularityWrapper: {
        width: "100%",
        display: "flex",
        height: "40px",
        "& div": {
            marginRight: theme.spacing(1),
        },
    },
}));


const Header = ({ image, supertitle, title, titleUrl, subtitle, popularity, component, expandedComponent }) => {
    const classes = useStyles();

    useEffect(() => {
        const node = loadCSS(
            "https://use.fontawesome.com/releases/v5.12.0/css/all.css",
            document.querySelector("#font-awesome-css"),
        );

        return () => {
            node.parentNode.removeChild(node);
        };
    }, []);

    const renderPopularity = (popularity) =>
        <div className={classes.popularityWrapper}>
            {
                calculatePopularityRatios(popularity, 100, 5)
                    .map((r, i) => <PopularityIcon key={i} ratio={r} />)
            }
        </div>;

    return (
        <Grid container alignItems="stretch">
            <Grid item xs={12} sm={4} md={3} lg={2} className={classes.photo}>
                <img src={image} alt={title} width="100%" />
            </Grid>
            <Grid item xs={12} sm={8} md={9} lg={10}>
                <Box className={classes.headerDetails} px={2} py={1}>
                    <Grid container className={classes.headerDetails}>
                        {supertitle &&
                        <Grid item xs={12}>
                            <Typography variant="h6" component="span">{supertitle}</Typography>
                        </Grid>
                        }
                        <Grid item xs={12}>
                            <Typography className={classes.title} variant="h4" component="span">{title}</Typography>
                            {titleUrl &&
                                <Link className={classes.titleLink} href={titleUrl} target="_blank" rel="noopener">
                                    <Icon color="inherit" className="fab fa-spotify"/>
                                </Link>
                            }
                        </Grid>
                        {subtitle &&
                        <Grid item xs={12}>
                            {subtitle}
                        </Grid>
                        }
                        {(popularity || popularity === 0) &&
                        <Grid item xs={12}>
                            {renderPopularity(popularity)}
                        </Grid>
                        }
                    </Grid>
                </Box>
            </Grid>
            {component &&
                <Grid item xs={12} sm={expandedComponent ? 12 : 4} md={expandedComponent ? 12 : 3} lg={expandedComponent ? 12 : 2}>
                    <Box py={1}>
                        { component }
                    </Box>
                </Grid>
            }
        </Grid>
    );
};

export const PageWithHeader = (props) => (
    <>
        <Header {...props} />
        <Box py={2}>
            {props.children}
        </Box>
    </>
);

Header.propTypes = {
    image: PropTypes.string.isRequired,
    supertitle: PropTypes.string,
    title: PropTypes.string.isRequired,
    titleUrl: PropTypes.string.isRequired,
    subtitle: PropTypes.node.isRequired,
    popularity: PropTypes.number.isRequired,
    component: PropTypes.node,
};

PageWithHeader.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]).isRequired,
};

export default PageWithHeader;
