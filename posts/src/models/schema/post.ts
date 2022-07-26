import mongoose, { Schema } from "mongoose";

class PostSchema extends Schema {
  public objectSchema: any;
  constructor() {
    super();
    this.schema();
  }

  private schema() {
    this.objectSchema = new Schema({
      text: { type: String, required: true },
      email: { type: String, required: true },
    });
  }
}

export default mongoose.model("Post", new PostSchema().objectSchema);
