import { Global, Module } from '@nestjs/common'

import { PostgresModule } from '@modules/database/postgres.module'

const GLOBAL_MODULES = [PostgresModule]

@Global()
@Module({
  imports: GLOBAL_MODULES,
  exports: GLOBAL_MODULES
})
export class GlobalModule {}
