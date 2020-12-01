import mongoose from 'mongoose';
import { Response } from '../interfaces/response.interface';

const reponseSchema = new mongoose.Schema({
  choix: Boolean,
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required : true},
  sondage: { type: mongoose.Schema.Types.ObjectId, ref: "Sondage", required : true}
});
reponseSchema.set("timestamps" , true)

const responseModel = mongoose.model<Response & mongoose.Document>('vote', reponseSchema);

export default  responseModel;
