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
            { loading && <p>Loading</p> }
            { error && <p>Error: {error.toString()}</p> }
            { !loading && !error && results &&
                <>
                    <h2>Tracks</h2>
                    {
                        results.tracks.items.map((t) => <p key={t.name}>{t.name}</p>)
                    }
                    <h2>Artists</h2>
                    {
                        results.artists.items.map((a) => <p key={a.name}>{a.name}</p>)
                    }
                    <h2>Albums</h2>
                    {
                        results.albums.items.map((a) => <p key={a.name}>{a.name}</p>)
                    }
                </>
            }
        </div>
    );

};

export default HomePage;
