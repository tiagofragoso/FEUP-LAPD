import React from "react";
import { useForm } from "react-hook-form";
import { Button, TextField } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";

import { search } from "../services/searchService";

const HomePage = () => {

    const dispatch = useDispatch();

    const { results, loading, error } = useSelector((state) => state.search);

    const { register, handleSubmit } = useForm();

    const submitSearch = (data) => {
        dispatch(search(data));
    };

    return (
        <div>
            <form noValidate autoComplete="off" onSubmit={handleSubmit(submitSearch)}>
                <TextField inputRef={register} name="q" label="Search" />
                <Button variant="contained" color="primary" type="submit">Search</Button>
            </form>
            <p>Loading: {loading.toString()}</p>
            <p>Error: {error.toString()}</p>
            <p>Results: {results && results.toString()}</p>
        </div>
    );

};

export default HomePage;
