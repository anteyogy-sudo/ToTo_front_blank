import { z } from "zod";

export enum LoginStep {
  PhoneNumber,
  ConfirmCode,
  Name,
}

const phoneField = z
    .string()
    .min(1, "Введите номер")
    .regex(/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/, "Введите корректный номер");

const confirmCodeField = z
    .string()
    .regex(/^\d{5}$/, "Код должен состоять из 5 цифр");

const firstNameField = z
    .string()
    .min(1, "Введите имя");

const lastNameField = z
    .string()
    .min(1, "Введите фамилию");

export const baseLoginSchema = z.object({
  phone: z.string(),
  confirm_code: z.string(),
  first_name: z.string(),
  last_name: z.string(),
});

export const createLoginSchema = (step: LoginStep) => {
  return baseLoginSchema.superRefine((data, ctx) => {

    if (step === LoginStep.PhoneNumber) {
      const result = phoneField.safeParse(data.phone);

      if (!result.success) {
        result.error.issues.forEach((issue) => {
          ctx.addIssue({
            ...issue,
            path: ["phone"],
          });
        });
      }
    }

    if (step === LoginStep.ConfirmCode) {
      const result = confirmCodeField.safeParse(data.confirm_code);

      if (!result.success) {
        result.error.issues.forEach((issue) => {
          ctx.addIssue({
            ...issue,
            path: ["confirm_code"],
          });
        });
      }
    }

    if (step === LoginStep.Name) {
      const firstNameResult = firstNameField.safeParse(data.first_name);
      const lastNameResult = lastNameField.safeParse(data.last_name);

      if (!firstNameResult.success) {
        firstNameResult.error.issues.forEach((issue) => {
          ctx.addIssue({
            ...issue,
            path: ["first_name"],
          });
        });
      }

      if (!lastNameResult.success) {
        lastNameResult.error.issues.forEach((issue) => {
          ctx.addIssue({
            ...issue,
            path: ["last_name"],
          });
        });
      }
    }
  });
};

export type LoginFormValues = z.infer<typeof baseLoginSchema>;