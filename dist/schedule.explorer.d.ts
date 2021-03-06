import { OnModuleInit } from '@nestjs/common';
import { DiscoveryService } from '@nestjs/core';
import { MetadataScanner } from '@nestjs/core/metadata-scanner';
import { SchedulerMetadataAccessor } from './schedule-metadata.accessor';
import { SchedulerOrchestrator } from './scheduler.orchestrator';
export declare class ScheduleExplorer implements OnModuleInit {
  private readonly schedulerOrchestrator;
  private readonly discoveryService;
  private readonly metadataAccessor;
  private readonly metadataScanner;
  constructor(
    schedulerOrchestrator: SchedulerOrchestrator,
    discoveryService: DiscoveryService,
    metadataAccessor: SchedulerMetadataAccessor,
    metadataScanner: MetadataScanner,
  );
  onModuleInit(): void;
  explore(): void;
  lookupSchedulers(instance: Record<string, Function>, key: string): void;
}
