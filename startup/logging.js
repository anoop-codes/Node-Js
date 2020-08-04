module.exports = () => {

    process.on('unhandledRejection', (error) => {
        console.log('UNHANDLED REJECTION :', error);
    });

    process.on('uncaughtException', (error) => {
        console.log('UNCAUGHT EXCEPETION :', error.message)
        process.exit(1);
    });
}