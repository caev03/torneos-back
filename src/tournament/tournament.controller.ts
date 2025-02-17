import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { TournamentService } from './tournament.service';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors/business-errors.interceptor';
import { TournamentEntity } from './tournament.entity';
import { TournamentDto } from './tournament.dto/tournament.dto';
import { plainToInstance } from 'class-transformer';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Role } from '../shared/enums/role.enum';
import { Auth } from '../auth/decorators/auth.decorator';

@ApiTags('tournaments')
@Controller('tournaments')
@UseInterceptors(BusinessErrorsInterceptor)
export class TournamentController {

    constructor(
        private readonly tournamentService: TournamentService
    ){}

    @Get()
    @ApiOperation({ summary: 'Retrieve all tournaments'})
    findAll(): Promise<TournamentEntity[]> {
        return this.tournamentService.findAll();
    }

    @Get(':tournamentId')
    @ApiOperation({ summary: 'Retrieve one tournament'})
    findOne(@Param('tournamentId') tournamentId: string): Promise<TournamentEntity> {
        return this.tournamentService.findOne(tournamentId);
    }

    @Post()
    @ApiOperation({ summary: 'Create a tournament'})
    @ApiBearerAuth()
    @Auth([Role.ADMIN])
    create(@Body() tournamentDto: TournamentDto) {
        const tournament : TournamentEntity = plainToInstance(TournamentEntity, tournamentDto);
        return this.tournamentService.create(tournament);
    }

    @Put(':tournamentId')
    @ApiOperation({ summary: 'Update a tournament'})
    @ApiBearerAuth()
    @Auth([Role.SUPER_ADMIN])
    update(@Param('tournamentId') tournamentId: string, @Body() tournamentDto: TournamentDto ) : Promise<TournamentEntity> {
        const tournament : TournamentEntity = plainToInstance(TournamentEntity, tournamentDto);
        return this.tournamentService.update(tournamentId, tournament);
    }

    @Delete(':tournamentId')
    @ApiOperation({ summary: 'Delete a tournament'})
    @ApiBearerAuth()
    @Auth([Role.SUPER_ADMIN])
    @HttpCode(204)
    delete(@Param('tournamentId') tournamentId: string){
        return this.tournamentService.delete(tournamentId);
    }

}
