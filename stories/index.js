import Vue from 'vue';
import { storiesOf } from '@storybook/vue';
import Spinner from '../src/components/FishTankLoaderSpinner.vue';

storiesOf('Spinner', module)
  // .add('with text', () => '<my-button>with text</my-button>')
  // .add('with emoji', () => '<my-button>😀 😎 👍 💯</my-button>')
  .add('as a component', () => ({
    components: { Spinner },
    template: '<spinner theme="bgov" size="medium" />'
  }));