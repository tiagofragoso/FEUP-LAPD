import React from "react";
import { useForm } from "react-hook-form";
import { Button, TextField } from "@material-ui/core";


const HomePage = () => {

    const { register, handleSubmit } = useForm();

    const submitSearch = (data) => console.log(data);

    return (
        <div>
            <form noValidate autoComplete="off" onSubmit={handleSubmit(submitSearch)}>
                <TextField inputRef={register} name="q" label="Search" />
                <Button variant="contained" color="primary" type="submit">Search</Button>
            </form>
        </div>
    );

};

export default HomePage;
