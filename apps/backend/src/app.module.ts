import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PhylogeneticTreeScriptsModule } from './modules/phylogenetic-tree-scripts/phylogenetic-tree-scripts.module';
import { UsersModule } from './modules/users/users.module';
import { PrismaModule } from './database/prisma/prisma.module';

@Module({
  imports: [PrismaModule, PhylogeneticTreeScriptsModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
