import * as yup from "yup";
const CreateTaskSchema = yup.object({
  taskName: yup
    .string()
    .min(2, "taskname must be 2 or more characters")
    .required(),
  taskText: yup.string().min(4, "text must be 5 or more characters").required(),
});

export default CreateTaskSchema;
