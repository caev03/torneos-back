import { Controller, Get, Req, UseInterceptors } from '@nestjs/common';
import { AuthUserDto } from './dto/auth-user.dto';
import { Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Role } from '../shared/enums/role.enum';
import { Auth } from './decorators/auth.decorator';
import RequestUser from './interfaces/request-user.interface';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors/business-errors.interceptor';
import { UserEntity } from 'src/user/user.entity';
import { plainToInstance } from 'class-transformer';
import { ApiCreatedResponse, ApiForbiddenResponse, ApiTags } from '@nestjs/swagger';


@ApiTags('auth')
@Controller('auth')
@UseInterceptors(BusinessErrorsInterceptor)
export class AuthController {

    constructor(
        private authService: AuthService
    ){}

    @Post('signup')
    @ApiCreatedResponse({ description: 'The user has been successfully created.'})
    @ApiForbiddenResponse({ description: 'Forbidden.'})
    signUp(@Body() authUserDto:AuthUserDto): Promise<void>{
        const user : UserEntity = plainToInstance(UserEntity, authUserDto);
        return this.authService.signUp(user);
    }

    @Post('signin')
    signin(@Body() authUserDto:AuthUserDto): Promise<{accessToken: string, role: Role,user, id:string}> {
        return this.authService.signIn(authUserDto);
    }



    @Get('profile')
    @Auth([Role.ADMIN])
    profile(@Req() req: RequestUser) {
        return req.user;
    }
}
