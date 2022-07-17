import pino from 'pino'; // use logger

const logger = pino({
    transport: {
        target: 'pino-pretty',
        options: {
            colorize: true,
            translateTime: "SYS:dd-mm-yyyy HH:MM:ss",
            ignore: "pid,hostname",
          },
      },
})

export default logger;

// HOW TO USE IT : 
// instead of writing : 
// console.log() => logger.info()
// console.error() => logger.error()
// logger.warn()
// logger.fatal()