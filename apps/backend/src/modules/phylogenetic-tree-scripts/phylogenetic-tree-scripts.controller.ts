import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PhylogeneticTreeScriptsService } from './phylogenetic-tree-scripts.service';
import { CreatePhylogeneticTreeScriptDto } from './dto/create-phylogenetic-tree-script.dto';
import { UpdatePhylogeneticTreeScriptDto } from './dto/update-phylogenetic-tree-script.dto';

@Controller('phylogenetic-tree-scripts')
export class PhylogeneticTreeScriptsController {
  constructor(private readonly phylogeneticTreeScriptsService: PhylogeneticTreeScriptsService) {}

  @Post()
  create(@Body() createPhylogeneticTreeScriptDto: CreatePhylogeneticTreeScriptDto) {
    return this.phylogeneticTreeScriptsService.create(createPhylogeneticTreeScriptDto);
  }

  @Get()
  findAll() {
    return this.phylogeneticTreeScriptsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.phylogeneticTreeScriptsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePhylogeneticTreeScriptDto: UpdatePhylogeneticTreeScriptDto) {
    return this.phylogeneticTreeScriptsService.update(+id, updatePhylogeneticTreeScriptDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.phylogeneticTreeScriptsService.remove(+id);
  }
}
