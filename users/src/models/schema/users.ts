import mongoose, { Schema } from "mongoose";

class UserSchema extends Schema {
  public objectSchema: any;
  constructor() {
    super();
    this.schema();
  }

  private schema() {
    this.objectSchema = new Schema({
      email: {  type: String, trim: true, index: true, required: true,unique:true  },
      name: { type: String, required: true },
      age: { type: Number, required: true },
      postCount: { type: Number, default: 0 },
    });
  }
}

export default mongoose.model("User", new UserSchema().objectSchema);
