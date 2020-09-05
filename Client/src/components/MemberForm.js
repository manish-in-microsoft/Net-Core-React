/*
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in the
 * Software without restriction, including without limitation the rights to use, copy,
 * modify, merge, publish, distribute, sublicense, and/or sell copies of the Software,
 * and to permit persons to whom the Software is furnished to do so, subject to the
 * following conditions:
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
 * PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
 * CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE
 * OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import { Button, Grid, TextField, withStyles } from "@material-ui/core";

import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useToasts } from "react-toast-notifications";

import * as actions from "../actions/Member";

const initialValues = {
  birthDate: '',
  city: '',
  emailAddress: '',
  name: '',
  phoneNumber: ''
};

const styles = theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      minWidth: 230,
    }
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 230,
  },
  smMargin: {
    margin: theme.spacing(1)
  }
});

const useForm = (initialValues, validate, setCurrentId) => {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})

  const handleInputChange = e => {
    const { name, value } = e.target
    const fieldValue = { [name]: value }
    setValues({
      ...values,
      ...fieldValue
    })
    validate(fieldValue)
  }

  const resetForm = () => {
    setValues({
      ...initialValues
    })
    setErrors({})
    setCurrentId(0)
  }

  return {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm
  };
}

const MemberForm = ({ classes, ...props }) => {
  const { addToast } = useToasts()

  const validate = (fieldValues = values) => {
    let temp = { ...errors }
    if ('birthDate' in fieldValues)
      temp.birthDate = fieldValues.birthDate ? "" : "Please provide the date of birth."
    if ('city' in fieldValues)
      temp.city = fieldValues.city ? "" : "Please provide the city name."
    if ('emailAddress' in fieldValues)
      temp.emailAddress = fieldValues.emailAddress ? "" : "Please provide the email address."
    if ('name' in fieldValues)
      temp.name = fieldValues.name ? "" : "Please provide the full name."
    if ('phoneNumber' in fieldValues)
      temp.phoneNumber = fieldValues.phoneNumber ? "" : "Please provide the phone number."
    setErrors({
      ...temp
    })

    if (fieldValues == values)
      return Object.values(temp).every(x => x == "")
  }

  const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm
  } = useForm(initialValues, validate, props.setCurrentId)

  const handleSubmit = e => {
    e.preventDefault()
    if (validate()) {
      const onSuccess = () => {
        resetForm()
        addToast("Submitted successfully", { appearance: 'success' })
      }
      if (props.currentId == 0)
        props.add(values, onSuccess)
      else
        props.update(props.currentId, values, onSuccess)
    }
  }

  useEffect(() => {
    if (props.currentId != 0) {
      setValues({
        ...props.Members.find(x => x.id == props.currentId)
      })
      setErrors({})
    }
  }, [props.currentId, props.Members, setErrors, setValues])

  return (
    <form autoComplete="off" noValidate className={classes.root} onSubmit={handleSubmit}>
      <Grid container>
        <Grid item md>
          <TextField autoFocus={true}
            label="Full Name"
            name="name"
            required={true}
            value={values.name}
            variant="outlined"
            onChange={handleInputChange}
            {...(errors.name && { error: true, helperText: errors.name })}
          />
          <TextField
            label="City"
            name="city"
            value={values.city}
            variant="outlined"
            onChange={handleInputChange}
            {...(errors.city && { error: true, helperText: errors.city })}
          />
        </Grid>
        <Grid item md>
        <TextField
            label="Email"
            name="emailAddress"
            type="email"
            value={values.emailAddress}
            variant="outlined"
            onChange={handleInputChange}
            {...(errors.emailAddress && { error: true, helperText: errors.emailAddress })}
          />
          <TextField
            label="Phone"
            name="phoneNumber"
            type="tel"
            value={values.phoneNumber}
            variant="outlined"
            onChange={handleInputChange}
            {...(errors.phoneNumber && { error: true, helperText: errors.phoneNumber })}
          />
          <TextField
            label="Date of Birth"
            name="birthDate"
            type="date"
            value={values.birthDate}
            variant="outlined"
            onChange={handleInputChange}
            {...(errors.birthDate && { error: true, helperText: errors.birthDate })}
          />
          <div>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              className={classes.smMargin}>Submit</Button>
            <Button
              variant="contained"
              className={classes.smMargin}
              onClick={resetForm}>Reset</Button>
          </div>
        </Grid>
      </Grid>
    </form>
  );
}

const actionMappings = {
  add: actions.Add,
  update: actions.Update
}

const stateMappings = state => ({
  Members: state.Member.list
})

export default connect(stateMappings, actionMappings)(withStyles(styles)(MemberForm));