import { z } from "zod";

const isValidBirthDate = (date?: string) => {
  if (!date) return true;

  const [year, month, day] = date.split("/").map(Number);

  if (!year || !month || !day) return false;

  const birthDate = new Date(year, month - 1, day);
  const now = new Date();

  return (
      birthDate.getFullYear() === year &&
      birthDate.getMonth() === month - 1 &&
      birthDate.getDate() === day &&
      birthDate <= now
  );
};

export const profileSchema = z.object({
  first_name: z.string().min(1, "Имя не может быть пустым").max(64,"Превышено максимальное количество символов"),
  last_name: z.string().min(1, "Фамилия не может быть пуста").max(64,"Превышено максимальное количество символов"),
  birth_date: z
      .string()
      .optional()
      .refine(isValidBirthDate, {
        message: "Введите корректную дату рождения",
      }),
  email: z.string().email("Введите корректный email").max(99,"Превышено максимальное количество символов").optional().or(z.literal("")),
  phone: z.string().optional(),
  gender: z.boolean().default(false).optional(),
  email_agreement: z.boolean().default(false).optional(),
  push_agreement: z.boolean().default(false).optional(),
  sms_agreement: z.boolean().default(false).optional(),
});

export type ProfileSchema = z.infer<typeof profileSchema>;
