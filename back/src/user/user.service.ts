import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from './user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

    createUser(createUserDto: UserDto) {
        const newUser = this.userRepository.create(createUserDto);
        return this.userRepository.save(newUser);
    }

    getUser(id: string) {
        return this.userRepository.findOneBy({ id });
    }

    async getUserPassword(username: string): Promise<string | null> {
        const user = await this.userRepository.findOneBy({ username });
        if (user) {
            return user.password;
        } else {
            return null;
        }
    }

    async getUserId(username: string): Promise<string | null> {
        const user = await this.userRepository.findOneBy({ username });
        if (user) {
            return user.id;
        } else {
            return null;
        }
    }
}
