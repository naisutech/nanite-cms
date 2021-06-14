import { Schema, Model, model } from "mongoose";
import bcrypt from "bcrypt";

interface UserInstance extends Model<NaniteUser> {}

const userSchema = new Schema<NaniteUser, UserInstance, NaniteUser>({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    private: false,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    private: true,
    minLength: 8,
  },
});

userSchema.method(
  "checkPassword",
  function (suppliedPassword: string): Promise<boolean> {
    return bcrypt.compare(suppliedPassword, this.password);
  }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

const User = model<NaniteUser>("User", userSchema);

export default User;
