export interface ConsoleItemI {
  label?: "bot" | "general";
  type: "info" | "error" | "success";
  message: string;
  createdAt?: Date;
}
