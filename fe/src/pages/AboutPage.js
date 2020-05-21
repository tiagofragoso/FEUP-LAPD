import React from "react";
import { Link, Typography, makeStyles } from "@material-ui/core";

import PageLayout from "../components/PageLayout";

const useStyles = makeStyles((theme) => ({
    content: {
        marginTop: theme.spacing(2),
    },
    paragraph: {
        marginBottom: theme.spacing(2),
        fontSize: "20px",
    },
}));

export const AboutPage = () => {
    const classes = useStyles();

    return (
        <PageLayout>
            <Typography variant="h3">About us</Typography>
            <div className={classes.content}>
                <Typography className={classes.paragraph} variant="body1" component="p">
                    musicl is a Web Application developed as a course project for the LAPD (Annotation and Document Processing Languages) course unit at FEUP.
                </Typography>
                <Typography className={classes.paragraph} variant="body1" component="p">
                    The platform is divided into 2 components: <strong>this application</strong> and an <strong>API</strong> serving the content displayed in this website and its main goal is merge data from different public API’s in order to provide a single source of richer content regarding <strong>Music Information</strong>.
                </Typography>
                <Typography className={classes.paragraph} variant="body1" component="p">
                    To accomplish this, the following API’s were used:
                </Typography>
                <ul>
                    <li>
                        <Link
                            href="https://developer.spotify.com/documentation/web-api/reference-beta/" component="button"
                            variant="body1" color="textPrimary" target="_blank" rel="noopener"
                        >
                            Spotify Web API
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="https://www.mediawiki.org/wiki/API:Main_page" component="button"
                            variant="body1" color="textPrimary" target="_blank" rel="noopener"
                        >
                            Wikipedia API
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="https://lyricsovh.docs.apiary.io/" component="button"
                            variant="body1" color="textPrimary" target="_blank" rel="noopener"
                        >
                            Lyrics.ovh API
                        </Link>
                    </li>
                </ul>
                <Typography className={classes.paragraph} variant="body1" component="p">
                    We do not own any of the content displayed in this website and each page will contain the respective API(‘s) disclaimer.
                </Typography>
                <Typography className={classes.paragraph} variant="body1" component="p">
                    You can find the source code of this project on GitHub.
                </Typography>

            </div>
        </PageLayout>
    );
};

export default AboutPage;
