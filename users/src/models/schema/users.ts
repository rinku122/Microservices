import mongoose, { Schema } from "mongoose";

class UserSchema extends Schema {
  public objectSchema: any;
  constructor() {
    super();
    this.schema();
  }

  private schema() {
    this.objectSchema = new Schema({
      email: { type: String, unique: true, required: true },
      name: { type: String, required: true },
      age: { type: Number, required: true },
    });
  }
}

export default mongoose.model("User", new UserSchema().objectSchema);
