import React from "react";
import {
  FormProvider as HookFormProvider,
  SubmitHandler,
  UseFormReturn,
  FieldValues,
} from "react-hook-form";

type PropsType<TFormValues extends FieldValues> = {
  children: React.ReactNode;
  methods: UseFormReturn<TFormValues>;
  handler: SubmitHandler<TFormValues>;
};

const FormProvider = <TFormValues extends FieldValues>({
  children,
  handler,
  methods,
}: PropsType<TFormValues>) => {
  return (
    <HookFormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handler)}>{children}</form>
    </HookFormProvider>
  );
};

export default FormProvider;
