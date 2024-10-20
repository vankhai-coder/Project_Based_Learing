const errorHandler = (err, req, res, next) => {
    console.log('running in error handler');
    
    const statusCode = res.statusCode ? res.statusCode : 500

    res.statusCode = statusCode

    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    })
}

module.exports = {
    errorHandler
}