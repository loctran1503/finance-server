import { Controller } from '@nestjs/common';
import { Get } from '@nestjs/common/decorators/http/request-mapping.decorator';
import { AppService } from './app.service';

@Controller()
export class AppController {
    constructor(private service : AppService){}

    @Get('/')
    index(){
        return 'Finance Server API'
    }
}
