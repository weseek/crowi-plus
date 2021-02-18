import mongoose from 'mongoose';
import { mongodb } from '^/config/migrate';
import { getModelSafely } from '~/server/util/mongoose-utils';
import ConfigModel from '~/server/models/config';
import loggerFactory from '~/utils/logger';

const logger = loggerFactory('growi:stores:ui');

const awsConfigs = [
  {
    oldValue: 'aws:bucket',
    newValue: 'aws:s3Bucket',
  },
  {
    oldValue: 'aws:region',
    newValue: 'aws:s3Region',
  },
  {
    oldValue: 'aws:accessKeyId',
    newValue: 'aws:s3AccessKeyId',
  },
  {
    oldValue: 'aws:secretAccessKey',
    newValue: 'aws:s3SecretAccessKey',
  },
  {
    oldValue: 'aws:customEndpoint',
    newValue: 'aws:s3CustomEndpoint',
  },
];

export const up = async():Promise<void> => {

  logger.info('Apply migration');
  mongoose.connect(mongodb.url, mongodb.options);

  const Config = getModelSafely('Config') || ConfigModel;


  const request = awsConfigs.map((awsConfig) => {
    return {
      updateOne: {
        filter: { key: awsConfig.oldValue },
        update:  { key: awsConfig.newValue },
      },
    };
  });

  await Config.bulkWrite(request);

  logger.info('Migration has successfully applied');
};

export const down = async():Promise<void> => {

  logger.info('Rollback migration');

  mongoose.connect(mongodb.url, mongodb.options);

  const Config = getModelSafely('Config') || ConfigModel;

  const request = awsConfigs.map((awsConfig) => {
    return {
      updateOne: {
        filter: { key: awsConfig.newValue },
        update:  { key: awsConfig.oldValue },
      },
    };
  });

  await Config.bulkWrite(request);
  logger.info('Migration has been successfully rollbacked');
};