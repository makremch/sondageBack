import mongoose from 'mongoose';
import { Sondage } from '../interfaces/sondage.interface';

const sondageSchema = new mongoose.Schema({
  titre: String,
  description: String,
});
sondageSchema.set("timestamps" , true)

const sondageModel = mongoose.model<Sondage & mongoose.Document>('sondage', sondageSchema);

export default sondageModel;
