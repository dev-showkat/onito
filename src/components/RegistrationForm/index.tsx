import React, { useEffect, useState } from "react";
import { FormStep1 } from "./FormStep1.tsx";
import { FormStep2 } from "./FormStep2.tsx";
import { useDispatch } from "react-redux";
import { useSnackbar } from 'notistack';
import axios from "axios";

export const RegistrationForm = () => {
    const [countryOptions, setCountryOptions] = useState([]);
    const [formData, setFormData] = useState({});
    const [type, setType] = useState('next');
    const [isStep1Valid, setIsStep1Valid] = useState(false);
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        const getCountryList = async () => {
            try {
                const res = await axios(`https://restcountries.com/v2/all`);
                const countries = res.data.map(({ name }) => {
                    return {
                        value: name,
                        label: name,
                    }
                }

                );
                setCountryOptions(countries)
            } catch (error) {
                console.log(error);
            }
        }
        getCountryList();
    }, []);

    useEffect(() => {
        if (type === 'submit') {
            setType('next')
            dispatch({
                type: 'ADD',
                payload: formData
            });
            enqueueSnackbar('User added success', {
                variant: 'success',
                autoHideDuration: 3000,
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right'
                }
            });
        }
    }, [type])

    const setStep = ({ state, data, type }) => {
        setIsStep1Valid(state);
        setFormData({
            ...formData,
            ...data
        })
        setType(type)
    }

    return (
        <>
            {!isStep1Valid ? <FormStep1 setStep={setStep} /> : <FormStep2 setStep={setStep} countryOptions={countryOptions} />}
        </>
    );
}