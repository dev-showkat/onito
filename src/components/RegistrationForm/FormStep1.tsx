import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { TextField, Button, Grid, MenuItem } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const initialSchema = yup.object({
    name: yup.string().min(3, 'Name must be at least 3 characters long').required(),
    age: yup.number().positive().integer().required(),
    sex: yup.string().required('Male or Female'),
    mobile: yup.string().matches(/^(\+91-?)?[1-9]\d{4}[0-9]\d{4}$/, 'Invalid mobile number').required(),
    issuedIdType: yup.string().required('Aadhar or PAN'),
    issuedId: yup.string().matches(/^[2-9]\d{1}[0-9]\d{9}$/, 'Invalid Aadhar number').required()
});

export const FormStep1 = ({ setStep }) => {

    const [schema, setSchema] = useState(initialSchema);
    const [selectedIdType, setSelectedIdType] = useState('Aadhar');


    const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema)
    });

    const next = (data) => {
        setStep({ state: true, data, type: 'next' })
    };

    const genderOptions = [
        { value: 'Male', label: 'Male' },
        { value: 'Female', label: 'Female' }
    ];

    const idTypeOptions = [
        { value: 'Aadhar', label: 'Aadhar' },
        { value: 'PAN', label: 'PAN' }
    ];

    const onChangeIssuedIdType = ({ target }) => {
        const { value } = target;
        setSelectedIdType(value);
        setValue('issuedId', '',)
        setSchema(yup.object({
            name: yup.string().min(3, 'Name must be at least 3 characters long').required(),
            age: yup.number().positive().integer().required(),
            sex: yup.string().required('Male or Female'),
            mobile: yup.string().matches(/^(\+91-?)?[1-9]\d{4}[0-9]\d{4}$/, 'Invalid mobile number').required(),
            issuedIdType: yup.string().required('Aadhar or PAN'),
            issuedId: value === 'Aadhar' ?
                yup.string().matches(/^[2-9]\d{1}[0-9]\d{11}$/, 'Invalid Aadhar number').required() :
                yup.string().length(10, 'Invalid PAN number').required()
        }));
    }

    return (
        <form onSubmit={handleSubmit(next)} >
            <Grid container rowSpacing={2} spacing={2} sx={{ mb: 2 }}>
                <Grid item xs={12} md={4} >
                    <TextField fullWidth
                        {...register("name")} id="name"
                        label="Name" variant="outlined"
                        error={errors.name?.message ? true : false}
                        helperText={errors.name?.message}
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <TextField fullWidth
                        {...register("age")} id="age"
                        label="Age in Years" variant="outlined"
                        error={errors.age?.message ? true : false}
                        helperText={errors.age?.message ? 'Age is required field' : ''}
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <TextField fullWidth id="sex" select
                        {...register("sex")} label="Select gender"
                        defaultValue="Male"
                        error={errors.sex?.message ? true : false}
                        helperText={errors.sex?.message}
                    >
                        {genderOptions.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item xs={12} md={4} >
                    <TextField fullWidth
                        {...register("mobile")} id="mobile" label="Mobile" variant="outlined"
                        error={errors.mobile?.message ? true : false}
                        helperText={errors.mobile?.message}
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <TextField fullWidth id="issuedIdType" select
                        {...register("issuedIdType")} label="Select ID type"
                        defaultValue="Aadhar"
                        error={errors.issuedIdType?.message ? true : false}
                        helperText={errors.issuedIdType?.message}
                        onChange={(e) => onChangeIssuedIdType(e)}
                    >
                        {idTypeOptions.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item xs={12} md={4}>
                    <TextField fullWidth
                        {...register("issuedId")} id="issuedId" label={`Enter ${selectedIdType} ID`} variant="outlined"
                        error={errors.issuedId?.message ? true : false}
                        helperText={errors.issuedId?.message}
                    />
                </Grid>
            </Grid>
            <Grid
                container
                direction="row"
                justifyContent="flex-end"
                alignItems="center"
            >
                <Button onClick={() => reset()} sx={{ mx: 2 }} variant="outlined">Reset</Button>
                <Button type="submit" variant="contained">Next</Button>
            </Grid>
        </form>
    );
}