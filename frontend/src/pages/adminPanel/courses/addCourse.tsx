import React, { Fragment, useEffect } from "react";
import Navbarr from "../../../components/navbar/Navbar";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useCreateCourseMutation } from "../../../store/services/coursesApi";
import { useNavigate } from "react-router-dom";

const AddCoursePage = () => {
  const [createCourse, { isSuccess }] = useCreateCourseMutation();
  const navigate = useNavigate();
  useEffect(() => {
    if (isSuccess) {
      navigate("/courses");
    }
  }, [isSuccess]);

  const initialValues = {
    name: "",
    level: "easy",
    description: "",
    file: null,
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    level: Yup.string().oneOf(["easy", "medium", "hard"], "Invalid level"),
    description: Yup.string().required("Description is required"),
  });

  const { values, handleChange, handleSubmit, errors, touched, setFieldValue } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      console.log("Form values:", values);
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("level", values.level);
      formData.append("description", values.description);
      formData.append("file", values.file!);
      console.log("Form submitted:", formData);
      createCourse(formData);
    },
  });

  const handleFileChange = (event: any) => {
    setFieldValue("file", event.currentTarget.files[0]);
  };

  return (
    <Fragment>
      <Navbarr />
      <div className="w-full flex justify-center items-center">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col space-y-4 w-3/4 mt-28"
          encType="multipart/form-data"
        >
          <h1 className="text-xl font-semibold">Add Course</h1>
          <div className="flex items-center">
            <label htmlFor="name" className="w-24 mr-2 text-right">
              Name:
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={values.name}
              onChange={handleChange("name")}
              placeholder="Enter your name"
              className="w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          {errors.name && touched.name && <div className="text-red-500 text-sm">{errors.name}</div>}

          <div className="flex items-center">
            <label htmlFor="level" className="w-24 mr-2 text-right">
              Level:
            </label>
            <select
              id="level"
              name="level"
              value={values.level}
              onChange={handleChange("level")}
              className="rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>

          <div className="flex items-center">
            <label htmlFor="description" className="w-24 mr-2 text-right">
              Description:
            </label>
            <textarea
              id="description"
              name="description"
              value={values.description}
              onChange={handleChange("description")}
              rows={5}
              placeholder="Enter a description"
              className="rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          {errors.description && touched.description && (
            <div className="text-red-500 text-sm">{errors.description}</div>
          )}
          <div className="flex items-center">
            <label htmlFor="file" className="w-24 mr-2 text-right">
              Image:
            </label>
            <input
              id="file"
              name="file"
              type="file"
              onChange={handleFileChange}
              className="rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 w-fit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default AddCoursePage;
