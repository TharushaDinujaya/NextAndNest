import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class LocalStretagy extends PassportStrategy(Strategy){
    constructor(private readonly authservice: AuthService){
        super({
            usernameField: 'email',
        })
    }

    validate(email: string, password: string){
        return this.authservice.validateLocalUser(email, password);
    }
}