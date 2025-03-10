import * as yup from "yup";
const CreateTaskSchema = yup.object({
  taskName: yup
    .string()
    .min(2, "taskname must be 2 or more characters")
    .required(),
  taskText: yup.string().required(),
});

export default CreateTaskSchema;
