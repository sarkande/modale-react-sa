
# Modale-react-sa

Modale-react-sa is a small module use to make modal windows

In order to use this module, you need to create a JSON array with your parameters, if none this params will be used.



## DEFAULT_PARAMS

```javascript
const DEFAULT_PARAMS = {
  title: '',
  custom_class: '',
  movable: true,
  width: '500px',

  close_button: {
    active: false,
    title: 'X',
    callback: () => {},
  },
  save_button: {
    active: false,
    title: 'Save',
    callback: () => {},
  },
  cancel_button: {
    active: false,
    title: 'Cancel',
    callback: () => {},
  },
};
```

## To load the module




```javascript
import {Modale} from "modale-react-sa"
import 'modale-react-sa/dist/modale.css'; //optional css
```