// Copyright 2020-2023 SubQuery Pte Ltd authors & contributors
// SPDX-License-Identifier: GPL-3.0

import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { SchedulerRegistry } from '@nestjs/schedule';
import {
  DbModule,
  ForceCleanService,
  StoreCacheService,
  ReindexService,
  StoreService,
} from '@subql/node-core';
import { ConfigureModule } from '../configure/configure.module';
import { ApiService } from '../indexer/api.service';
import { DsProcessorService } from '../indexer/ds-processor.service';
import { DynamicDsService } from '../indexer/dynamic-ds.service';
import { UnfinalizedBlocksService } from '../indexer/unfinalizedBlocks.service';

@Module({
  providers: [
    StoreCacheService,
    StoreService,
    ReindexService,
    ForceCleanService,
    {
      provide: 'UnfinalizedBlocksService',
      useClass: UnfinalizedBlocksService,
    },
    {
      provide: 'DynamicDsService',
      useClass: DynamicDsService,
    },
    DsProcessorService,
    {
      // Used to work with DI for unfinalizedBlocksService but not used with reindex
      provide: ApiService,
      useFactory: () => undefined,
    },
    SchedulerRegistry,
  ],
  controllers: [],
})
export class ReindexFeatureModule {}

@Module({
  imports: [
    DbModule.forRoot(),
    ConfigureModule.register(),
    ReindexFeatureModule,
    EventEmitterModule.forRoot(),
  ],
  controllers: [],
})
export class ReindexModule {}
