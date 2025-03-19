import { PartialType } from '@nestjs/mapped-types';
import { CreatePhylogeneticTreeScriptDto } from './create-phylogenetic-tree-script.dto';

export class UpdatePhylogeneticTreeScriptDto extends PartialType(CreatePhylogeneticTreeScriptDto) {}
