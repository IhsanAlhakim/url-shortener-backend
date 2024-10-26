import { InferSchemaType, model, Schema } from "mongoose";

const urlSchema = new Schema({
  urlId: { type: String, required: true },
  oriUrl: { type: String, required: true },
  shortUrl: { type: String, required: true },
});

type Url = InferSchemaType<typeof urlSchema>;

export default model<Url>("Url", urlSchema);
