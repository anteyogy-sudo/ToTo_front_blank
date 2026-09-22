import { z } from "zod";

export const filterSchema = z.object({
  is_recipe: z.boolean().default(false).optional(),
  from_promo: z.boolean().default(false).optional(),
  more_bonuses: z.boolean().default(false).optional(),
});

export type FilterSchema = z.infer<typeof filterSchema>;
