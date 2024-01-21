import React from "react";
import { useForm } from "react-hook-form";
import { TextField, Button, Grid, Autocomplete } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const schema = yup.object({
    address: yup.string(),
    state: yup.string(),
    city: yup.string(),
    country: yup.string().required(),
    pincode: yup.string()
}).required();

export const FormStep2 = ({ setStep, countryOptions }) => {

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema)
    });;

    const onSubmit = (data) => {
        setStep({ state: false, data, type: 'submit' })
    };

    const cancel = () => {
        reset();
        setStep({ state: false, data: {}, type: 'next' })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} >
            <Grid container rowSpacing={2} spacing={2} sx={{ mb: 2 }}>
                <Grid item xs={12} md={4} >
                    <TextField fullWidth
                        {...register("address")} id="address"
                        label="Address(Optional)" variant="outlined"
                        error={errors.address?.message ? true : false}
                        helperText={errors.address?.message}
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <TextField fullWidth id="state"
                        {...register("state")} label="State(Optional)"
                        error={errors.state?.message ? true : false}
                        helperText={errors.state?.message}
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <TextField fullWidth id="city"
                        {...register("city")} label="City(Optional)"
                        error={errors.city?.message ? true : false}
                        helperText={errors.city?.message}
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <Autocomplete fullWidth id="country"
                        freeSolo
                        options={countryOptions}
                        renderInput={(params) => <TextField {...params}
                            label="Select Country"
                            {...register("country")}
                            error={errors.country?.message ? true : false}
                            helperText={errors.country?.message} />}
                    />
                </Grid>
                <Grid item xs={12} md={4} >
                    <TextField fullWidth
                        {...register("pincode")} id="pincode" label="Pincode(Optional)" variant="outlined"
                        error={errors.pincode?.message ? true : false}
                        helperText={errors.pincode?.message}
                    />
                </Grid>
            </Grid>
            <Grid
                container
                direction="row"
                justifyContent="flex-end"
                alignItems="center"
            >
                <Button onClick={() => cancel()} sx={{ mx: 2 }} variant="outlined">Cancel</Button>
                <Button type="submit" variant="contained">Save</Button>
            </Grid>
        </form>
    );
}
