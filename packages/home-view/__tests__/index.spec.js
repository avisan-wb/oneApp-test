import MainExport from '../src';
import ModuleContainer from '../src/components/HomeView';

describe('index', () => {
  it('should export the top component', () => {
    expect(MainExport).toBe(ModuleContainer);
  });
});
