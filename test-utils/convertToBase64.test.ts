import { convertToBase64 } from '../src/utils/convert-file-to-base64';

const createTestFile = (
  content: string,
  name = 'test.txt',
  type = 'text/plain'
) => {
  return new File([content], name, { type });
};

describe('convertToBase64', () => {
  it('should convert a text file to base64 string', async () => {
    const file = createTestFile('Hello, world!');
    const result = await convertToBase64(file);

    expect(typeof result).toBe('string');
    expect(result).toMatch(/^data:text\/plain;base64,/);
  });
});
