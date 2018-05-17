'use strict'

const fs = require('fs');

class Logger
{
    constructor(console_log, default_name, default_path)
    {
        this.console = Boolean(console_log);
        this.streams = {};
        if (default_name && default_path)
        {
            let filestream = fs.createWriteStream(default_path, { flags: 'a' });
            this.streams[default_name] = {
                stream: filestream,
                logger: require('pino')(filestream)
            };
        }
    }

    add_path(stream_name, filepath)
    {
        let filestream = fs.createWriteStream(filepath, { flags: 'a' });
        this.streams[stream_name] = {
            stream: filestream,
            logger: require('pino')(filestream)
        };
    }

    add_stream(stream_name, filestream)
    {
        this.streams[stream_name] = {
            stream: filestream,
            logger: require('pino')(filestream)
        };
    }

    delete_stream(stream_name)
    {
        this.streams[stream_name].stream.close();
        delete this.streams[stream_name];
    }

    log_error(input, comment)
    {
        if (this.console)
        {
            let log = '===Error===\n';
            if (comment)
            {
                log += comment + '\n';
            }
            log += input + '\n';
            if (input.stack)
            {
                log += 'Stack ' + input.stack + '\n'
            }
            log += '===';
            console.log(log);
        }
        let obj = { type: 'error', utc_time: (new Date()).toUTCString() };
        if (comment)
        {
            obj.comment = comment;
        }
        if (input.stack)
        {
            obj.stack = input.stack;
        }
        for (let key in this.streams)
        {
            this.streams[key].logger.error(obj, input);
        }
    }

    log_fatal(input, comment)
    {
        if (this.console)
        {
            let log = '===Fatal===\n';
            if (comment)
            {
                log += comment + '\n';
            }
            log += input + '\n';
            if (input.stack)
            {
                log += 'Stack ' + input.stack + '\n'
            }
            log += '===';
            console.log(log);
        }
        let obj = { type: 'fatal', utc_time: (new Date()).toUTCString() };
        if (comment)
        {
            obj.comment = comment;
        }
        if (input.stack)
        {
            obj.stack = input.stack;
        }
        for (let key in this.streams)
        {
            this.streams[key].logger.fatal(obj, input);
        }
    }

    log_info(input, comment)
    {
        if (this.console)
        {
            let log = '===Info===\n';
            if (comment)
            {
                log += comment + '\n';
            }
            log += input + '\n';
            if (input.stack)
            {
                log += 'Stack ' + input.stack + '\n'
            }
            log += '===';
            console.log(log);
        }
        let obj = { type: 'info', utc_time: (new Date()).toUTCString() };
        if (comment)
        {
            obj.comment = comment;
        }
        for (let key in this.streams)
        {
            this.streams[key].logger.info(obj, input);
        }
    }

    log_trace(input, comment)
    {
        if (this.console)
        {
            let log = '===Trace===\n';
            if (comment)
            {
                log += comment + '\n';
            }
            log += input + '\n';
            if (input.stack)
            {
                log += 'Stack ' + input.stack + '\n'
            }
            log += '===';
            console.log(log);
        }
        let obj = { type: 'trace', utc_time: (new Date()).toUTCString() };
        if (comment)
        {
            obj.comment = comment;
        }
        for (let key in this.streams)
        {
            this.streams[key].logger.trace(obj, input);
        }
    }

    log_warn(input, comment)
    {
        if (this.console)
        {
            let log = '===Warn===\n';
            if (comment)
            {
                log += comment + '\n';
            }
            log += input + '\n';
            if (input.stack)
            {
                log += 'Stack ' + input.stack + '\n'
            }
            log += '===';
            console.log(log);
        }
        let obj = { type: 'warning', utc_time: (new Date()).toUTCString() };
        if (comment)
        {
            obj.comment = comment;
        }
        if (input.stack)
        {
            obj.stack = input.stack;
        }
        for (let key in this.streams)
        {
            this.streams[key].logger.warn(obj, input);
        }
    }
}

module.exports = Logger;
