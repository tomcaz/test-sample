import { CButton, CCol, CContainer, CForm, CFormInput, CHeader, CHeaderBrand } from "@coreui/react";
import { Controller, useForm } from "react-hook-form";
import './user-form.styles.css';
import Select from 'react-select'
import { COUNTRIES } from "../../global/constants";
import { getCountry } from "../../global/functions";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser, updateUser } from "../../reducers/user.slice";


const options = [
    ...COUNTRIES.map(country => ({
        value: country.id,
        label: country.name
    }))
];

export const UserForm = ({handleToggle}) => {
    const [ cityOption, setCityOption] = useState([]);
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.users.currentUser);
    const handleCountryChange = (country) => {
        setCityOption([
            ...getCountry(country).cities.map(city => ({
                label: city.name,
                value: city.id
            }))
        ]);
        setValue('city', currentUser? currentUser.city: 0, {
            shouldValidate: false,
            shouldDirty: true
          });
    }

    useEffect(()=> {
        if (currentUser) handleCountryChange(currentUser.country)
    }, [])
    const { register, handleSubmit, control, formState: { errors }, setValue } = useForm(currentUser? {
        defaultValues: {
            username : currentUser.username,
            city : currentUser.city,
            country: currentUser.country
        }
    }: {});
    const onSubmit = data => 
        currentUser? dispatch(updateUser({...data, id: currentUser.id})) : dispatch(addUser(data))

    return (
        <div className="form-container">
            <CForm className="row g-3" onSubmit={handleSubmit(onSubmit)}>
                <CHeader>
                    <CContainer fluid>
                        <CHeaderBrand>User Form</CHeaderBrand>
                    </CContainer>
                </CHeader>
                <CCol md={2}>
                    <Controller
                        name="country"
                        control={control}
                        render={({ field }) =>
                        <CFormInput 
                        type="text"  
                        label="User Name" 
                        placeholder="User Name"        
                        invalid={(errors && errors.username !== undefined)}
                        {
                            ...register("username",
                            {
                                required: true,
                                minLength: 4,
                                maxLength:66
                            }
                        )}
                        />}/>
                </CCol>
                <br />
                 <CCol md={3}>
                    <label className={"label" + (errors && errors.country !== undefined? " error" : "")}>
                        Country
                    </label>                   
                    <Controller
                        name="country"
                        control={control}
                        render={({ field: {value, onChange} }) => (
                        <Select
                            className={(errors && errors.country !== undefined? " error" : "")}
                            options={options}
                            value={options.find((c) => c.value === value)}
                            onChange={(val) => {
                                onChange(val.value);
                                handleCountryChange(val.value)
                            }}
                        />
                        )}
                        rules={{ required: true }}
                    />
                   
                </CCol>
                <CCol md={3}>
                    <label htmlFor="city" className={"label" + (errors && errors.city !== undefined? " error" : "")}>
                        City
                    </label>
                    <Controller
                        name="city"
                        control={control}
                        render={({ field: {onChange, value}}) => <Select
                        options={cityOption}
                        value={cityOption.find((c) => c.value === value)}
                        className={(errors && errors.city !== undefined? "error" : "")}
                        onChange={(val) => onChange(val.value)}
                        /> }                        
                     rules={{required: true}}
                    />
                </CCol>
                <CCol md={2} className="d-grid gap-2">
                    <CButton color="warning" className="form-buttom" component="button" type="submit">Save</CButton>
                </CCol>
                <CCol md={2} className="d-grid gap-2">
                    <button className="btn btn-secondary form-buttom" component="button" type="button" onClick={handleToggle}>Cancel</button>
                </CCol>
            </CForm>
        </div>
    );
}