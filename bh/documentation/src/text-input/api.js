export default {
  props: [
    {
      name: 'value',
      type: 'String',
      description: 'Set the Text input Value',
      default: 'null',
    },
    {
      name: 'size',
      type: 'String',
      description: 'Set the size of Text Input',
      default: 'null',
    },
    {
      name: 'prependText',
      type: 'String',
      description: 'Set the preced text of input area',
      default: 'null',
    },
    {
      name: 'formatters',
      type: 'Array',
      description: 'Apply formater for input value',
      default: '[]',
    },
    {
      name: 'debounce',
      type: 'Number',
      description: 'Add debounce time to emit input event.',
      default: '0',
    },
    {
      name: 'noBorder',
      type: 'boolean',
      description: 'Add and Remove border to text area',
      default: 'false',
    },
  ],
};
