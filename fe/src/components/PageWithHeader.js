import React, { useEffect } from "react";
import { makeStyles, Box, Grid, Typography, Link, Icon } from "@material-ui/core";
import { Link as RouterLink } from "@reach/router";
import { loadCSS } from "fg-loadcss";

// import fireIcon from "../assets/fire.svg";
// import fireFadeIcon from "../assets/fire_fade.svg";

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
        "& > span": {
            color: theme.palette.text.primary,
        },
    },
    headerDetails: {
        height: "100%",
        width: "100%",
    },
    popularityIcon: {
        background: "linear-gradient(180deg, #FF7BAC 0%, #F99826 100%)",
    },
    popularityWrapped: {
        position: "relative",
        height: "100%",
    },
    colored: {
        position: "absolute",
        zIndex: 5,
        height: "40px",
        "& div": {
            overflow: "hidden",
            display: "inline-block",
        },
    },
    faded: {
        position: "absolute",
        zIndex: 0,
    },
}));

// const calculatePopularityRatios = (value, max, divisions) => {
//     const ratios = [];
//     const maxPerDivision = Math.floor(max / divisions);
//     for (let i = 0; i < divisions; i++) {
//         const v = value - (i * maxPerDivision);
//         ratios.push(Math.floor((v > maxPerDivision ? maxPerDivision : Math.max(0, v)) / maxPerDivision * 100));
//     }
//     return ratios;
// };

const Header = ({ image, supertitle, title, titleUrl, subtitle, popularity, component }) => {
    const classes = useStyles();

    React.useEffect(() => {
        const node = loadCSS(
            "https://use.fontawesome.com/releases/v5.12.0/css/all.css",
            document.querySelector("#font-awesome-css"),
        );

        return () => {
            node.parentNode.removeChild(node);
        };
    }, []);

    const renderSubtitle = ({ album, artists }) => (
        <>
            {album &&
            <Typography variant="h6" component="span" display="block">{album}</Typography>
            }
            {artists &&
            <Typography variant="h6" component="span" display="block">by {
                artists.map(({ id, name }, index) => (
                    <>
                        <RouterLink key={id} to={`/artists/${id}`}>{name}</RouterLink>
                        {index !== artists.length - 1 ? ", " : null}
                    </>
                ))
            }
            </Typography>
            }
        </>
    );

    const renderPopularity = (popularity) =>
    // const ratios = calculatePopularityRatios(popularity, 100, 5);

    // return (
    //     <div className={classes.popularityWrapped}>
    //         <div className={classes.colored}>
    //             {
    //                 ratios.map((r, i) => (
    //                     <div key={i} style={{ height: `${r}%` }}>
    //                         <img src={fireIcon} height="40px" />
    //                     </div>
    //                 ))
    //             }
    //         </div>
    //         <div className={classes.faded}>
    //             <img src={fireFadeIcon} height="40px" />
    //             <img src={fireFadeIcon} height="40px" />
    //             <img src={fireFadeIcon} height="40px" />
    //             <img src={fireFadeIcon} height="40px" />
    //             <img src={fireFadeIcon} height="40px" />
    //         </div>

        //     </div>
        // );
        <Typography variant="h6" component="span" display="block">Popularity: {popularity}</Typography>;

    return (
        <Grid container alignItems="stretch">
            <Grid item xs={12} sm={4} lg={2} className={classes.photo}>
                <img src={image} alt="photo" width="100%" />
            </Grid>
            <Grid item xs={12} sm={8} lg={10}>
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
                                    <Icon className="fab fa-spotify"/>
                                </Link>
                            }
                        </Grid>
                        {subtitle &&
                        <Grid item xs={12}>
                            {renderSubtitle(subtitle)}
                        </Grid>
                        }
                        {popularity &&
                        <Grid item xs={12}>
                            {renderPopularity(popularity)}
                        </Grid>
                        }
                    </Grid>
                </Box>
            </Grid>
            {component &&
                <Grid item xs={12} sm={4} lg={2}>
                    <Box py={1}>
                        { component }
                    </Box>
                </Grid>
            }
            <Grid item xs={12} sm={8} lg={10} />
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

export default PageWithHeader;
