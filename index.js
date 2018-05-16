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

    log_error(msg)
    {
        if (this.console)
        {
            console.log('===Error===\n' + msg + '\n===');
        }
        let obj = { type: 'error', utc_time: (new Date()).toUTCString() };
        for (let key in this.streams)
        {
            this.streams[key].logger.error(obj, msg);
        }
    }

    log_fatal(msg)
    {
        if (this.console)
        {
            console.log('===Fatal===\n' + msg + '\n===');
        }
        let obj = { type: 'fatal', utc_time: (new Date()).toUTCString() };
        for (let key in this.streams)
        {
            this.streams[key].logger.fatal(obj, msg);
        }
    }

    log_info(msg)
    {
        if (this.console)
        {
            console.log('===Info===\n' + msg + '\n===');
        }
        let obj = { type: 'info', utc_time: (new Date()).toUTCString() };
        for (let key in this.streams)
        {
            this.streams[key].logger.info(obj, msg);
        }
    }

    log_trace(msg)
    {
        if (this.console)
        {
            console.log('===Trace===\n' + msg + '\n===');
        }
        let obj = { type: 'trace', utc_time: (new Date()).toUTCString() };
        for (let key in this.streams)
        {
            this.streams[key].logger.trace(obj, msg);
        }
    }

    log_warn(msg)
    {
        if (this.console)
        {
            console.log('===Fatal===\n' + msg + '\n===');
        }
        let obj = { type: 'warning', utc_time: (new Date()).toUTCString() };
        for (let key in this.streams)
        {
            this.streams[key].logger.warn(obj, msg);
        }
    }
}

module.exports = Logger;
