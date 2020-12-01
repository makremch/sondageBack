import { Router } from 'express';
import SondageController from '../controllers/sondage.controller';
import { CreateUserDto } from '../dtos/users.dto';
import Route from '../interfaces/routes.interface';
import authMiddleware from '../middlewares/auth.middleware';
import validationMiddleware from '../middlewares/validation.middleware';

class SondageRoute implements Route {
  public path = '/sondage';
  public router = Router();
  public sondageController = new SondageController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/create`, this.sondageController.createSondage);
    this.router.get(`${this.path}/list`, this.sondageController.showSondage);
    this.router.post(`${this.path}/vote`,authMiddleware, this.sondageController.createVote);
    this.router.post(`${this.path}/voteBysondage`,authMiddleware, this.sondageController.showVoteBySondage);
  }
}

export default SondageRoute;
