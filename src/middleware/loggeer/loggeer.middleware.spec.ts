import { LoggeerMiddleware } from './loggeer.middleware';

describe('LoggeerMiddleware', () => {
  it('should be defined', () => {
    expect(new LoggeerMiddleware()).toBeDefined();
  });
});
