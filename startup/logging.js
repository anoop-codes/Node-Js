module.exports = () => {

    process.on('unhandledRejection', (error) => {
        console.log('UNHANDLED REJECTION :', error);
        process.exit(1);
    });

    process.on('uncaughtException', (error) => {
        console.log('UNCAUGHT EXCEPETION :', error.message)
    });
}