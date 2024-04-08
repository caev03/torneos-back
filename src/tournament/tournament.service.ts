import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TournamentEntity } from './tournament.entity';
import { Repository } from 'typeorm';
import { BusinessError, BusinessLogicException } from 'src/shared/security/errors/business-errors';

@Injectable()
export class TournamentService {

    constructor(
        @InjectRepository(TournamentEntity)
        private tournamentRepository: Repository<TournamentEntity>
    ){}

   async findAll(): Promise<TournamentEntity[]> {
    return await this.tournamentRepository.find({relations: ["organizers", "users"]})
   }

   async findOne(id: string) : Promise<TournamentEntity> {
    const tournament : TournamentEntity = await this.tournamentRepository.findOne({where: {id}, relations: ["users","organizers"]})
    if(!tournament) 
        throw new BusinessLogicException("The tournament with the given id was not found", BusinessError.NOT_FOUND);
    return tournament;
   }

   async create(tournament: TournamentEntity): Promise<TournamentEntity> {
    return await this.tournamentRepository.save(tournament);
   }

   async update(id: string, tournament: TournamentEntity): Promise<TournamentEntity> {
    const persistedTournament : TournamentEntity = await this.tournamentRepository.findOne({where:{id}})
    if (!persistedTournament)
        throw new BusinessLogicException("The tournament with the given id was not found", BusinessError.NOT_FOUND);
    return await this.tournamentRepository.save({...persistedTournament,...tournament})
   }

   async delete(id: string) {
    const tournament : TournamentEntity = await this.tournamentRepository.findOne({where:{id}});
    if (!tournament) 
        throw new BusinessLogicException("The tournament with the given id was not found", BusinessError.NOT_FOUND);
    return await this.tournamentRepository.remove(tournament);
   }
}
