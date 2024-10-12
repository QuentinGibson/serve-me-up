import { formOptions } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";

const signUpFormSettings = formOptions({
  defaultValues: {
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  },
  validatorAdapter: zodValidator(),
  onSubmit: async (values) => {
    console.log("submit: ", values);
  },
});

export default signUpFormSettings;
