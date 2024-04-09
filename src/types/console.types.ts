export interface ConsoleItemI {
  type: "info" | "error";
  message: string;
  createdAt?: Date;
}
