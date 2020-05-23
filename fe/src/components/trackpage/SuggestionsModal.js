import React from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText,
    DialogTitle, Radio, RadioGroup, FormControlLabel, makeStyles,
    FormControl, FormLabel }  from "@material-ui/core";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import { reloadLyrics } from "../../services/trackService";

const useStyles = makeStyles((theme) => ({
    dialogTitle: {
        "& h2": {
            fontWeight: theme.typography.fontWeightBold,
        },
    },
    formGroupTitle: {
        textTransform: "uppercase",
        fontWeight: theme.typography.fontWeightBold,
        marginBottom: theme.spacing(1),
    },
    fieldSet: {
        marginTop: theme.spacing(2),
    },
}));

const SuggestionRadio = ({ value, name, register }) => (
    <FormControlLabel value={value} label={value} inputRef={register} control={<Radio disableRipple name={name} />} />
);

export const SuggestionsModal = ({ open, suggestions, handleClose }) => {
    const classes = useStyles();

    const dispatch = useDispatch();

    const { register, handleSubmit } = useForm();

    const onSubmit = ({ artist, track }) => {
        if (artist && track) {
            dispatch(reloadLyrics(artist, track));
        }
    };

    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                <DialogTitle classes={{ root: classes.dialogTitle }}>Suggestions</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Help us find lyrics for this track
                    </DialogContentText>
                    <FormControl classes={{ root: classes.fieldSet }} fullWidth component="fieldset">
                        <FormLabel classes={{ root: classes.formGroupTitle }} component="legend" focused={false}>Track name</FormLabel>
                        <RadioGroup defaultValue={suggestions.tracks[0]} aria-label="track name" name="track">
                            {
                                suggestions.tracks.map((track, i) => <SuggestionRadio key={i} value={track} name="track" register={register} />)
                            }
                        </RadioGroup>
                    </FormControl>
                    <FormControl classes={{ root: classes.fieldSet }} fullWidth component="fieldset">
                        <FormLabel classes={{ root: classes.formGroupTitle }} component="legend" focused={false}>Artist name</FormLabel>
                        <RadioGroup defaultValue={suggestions.artists[0]} aria-label="artist name" name="artist">
                            {
                                suggestions.artists.map((artist, i) => <SuggestionRadio key={i} value={artist} name="artist" register={register} />)
                            }
                        </RadioGroup>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="default">
                        Cancel
                    </Button>
                    <Button type="submit" onClick={handleClose} color="primary">
                        Submit
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default SuggestionsModal;
