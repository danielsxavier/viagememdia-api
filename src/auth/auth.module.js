const { Module } = require('@nestjs/common');

class AuthModule {}

Module({})(AuthModule);

module.exports = { AuthModule };
