import React, { useContext } from 'react';
import { useFormikContext, Formik, Form, Field } from 'formik';
import { Context as UrlsContext } from "../../Context/UrlsContext";
import { Button } from "@chakra-ui/core";
import SweetAlert from 'react-bootstrap-sweetalert';

const SubmitForm = () => {
    const { values, submitForm, isSubmitting } = useFormikContext();
    // const form = useFormikContext();
    // console.log(form)
    return (
        <>
            <Button m={5} variantColor="blue" isLoading={isSubmitting} isDisabled={
                values.url.length < 5
            }
                onClick={submitForm}
            >Create</Button>
        </>
    )
    // return null;

}

const CreateURLForm = () => {
    const { state, addUrl, clearMessage } = useContext(UrlsContext);
    const { errorMessage, successMessage } = state;
    return (
        <>
            <Formik
                initialValues={{ url: '' }}
                validate={values => {
                    const errors = {};
                    if (values.url.length < 5) {
                        errors.url = 'Invalid url Too short.';
                    }
                    return errors;
                }}
                onSubmit={(values, actions) => {
                    setTimeout(() => {
                        // alert(JSON.stringify(values, null, 2));
                        addUrl(values);
                        actions.resetForm();
                        actions.setSubmitting(false);
                    }, 1000);
                }}
            >
                <Form>
                    <Field className="form-control" name="url" type="text" />
                    <SubmitForm />
                </Form>
            </Formik>
            {errorMessage ? <SweetAlert error onConfirm={clearMessage} title="Error!">
                {errorMessage}
            </SweetAlert> : null}
            {successMessage ? <SweetAlert success onConfirm={clearMessage} title="Success!">
                {successMessage}
            </SweetAlert> : null}
        </>
    )

}

export default CreateURLForm;