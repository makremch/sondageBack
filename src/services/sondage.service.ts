import { CreateSondageDto } from '../dtos/sondage.dto';
import HttpException from '../exceptions/HttpException';
import { Response } from '../interfaces/response.interface';
import { Sondage } from '../interfaces/sondage.interface';
import responseModel from '../models/reponse.model';
import sondageModel from '../models/sondages.model';
import { isEmptyObject } from '../utils/util';

export default class sondageService {
  public sondage = sondageModel;
  public vote = responseModel;


  public async createSondage(sondageData: CreateSondageDto): Promise<Sondage> {
    if (isEmptyObject(sondageData)) throw new HttpException(400, "cannot create empty sondage !");

   
    const createUserData: Sondage = await this.sondage.create(sondageData);
    return createUserData;
  }

  public async showSondage(): Promise<Sondage[]> {
    const sondages: Sondage[] = await this.sondage.find(); 
    return sondages;
  
  }

  public async getVoteBySondage(sondage: string){
    const votes:Vote[] = await this.vote.find({sondage : sondage})
    return votes

  }

  public async createVote(voteData): Promise<Response> {
    
    if (isEmptyObject(voteData)) throw new HttpException(400, "cannot create empty vote !");
let yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1)
    const nbreVote  : Number = await this.vote.count({ author: voteData.author , createdAt:{$gt: yesterday} });
    const hasVoted : Boolean = await this.vote.exists({ author: voteData.author , sondage: voteData.sondage});

    if (hasVoted){
      throw new HttpException(400, "cannot revote");
    }
    if (nbreVote > 5) {
      throw new HttpException(400, "cannot create more than 5 votes a day !");
    }
    const createVote: Response = await this.vote.create(voteData);
    return createVote;
  
  }

  
}

