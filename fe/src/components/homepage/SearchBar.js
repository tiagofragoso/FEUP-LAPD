import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { makeStyles, InputBase, Checkbox, FormControlLabel } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
    searchBar: {
        width: "450px",
        height: "112px",
        position: "relative",
    },
    search: {
        width: "100%",
        height: "64px",
        backgroundColor: theme.palette.common.white,
        borderRadius: "20px",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)",
        position: "absolute",
        zIndex: 2,
        display: "flex",
        alignItems: "center",
        color: theme.palette.common.white,
    },
    filters: {
        width: "80%",
        height: "64px",
        backgroundColor: theme.palette.common.white,
        borderRadius: "20px",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)",
        zIndex: 1,
        position: "absolute",
        bottom: 0,
        left: "calc((450px - 80%)/2)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: theme.spacing(2, 3, 0, 3),
        "& label": {
            margin: 0,
        },
    },
    root: {
        width: "100%",
        height: "100%",
        flexGrow: 1,
    },
    input: {
        padding: theme.spacing(1, 2, 1, 3),
        width: "100%",
        fontSize: theme.typography.fontSize * 1.5,
    },
    searchIcon: {
        marginRight: theme.spacing(3),
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        background: "linear-gradient(270deg, #FF7BAC 0%, #F7931E 96.59%);",
        padding: theme.spacing(0.8),
        borderRadius: "50%",
    },
}));

export const SearchBar = ({ searchQuery, submitSearch }) => {
    const classes = useStyles();

    const { register, handleSubmit, setValue } = useForm();

    useEffect(() => {
        if (searchQuery) {
            setValue("q", searchQuery);
        }
    }, [searchQuery, setValue]);

    return (
        <form noValidate autoComplete="off" onSubmit={handleSubmit(submitSearch)} className={classes.searchBar}>
            <div className={classes.search}>
                <InputBase
                    inputRef={register}
                    name="q"
                    placeholder="Search"
                    classes={{
                        root: classes.root,
                        input: classes.input,
                    }}
                    inputProps={{ "aria-label": "search" }}
                />
                <div className={classes.searchIcon} onClick={handleSubmit(submitSearch)}>
                    <SearchIcon color="inherit"/>
                </div>
            </div>

            <div className={classes.filters}>
                <FormControlLabel
                    value="albums"
                    control={<Checkbox color="primary" />}
                    label="Albums"
                    labelPlacement="start"
                />
                <FormControlLabel
                    value="artists"
                    control={<Checkbox color="primary" />}
                    label="Artists"
                    labelPlacement="start"
                />
                <FormControlLabel
                    value="tracks"
                    control={<Checkbox color="primary" />}
                    label="Tracks"
                    labelPlacement="start"
                />
            </div>
        </form>
    );
};

SearchBar.propTypes = {
    searchQuery: PropTypes.string,
    submitSearch: PropTypes.func.isRequired,
};

export default SearchBar;
