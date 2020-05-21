import React from "react";
import { AppBar, Button, Toolbar, InputBase } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useForm } from "react-hook-form";
import SearchIcon from "@material-ui/icons/Search";
import { Link, navigate } from "@reach/router";

import logo from "../assets/logo.svg";

const useStyles = makeStyles((theme) => ({
    navbar: {
        backgroundColor: "#FDFFFC",
    },
    toolbar: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
    },
    logo: {
        height: "50%",
    },
    left: {
        display: "flex",
    },
    search: {
        position: "relative",
        borderRadius: theme.shape.borderRadius,
        backgroundColor: "#F6F6F6",
        marginLeft: theme.spacing(3),
        width: "100%",
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: "100%",
        position: "absolute",
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        top: 0,
        color: theme.palette.text.primary,
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("sm")]: {
            width: "12ch",
            "&:focus": {
                width: "20ch",
            },
        },
    },
}));

export const Navbar = () => {
    const classes = useStyles();

    const { register, handleSubmit } = useForm();

    const submitSearch = (data) => {
        if (data.q.trim() !== "") {
            navigate(`/?q=${data.q}`);
        }
    };

    return (
        <AppBar position="sticky" className={classes.navbar}>
            <Toolbar variant="dense" className={classes.toolbar}>
                <div className={classes.left}>
                    <Link to="/about">
                        <img alt="logo" src={logo} height="30px" />
                    </Link>
                    <form className={classes.search} noValidate autoComplete="off" onSubmit={handleSubmit(submitSearch)}>
                        <InputBase
                            inputRef={register}
                            name="q"
                            placeholder="Search"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ "aria-label": "search" }}
                        />
                        <div className={classes.searchIcon}>
                            <SearchIcon color="inherit"/>
                        </div>
                    </form>
                </div>
                <Button to="/about" component={Link}>About</Button>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
