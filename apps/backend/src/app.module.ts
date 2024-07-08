import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PhylogeneticTreeScriptsModule } from './modules/phylogenetic-tree-scripts/phylogenetic-tree-scripts.module';
<<<<<<< HEAD
import { PrismaService } from './database/prisma/prisma.service';
=======
import { UsersModule } from './modules/users/users.module';
import { PrismaModule } from './databse/prisma/prisma.module';
>>>>>>> feature/create-db

@Module({
  imports: [PrismaModule, PhylogeneticTreeScriptsModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
