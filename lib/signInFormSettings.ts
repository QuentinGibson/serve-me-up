import { formOptions } from "@tanstack/react-form";
import { zodValidator } from '@tanstack/zod-form-adapter'

const signInFormSettings = formOptions({
  defaultValues: {
    email: "",
    password: "",
  },
  validatorAdapter: zodValidator(),
  onSubmit: async (values) => {
    console.log("submit: ", values);
  },
});

export default signInFormSettings