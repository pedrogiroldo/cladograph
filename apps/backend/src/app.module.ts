import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PhylogeneticTreeScriptsModule } from './modules/phylogenetic-tree-scripts/phylogenetic-tree-scripts.module';
import { PrismaService } from './databse/prisma/prisma.service';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [PhylogeneticTreeScriptsModule, UsersModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
