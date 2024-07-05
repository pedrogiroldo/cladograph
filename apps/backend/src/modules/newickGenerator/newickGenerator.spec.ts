import {
  mockDescendants,
  mockExpectedDescendants,
  mockExternalGroup,
  mockExpectedNewick,
  mockTraits,
} from './mockedVars';
import NewickGenerator from './NewickGenerator';

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
    console.log(descendants);
    expect(descendants).toEqual(mockExpectedDescendants);
  });

  it('should generate the right newick', () => {
    const newick = newickGenerator.getNewick();
    expect(newick).toEqual(mockExpectedNewick);
  });
});
