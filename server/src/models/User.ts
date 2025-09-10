import { Schema, model, models, Document } from "mongoose"

export interface IUser extends Document {
  username: string
  email: string
  password: string
  isVerified: boolean
  joinedSession?: string
  verifyToken?: string
  icon?: string
  createdAt: Date
  updatedAt: Date
}

const UserSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
  joinedSession: { type: String },
  verifyToken: { type: String },
  icon: { type: String },
}, { timestamps: true })

const User = models.User || model<IUser>("User", UserSchema)

export default User 