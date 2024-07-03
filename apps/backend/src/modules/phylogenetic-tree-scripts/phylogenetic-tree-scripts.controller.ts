import { Body, Controller, Post } from '@nestjs/common';
import { PhylogeneticTreeScriptsService } from './phylogenetic-tree-scripts.service';
/* eslint-disable no-else-return */
import { DescendantObjectsArray } from '../../models/descendantsTypes';
import { ExternalGroup } from '../../models/externalGroupTypes';
import { TraitObjectsArray } from '../../models/traitsTypes';

interface Props {
  traits: TraitObjectsArray;
  externalGroup: ExternalGroup;
  descendants: DescendantObjectsArray;
}

@Controller('phylogenetic-tree-scripts')
export class PhylogeneticTreeScriptsController {
  constructor(
    private readonly phylogeneticTreeScriptsService: PhylogeneticTreeScriptsService,
  ) {}

  @Post()
  /**
   *
   * @param {Props} props - object containing traits, externalGroup, descendants
   */
  generateNewick(@Body() props: Props) {
    const { traits, externalGroup, descendants } = props;

    const filteredTraits = traits
      .map((trait) => {
        if (trait.active !== true) {
          return null;
        }

        return trait;
      })
      .filter((trait) => trait !== null);

    const traitsAndNumberOfDescendantsThatHaveThem = filteredTraits.map(
      (trait) => {
        const numberOfDescendants = descendants.reduce((count, descendant) => {
          if (
            trait &&
            descendant.traitsIds.includes(trait.id) &&
            descendant.active === true
          ) {
            return count + 1;
          }
          return count;
        }, 0);

        // Criar um novo objeto com a propriedade 'descendants'
        return {
          ...trait,
          descendants: numberOfDescendants,
        };
      },
    );

    const newDescendants = descendants
      .map((descendant) => {
        if (descendant.active !== true) {
          return null;
        }

        const filteredDescendantTraits = filteredTraits
          .map((trait) => {
            if (trait !== null && descendant.traitsIds.includes(trait.id)) {
              return trait.id;
            }
            return null;
          })
          .filter((trait) => trait !== null);

        // define value for syn, ples and apo for all descendants
        descendant.synapomorphies = 0;
        descendant.plesiomorphies = 0;
        descendant.apomorphines = 0;

        // search for plesiomorphies
        descendant.plesiomorphies = filteredTraits.length;
        descendant.plesiomorphies -= filteredDescendantTraits.length;

        descendant.traitsIds.forEach((traitId) => {
          if (
            externalGroup.traitsIds.includes(traitId) &&
            (descendant.plesiomorphies !== undefined ||
              descendant.plesiomorphies === 0)
          ) {
            // console.log('plesio:', traitId, descendant);
            descendant.plesiomorphies += 1;
          }
        });

        // search for syn and apo
        filteredTraits.forEach((trait) => {
          if (
            trait !== null &&
            externalGroup.traitsIds.includes(trait?.id) &&
            !descendant.traitsIds.includes(trait.id) &&
            (descendant.synapomorphies || descendant.synapomorphies === 0) &&
            (descendant.plesiomorphies || descendant.plesiomorphies === 0)
          ) {
            descendant.synapomorphies += 1;
            descendant.plesiomorphies -= 1;
          }
        });

        descendant.traitsIds.forEach((traitId) => {
          traitsAndNumberOfDescendantsThatHaveThem.forEach((trait) => {
            if (traitId === trait.id) {
              if (!externalGroup.traitsIds.includes(traitId)) {
                if (
                  trait.descendants > 1 &&
                  (descendant.synapomorphies || descendant.synapomorphies === 0)
                ) {
                  descendant.synapomorphies += 1;
                  // console.log('sinapomorfia', descendant, trait);
                } else if (
                  trait.descendants === 1 &&
                  (descendant.apomorphines || descendant.apomorphines === 0)
                ) {
                  descendant.apomorphines += 1;
                }
              }
            }
          });
        });

        // console.log(descendant.descendantName);
        // console.log(filteredDescendantTraits);

        return descendant;
      })
      .filter((descendant) => descendant !== null);

    const compareDescendants = (a: any, b: any) => {
      if (a.synapomorphies !== b.synapomorphies) {
        return a.synapomorphies - b.synapomorphies; // Ordena por Sin em ordem descendente
      } else if (a.plesiomorphies !== b.plesiomorphies) {
        return b.plesiomorphies - a.plesiomorphies; // Ordena por Ples em ordem ascendente
      } else {
        return a.apomorphines - b.apomorphines; // Ordena por Apo em ordem descendente
      }
    };

    const sortedDescendants = newDescendants.sort(compareDescendants);

    // Construindo a string Newick
    const newick =
      sortedDescendants
        .map(({ descendantName }) => `(${descendantName},`)
        .join('')
        .slice(0, -1) + Array(sortedDescendants.length + 1).join(')');
    // consoles
    // console.log(newDescendants);
    // console.log(traitsAndNumberOfDescendantsThatHaveThem);
    // console.log(externalGroup);
    return newick;
    // console.log(newick);
  }
}
