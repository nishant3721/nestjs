import { UnauthorizedException, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AuthService } from './modules/auth/auth.service';

const PUCLIC_URLS = ['/api/auth/signup', '/api/auth/login'];

async function bootstrap() {
  const port = process.env.PORT || 8080;
  const app = await NestFactory.create(AppModule);
  app.use(checkToken);
  app.setGlobalPrefix('/api');
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(port);
  console.log('\nServer started on: ', port);
}

const checkToken = (req, res, next) => {
  const isPublic = PUCLIC_URLS.find((url) => req.path.startsWith(url));
  if (isPublic) {
    next();
  } else {
    const token = req.headers.token;
    try {
      const user = new AuthService(null).validateUser(token);
      // set the user in request
      req.user = user;
      next();
    } catch (error) {
      throw new UnauthorizedException('User not authenticated');
    }
  }
};

bootstrap();
