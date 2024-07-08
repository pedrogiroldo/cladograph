import {
  mockDescendants,
  mockExpectedDescendants,
  mockExternalGroup,
  mockExpectedNewick,
  mockTraits,
} from './mockedVars';
import NewickGenerator from '../NewickGenerator';

class NewickGeneratorTester extends NewickGenerator {
  constructor(traits, externalGroup, descendants) {
    super(traits, externalGroup, descendants);
  }

  public getDescendants() {
    return this.descendants.getDescendants();
  }
}

describe('NewickGenerator', () => {
  let newickGenerator: NewickGeneratorTester;

  beforeEach(() => {
    newickGenerator = new NewickGeneratorTester(
      mockTraits,
      mockExternalGroup,
      mockDescendants,
    );
  });

  it('should calculate the right number of synapomorphies, plesiomorphies and apomorphies', () => {
    const descendants = newickGenerator.getDescendants();
    expect(
      descendants.forEach((descendant) => {
        {
          id: descendant.id;
          syn: descendant.synapomorphies;
          ples: descendant.plesiomorphies;
          apo: descendant.apomorphies;
        }
      }),
    ).toEqual(
      mockExpectedDescendants.forEach((descendant) => {
        {
          id: descendant.id;
          syn: descendant.synapomorphies;
          ples: descendant.plesiomorphies;
          apo: descendant.apomorphies;
        }
      }),
    );
  });

  it('should generate the right newick', () => {
    const newick = newickGenerator.getNewick();
    expect(newick).toEqual(mockExpectedNewick);
  });
});
