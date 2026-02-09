import { z } from "zod";

const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

export const bulkClassSchema = (groupStartIso: string) =>
  z
    .object({
      groupId: z.string().min(1, "Grupo requerido"),
      range: z.object({
        from: z.string().min(1, "Fecha inicial requerida"),
        to: z.string().min(1, "Fecha final requerida"),
      }),
      days: z.array(z.number().min(0).max(6)).min(1, "Selecciona al menos un día"),
      startHour: z.string().regex(timeRegex, "Formato HH:mm"),
      endHour: z.string().regex(timeRegex, "Formato HH:mm"),
    })
    .superRefine((data, ctx) => {
      const from = new Date(data.range.from);
      const to = new Date(data.range.to);
      const min = new Date(groupStartIso);
      if (from > to) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "La fecha inicial debe ser anterior a la final",
          path: ["range", "from"],
        });
      }
      if (from < min) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "El grupo aún no inicia en esa fecha",
          path: ["range", "from"],
        });
      }
      if (data.startHour >= data.endHour) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "La hora final debe ser mayor",
          path: ["endHour"],
        });
      }
    });

export type BulkClassInput = z.infer<ReturnType<typeof bulkClassSchema>>;

export const rescheduleSchema = z.object({
  classIds: z.array(z.number()).nonempty("Selecciona al menos una clase"),
  strategy: z.enum(["push_one_day", "next_available"]),
  reason: z.string().min(5),
  previewOnly: z.boolean().optional(),
});

export type RescheduleInput = z.infer<typeof rescheduleSchema>;
