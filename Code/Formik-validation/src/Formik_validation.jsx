import React from "react";
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";

// Custom Input Component
const InputComponent = ({ label, ...props }) => {
  const [field, meta] = useField(props); // Formik hook for handling field
  return (
    <div className="mb-4">
      <label
        htmlFor={props.id || props.name}
        className="block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <input
        {...field}
        {...props}
        className={`mt-1 block w-full shadow-sm sm:text-sm border ${
          meta.touched && meta.error ? "border-red-500" : "border-gray-300"
        } rounded-md`}
      />
      {meta.touched && meta.error ? (
        <div className="text-red-500 text-sm mt-1">{meta.error}</div>
      ) : null}
    </div>
  );
};

// Form with all validations
const Formik_validation = () => {
  // Validation schema using Yup
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .matches(/[a-z]/, "Must contain at least one lowercase letter")
      .matches(/[A-Z]/, "Must contain at least one uppercase letter")
      .matches(/[0-9]/, "Must contain at least one number")
      .required("Password is required"),
    age: Yup.number()
      .min(18, "You must be at least 18 years old")
      .max(100, "Age cannot exceed 100 years")
      .required("Age is required"),
    phone: Yup.string()
      .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits")
      .required("Phone number is required"),
    website: Yup.string()
      .url("Invalid URL format")
      .required("Website URL is required"),
    agreement: Yup.boolean().oneOf(
      [true],
      "You must accept the terms and conditions"
    ),
  });

  return (
    <>
      <div className="bg-slate-800 text-white h-auto 2xl:h-auto xl:h-auto  flex flex-col gap-8 p-4">
        <div className="uppercase text-center text-[35px] sm:text-[35px] md:text-[40px] lg:text-[45px] xl:text-[45px] 2xl:text-[40px]">
          Formik Validation
        </div>
        <div>
          <Formik
            initialValues={{
              name: "",
              email: "",
              password: "",
              age: "",
              phone: "",
              website: "",
              agreement: false,
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              alert(`Form submitted: ${JSON.stringify(values, null, 2)}`);
            }}
          >
            {({ getFieldProps, errors, touched }) => (
              <Form className="max-w-md mx-auto p-6 bg-white text-black shadow-md rounded-lg">
                <InputComponent
                  label="Name"
                  name="name"
                  type="text"
                  placeholder="Enter your name"
                  className="w-full h-40"
                />
                <InputComponent
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  autoComplete="username"
                  className="w-full h-40"
                />
                <InputComponent
                  label="Password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  className="w-full h-40"
                />
                <InputComponent
                  label="Age"
                  name="age"
                  type="number"
                  placeholder="Enter your age"
                  className="w-full h-40"
                />
                <InputComponent
                  label="Phone Number"
                  name="phone"
                  type="text"
                  placeholder="Enter your 10-digit phone number"
                  className="w-full h-40"
                />
                <InputComponent
                  label="Website"
                  name="website"
                  type="url"
                  placeholder="Enter your website URL"
                  className="w-full h-40"
                />
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    <input
                      name="agreement"
                      type="checkbox"
                      {...getFieldProps("agreement")}
                      className="mr-2"
                    />
                    I accept the terms and conditions
                  </label>
                  {touched.agreement && errors.agreement ? (
                    <div className="text-red-500 text-sm mt-1">
                      {errors.agreement}
                    </div>
                  ) : null}
                </div>
                <button
                  type="submit"
                  className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                >
                  Submit
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default Formik_validation;
