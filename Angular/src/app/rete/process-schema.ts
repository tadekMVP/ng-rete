import {Data} from 'rete/types/core/data';

export const SCHEMA: Data = {
  id: 'demo@0.2.0',
  nodes: {
    '1': {
      'id': 1,
      'data': {
        'num': 2
      },
      'inputs': {},
      'outputs': {
        'num': {
          'connections': [
            {
              'node': 3,
              'input': 'num1',
              'data': {}
            }
          ]
        }
      },
      'position': [ 80, 25],
      'name': 'Number'
    },
    '2': {
      'id': 2,
      'data': {
        'num': 0
      },
      'inputs': {},
      'outputs': {
        'num': {
          'connections': [
            {
              'node': 3,
              'input': 'num2',
              'data': {}
            }
          ]
        }
      },
      'position': [
        80,
        220
      ],
      'name': 'Number'
    },
    '3': {
      'id': 3,
      'data': {},
      'inputs': {
        'num1': {
          'connections': [
            {
              'node': 1,
              'output': 'num',
              'data': {}
            }
          ]
        },
        'num2': {
          'connections': [
            {
              'node': 2,
              'output': 'num',
              'data': {}
            }
          ]
        }
      },
      'outputs': {
        'num': {
          'connections': []
        }
      },
      'position': [
        500,
        75
      ],
      'name': 'Add'
    },
    '4': {
      'id': 4,
      'data': {
        'str': 'jeden'
      },
      'inputs': {},
      'outputs': {
        'str': {
          'connections': [
            {
              'node': 6,
              'input': 'str1',
              'data': {}
            }
          ]
        }
      },
      'position': [
        80,
        500
      ],
      'name': 'String'
    },
    '5': {
      'id': 5,
      'data': {
        'str': 'dwa'
      },
      'inputs': {},
      'outputs': {
        'str': {
          'connections': [
            {
              'node': 6,
              'input': 'str2',
              'data': {}
            }
          ]
        }
      },
      'position': [
        80,
        750
      ],
      'name': 'String'
    },
    '6': {
      'id': 6,
      'data': {},
      'inputs': {
        'str1': {
          'connections': [
            {
              'node': 4,
              'output': 'str',
              'data': {}
            }
          ]
        },
        'str2': {
          'connections': [
            {
              'node': 5,
              'output': 'str',
              'data': {}
            }
          ]
        }
      },
      'outputs': {
        'str': {
          'connections': []
        }
      },
      'position': [
        500,
        650
      ],
      'name': 'StrJoin'
    },
  //   '7': {
  //     'id': 7,
  //     'data': {},
  //     'inputs': {
  //       'str1': {
  //         'connections': [{}]
  //       },
  //       'str2': {
  //         'connections': [{}]
  //       }
  //     },
  //     'outputs': {
  //       'str': {
  //         'connections': []
  //       }
  //     },
  //     'position': [
  //       200,
  //       200
  //     ],
  //     'name': 'Basic'
  //   }
  }
};
