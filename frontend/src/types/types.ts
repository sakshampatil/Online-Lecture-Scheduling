export interface Login {
  email: string;
  password: string;
}

export interface User {
  userId: string;
  username: string;
  email: String;
  role: "admin" | "instructor";
}
