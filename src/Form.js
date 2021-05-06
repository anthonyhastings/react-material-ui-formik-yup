import React, { useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

const schema = Yup.object({
  firstName: Yup
    .string()
    .required('Please supply your first name'),
  lastName: Yup
    .string()
    .required('Please supply your last name'),
  gender: Yup
    .mixed()
    .oneOf(['male', 'female'], 'Please choose from the supplied values')
    .required('Please supply your gender'),
  routingNumber: Yup
    .string()
    .matches(/^\d+$/, 'Routing number can only be digits')
    .length(9, 'Routing number must be nine digits long')
    .required('Please supply your routing number'),
  accountNumber: Yup
    .string()
    .matches(/^\d+$/, 'Account number can only be digits')
    .min(10, 'Account number cannot be less then ten digits')
    .max(12, 'Account number cannot be more than twelve digits')
    .required('Please supply your account number'),
});

const Form = () => {
  const [successfulSubmission, setSuccessfulSubmission] = useState(false);

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      gender: 'male',
      routingNumber: '',
      accountNumber: ''
    },
    onSubmit: () => {
      setSuccessfulSubmission(true);
    },
    validationSchema: schema
  });

  if (successfulSubmission) {
    return (
      <Box m={4}>
        <Card>
          <CardContent>
            <Typography align="center" variant="h4">
              Submission Successful!
            </Typography>
          </CardContent>
        </Card>
      </Box>
    );
  }

  return (
    <Box m={4}>
      <Card>
        <CardContent>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6}>
              <TextField
                error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                fullWidth={true}
                helperText={formik.touched.firstName && formik.errors.firstName}
                label="First Name"
                name="firstName"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.firstName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                fullWidth={true}
                helperText={formik.touched.lastName && formik.errors.lastName}
                label="Last Name"
                name="lastName"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.lastName}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl
                error={formik.touched.gender && Boolean(formik.errors.gender)}
                fullWidth={true}
              >
                <InputLabel id="gender">Gender</InputLabel>
                <Select
                  labelId="gender"
                  name="gender"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.gender}
                >
                  <MenuItem value={'male'}>Male</MenuItem>
                  <MenuItem value={'female'}>Female</MenuItem>
                </Select>
                {formik.touched.gender && formik.errors.gender && (
                  <FormHelperText>{formik.errors.gender}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                error={formik.touched.routingNumber && Boolean(formik.errors.routingNumber)}
                fullWidth={true}
                helperText={formik.touched.routingNumber && formik.errors.routingNumber}
                label="Routing Number"
                name="routingNumber"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.routingNumber}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                error={formik.touched.accountNumber && Boolean(formik.errors.accountNumber)}
                fullWidth={true}
                helperText={formik.touched.accountNumber && formik.errors.accountNumber}
                label="Account Number"
                name="accountNumber"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.accountNumber}
              />
            </Grid>
          </Grid>
        </CardContent>
        <CardActions style={{ justifyContent: 'flex-end' }}>
          <Button
            color="primary"
            onClick={formik.handleSubmit}
            size="large"
            variant="contained"
          >
            Submit
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default Form;
