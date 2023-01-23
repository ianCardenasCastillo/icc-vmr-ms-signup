import { SignUpService } from './../src/signup/services/signup.service';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { JwtService } from '@nestjs/jwt';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  /* it('/signup/execute (POST)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  }); */
  describe('/signup/execute (POST)', () => {
    describe('DTO validation', () => {
      it('should return 400 email format', () => {
        jest.spyOn(SignUpService.prototype, 'addTenant').mockResolvedValue({
          email: 'email.cl',
        } as any);
        const mockData = {
          email: 'email.cl',
          password: 'Qe2.dASDD',
        };
        return request(app.getHttpServer())
          .post('/signup/execute')
          .send(mockData)
          .expect(400)
          .expect({
            statusCode: 400,
            message: 'Bad Request Exception',
            cause: {
              response: {
                statusCode: 400,
                message: ['email must be an email'],
                error: 'Bad Request',
              },
              status: 400,
              options: {},
              message: 'Bad Request Exception',
              name: 'BadRequestException',
            },
            description: 'BadRequestException',
          });
      });
      it('should return 400 email required', () => {
        jest.spyOn(SignUpService.prototype, 'addTenant').mockResolvedValue({
          email: 'email.cl',
        } as any);
        const mockData = {
          password: 'Qe2.dASDD',
        };
        return request(app.getHttpServer())
          .post('/signup/execute')
          .send(mockData)
          .expect(400)
          .expect({
            statusCode: 400,
            message: 'Bad Request Exception',
            cause: {
              response: {
                statusCode: 400,
                message: [
                  'email must be an email',
                  'email should not be empty',
                ],
                error: 'Bad Request',
              },
              status: 400,
              options: {},
              message: 'Bad Request Exception',
              name: 'BadRequestException',
            },
            description: 'BadRequestException',
          });
      });
      it('should return 400 password format', () => {
        jest.spyOn(SignUpService.prototype, 'addTenant').mockResolvedValue({
          email: 'email@aaa.cl',
        } as any);
        const mockData = {
          email: 'email@aaa.cl',
          password: 'password',
        };
        return request(app.getHttpServer())
          .post('/signup/execute')
          .send(mockData)
          .expect(400)
          .expect({
            statusCode: 400,
            message: 'Bad Request Exception',
            cause: {
              response: {
                statusCode: 400,
                message: ['password is not strong enough'],
                error: 'Bad Request',
              },
              status: 400,
              options: {},
              message: 'Bad Request Exception',
              name: 'BadRequestException',
            },
            description: 'BadRequestException',
          });
      });
      it('should return 400 password required', () => {
        jest.spyOn(SignUpService.prototype, 'addTenant').mockResolvedValue({
          email: 'email@aaa.cl',
        } as any);
        const mockData = {
          email: 'email@aaa.cl',
        };
        return request(app.getHttpServer())
          .post('/signup/execute')
          .send(mockData)
          .expect(400)
          .expect({
            statusCode: 400,
            message: 'Bad Request Exception',
            cause: {
              response: {
                statusCode: 400,
                message: [
                  'password is not strong enough',
                  'password should not be empty',
                ],
                error: 'Bad Request',
              },
              status: 400,
              options: {},
              message: 'Bad Request Exception',
              name: 'BadRequestException',
            },
            description: 'BadRequestException',
          });
      });
    });
    describe('DTO validation', () => {
      it('should return 201 created', () => {
        jest.spyOn(SignUpService.prototype, 'addTenant').mockResolvedValue({
          email: 'email@aaa.cl',
        } as any);
        jest
          .spyOn(JwtService.prototype, 'sign')
          .mockReturnValue('access_token');
        const mockData = {
          email: 'email@aaa.cl',
          password: 'Edsf.1233',
        };
        return request(app.getHttpServer())
          .post('/signup/execute')
          .send(mockData)
          .expect(201)
          .expect({ access_token: 'access_token' });
      });
    });
  });
});
