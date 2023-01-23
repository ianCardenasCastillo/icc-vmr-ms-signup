/*
 * This file should contain any environment variables
 * that are explicitly required in the ConfigModule
 *
 * Example:
 * process.env.SOME_REQUIRED_ENV_VAR = 'some custom value'
 *
 * By doing this, we can produce an error when launching the service
 * if the variable is not set, and avoid that error when testing it.
 */
process.env.MONGODB_DATABASE = 'mongodatabase';
process.env.MONGODB_URL = 'mongourl';
process.env.NODE_ENV = 'test';
process.env.ENABLE_SWAGGER = true;
process.env.JWT_SECRET = 'JWT_SECRET';
process.env.JWT_PUBLIC = 'JWT_PUBLIC';
process.env.JWT_EXPIRE_TIME = 'JWT_EXPIRE_TIME';
