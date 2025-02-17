import { TournamentEntity } from "../tournament/tournament.entity";
import { UserEntity } from "../user/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class TournamentUserEntity {
    
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    category: string

    // ManyToOne relation between tournament and user (ManyToMany relation)|| A tournament has many users
    @ManyToOne(() => TournamentEntity, (tournament) => tournament.users, { onDelete: 'CASCADE' })
    tournament: TournamentEntity

    // ManyToOne relation between user and tournaments (ManyToMany relation)|| A user has many tournaments
    @ManyToOne(() => UserEntity, (user) => user.tournaments, { onDelete: 'CASCADE' })
    user: UserEntity


}
