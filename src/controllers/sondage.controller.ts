import { NextFunction, Request, Response } from 'express';
import {CreateSondageDto} from '../dtos/sondage.dto';
import { Sondage } from '../interfaces/sondage.interface';
import sondageService from '../services/sondage.service';
import { Response as Vote } from '../interfaces/response.interface';
import { User } from '../interfaces/users.interface';
import { RequestWithUser } from '../interfaces/auth.interface';

class SondageController {

  
  public sondageService = new sondageService();


  public createSondage =  async (req: Request, res: Response, next: NextFunction) => {
    const sondageData: CreateSondageDto = req.body;
    try {
      const createSondage: Sondage = await this.sondageService.createSondage(sondageData);
      res.status(201).json({ data: createSondage, message: 'created' });
    } catch (error) {
      next(error);
    }
  };


  public showSondage =  async (req: Request, res: Response, next: NextFunction) => {

    try {
      const sondages: Sondage[] = await this.sondageService.showSondage();
      res.status(201).json({ content: sondages , totalElements: sondages.length });
    } catch (error) {
      next(error);
    }
  };

  public createVote =  async (req: RequestWithUser, res: Response, next: NextFunction) => {

    let voteData = req.body
    voteData.author = req.user._id
    try {
      const createVote: Vote = await this.sondageService.createVote(voteData);
      res.status(201).json({ data: createVote, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public showVoteBySondage =  async (req: Request, res: Response, next: NextFunction) => {

    try {
      let sondage = req.body.sondage;
      const sondages: Sondage[] = await this.sondageService.getVoteBySondage(sondage);
      res.status(201).json({ content: sondages , totalElements: sondages.length });
    } catch (error) {
      next(error);
    }
  };

  

  
  

}

export default SondageController;
